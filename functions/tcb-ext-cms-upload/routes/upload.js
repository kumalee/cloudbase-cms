const uploader = require('../lib/uploader')

module.exports = async (ctx) => {
  let files = ctx.request.files['files[]']

  let result = {}
  if (!files.length) {
      files = [files]
  }
  const jobs = files.map((file) => {
      return uploader.upload(ctx.state.tcbInstance,file)
  })
  const data = await Promise.all(jobs)
  const fileList = await uploader.getURL(ctx.state.tcbInstance,data)
  data.map(d => {
    d.download_url = fileList.download_url;
  })
  const jobs2 = data.map((d => {
    return uploader.getImageInfo(d)
  }));
  const data2 = await Promise.all(jobs2)
  result = uploader.dataFormat(data2)
  console.log(result)
  ctx.body = result
}
