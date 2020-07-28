// api.js

const cloudbase = require("@cloudbase/node-sdk");
const config = {
    secretId: process.env.secretId, // 前往「腾讯云控制台」-「访问密钥」获取
    secretKey: process.env.secretKey, // 前往「腾讯云控制台」-「访问密钥」获取
    env: process.env // 前往「腾讯云控制台」-「云开发 CloudBase」获取
};

const app = cloudbase.init(config);

/**
 * 获取云存储的访问链接
 * @param {String} url 云存储的特定url
 */
function getBucketUrl(url) {
  if (!url.startsWith("cloud://")) {
      return url;
  }

  const re = /cloud:\/\/.*?\.(.*?)\/(.*)/;
  const result = re.exec(url);
  return `https://${result[1]}.tcb.qcloud.la/${result[2]}`;
}

/**
 * 获取云数据库数据
 */
export async function getHomePageData() {
    const db = app.database();
    const result = await db.collection("products").get();
    if (result.code) {
        throw new Error(
            `获取「首页信息」失败, 错误码是${result.code}: ${result.message}`
        );
    }

    return result.data.map(item => {
        if (item.createTime instanceof Date) {
            item.createTime = item.createTime.toLocaleString();
        }
        if (item.updateTime instanceof Date) {
            item.updateTime = item.updateTime.toLocaleString();
        }
        item.picture = getBucketUrl(item.picture); // 处理云存储的特殊链接
        return item;
    });
}
