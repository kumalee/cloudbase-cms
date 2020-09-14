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
  // result = await uploader.getURL(ctx.state.tcbInstance,data)
  console.log(result)
  ctx.body = result
}
