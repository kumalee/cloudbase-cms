const genPassword = require("../lib/crypto").genPassword;

module.exports = async (ctx) => {
  const { userName, password } = ctx.request.body;
  const config = ctx.state.config;
  const app = ctx.state.tcbInstance;

  if (!userName || !password) {
    throw Object.assign(new Error("用户名或者密码不能为空"), {
      code: "LOGIN_WRONG_INPUT",
    });
  }

  const db = app.database();
  const collection = db.collection(config.usersCollectionName);
  const query = collection.where({
    userName,
  });

  const getRes = await query.get();
  const dbRecord = getRes.data[0];

  if (!dbRecord) {
    throw Object.assign(new Error("用户名或者密码错误"), {
      code: "LOGIN_WRONG_INPUT",
    });
  }

  const { password: dbPassword, createTime, role, faildLogins } = dbRecord;
  const now = new Date();
  const todayDate = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}`;

  if ((faildLogins && faildLogins[todayDate]) >= config.loginRetryTimes) {
    throw Object.assign(new Error("登录失败次数过多，请明日再试"), {
      code: "LOGIN_RETRY_TOO_MANY",
    });
  }

  const salt = createTime + config.envId;

  const genPasswordResult = await genPassword(password, salt);

  if (genPasswordResult !== dbPassword) {
    await collection.doc(dbRecord._id).update({
      faildLogins: {
        [todayDate]: faildLogins ? faildLogins[todayDate] + 1 : 1,
      },
    });
    throw Object.assign(new Error("用户名或者密码错误"), {
      code: "LOGIN_WRONG_INPUT",
    });
  }

  const ticket = app.auth().createTicket(userName, {
    refresh: 60 * 60 * 1000,
  });

  ctx.body = {
    data: {
      ticket,
      role,
    },
  };
};
