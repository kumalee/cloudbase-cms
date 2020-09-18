const uploader = require('../lib/uploader');
const { upload } = require('../lib/uploader');

module.exports = async (ctx) => {
  let files = ctx.request.files['files[]']
  const { width, height, type } = ctx.request.body;

  let result = {}
  if (!files.length) {
      files = [files]
  }
  const jobs = files.map((file) => {
      return uploader.upload(ctx.state.tcbInstance,file)
  })
  const data = await Promise.all(jobs)
  const fileList = await uploader.getURL(ctx.state.tcbInstance,data)
  data.map((d, i) => {
    //fileName,
    //fileID
    d.download_url = fileList[i].download_url;
    d.width = width;
    d.height = height;
    d.type = type;
  })
  const saveRes = await uploader.saveToDB(ctx.state.tcbInstance, data[0]);
  result = uploader.dataFormat(saveRes)
  console.log(result)
  ctx.body = result
}
