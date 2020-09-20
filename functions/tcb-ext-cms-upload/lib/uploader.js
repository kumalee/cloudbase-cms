const fs = require('fs')
const dayjs = require('dayjs')
const uuidv4 = require('uuid/v4')
const path = require('path')
const vibrant = require('node-vibrant')

const upload = (app,file) => {
    return new Promise(async (resolve, reject) => {
        const day = dayjs().format('YYYY-MM-DD')
        const stream = fs.createReadStream(file.path)
        const res = await app.uploadFile({
            cloudPath: `tcb-cms/${day}/${uuidv4()}${path.extname(file.name)}`,
            fileContent: stream,
        })
        const mainColor = await getMainColor(file.path);
        console.log('file uploaded: ', res);
        resolve({
            fileName: file.name,
            fileID: res.fileID,
            mainColor: mainColor,
        })
    })
}

const dataFormat = (data) => {
    return {
        msg: '',
        code: 0,
        data: {
            errFiles: [],
            succMap: data
        },
    }
}

const getURL = async (app,files) => {
    const ids = files.map(file => {
        return file.fileID
    })
    const { fileList } = await app.getTempFileURL({
        fileList: ids,
    })
    return fileList
}

const getMainColor = async (file) => {
  const colors = await vibrant.from(file).getPalette();
  if (colors.Vibrant.population > colors.Muted.population) {
    return colors.Vibrant.rgb;
  }
  return colors.Muted.rgb;
}

const saveToDB = async (app, picture) => {
  const res = await app.callFunction({
    name: 'tcb-ext-cms-api',
    data: {
      "operate": "create",
      "resource": "pictures",
      "params": {
        data: picture
      }
    }
  });
  return res;
}

const uploader = {
    dataFormat,
    upload,
    getURL,
    saveToDB,
}

module.exports = uploader