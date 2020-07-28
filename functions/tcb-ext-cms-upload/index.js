const tcb = require("@cloudbase/node-sdk");
const serverless = require("serverless-http");
const Koa = require("koa");
const Router = require("@koa/router");
const koaBody = require("koa-body");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");

const upload = require("./routes/upload");

module.exports.main = async (event, context) => {
  const app = new Koa();

  // 统一错误处理
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      const result = {
        code: err.code || "SYS_ERR",
        message: err.message,
      };
      ctx.body = result;
      ctx.app.emit("error", err, ctx);
    }
  });

  app.use(
    koaBody({
      multipart: true,
      formidable: {
        maxFileSize: 500 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
      },
    })
  );
  app.use(bodyParser());
  app.use(cors());

  // 注入 tcb 相关上下文对象
  app.use(async (ctx, next) => {
    const envId = context.namespace;

    ctx.state.tcbInstance = tcb.init({
      env: envId,
    });

    ctx.state.config = {
      envId,
    };

    await next();
  });

  const router = new Router();

  // 登录路由
  router.post("/upload", upload);

  app.use(router.routes()).use(router.allowedMethods());

  app.listen("3001");

  const handler = serverless(app);

  const result = await handler(event, context);
  return result;
};
