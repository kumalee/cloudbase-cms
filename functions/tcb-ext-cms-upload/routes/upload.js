const uploader = require('../lib/uploader')

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
  data.map(d => {
    d.download_url = fileList.download_url;
    d.width = width;
    d.height = height;
    d.type = type;
  })
  result = uploader.dataFormat(data)
  console.log(result)
  ctx.body = result
}
