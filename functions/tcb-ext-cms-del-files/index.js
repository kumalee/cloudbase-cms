const cloudbase = require('@cloudbase/node-sdk');
const deleter = require("./lib/deleter");

module.exports.main = async (event, context) => {
  const envId = context.namespace
  const app = cloudbase.init({
    env: envId
  })

  const { ids, fileIDs } = event

  console.log(ids, fileIDs)

  let result = {};
  const cosRes = await deleter.deleteFilesFromCOS(app, fileIDs);
  const dbRes = await deleter.deleteFilesFromDB(app, ids);
  result = deleter.dataFormat({cosRes, dbRes});
  console.log(result)
  return result;
}
