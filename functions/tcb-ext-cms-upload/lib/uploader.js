const fs = require('fs')
const dayjs = require('dayjs')
const uuidv4 = require('uuid/v4')
const path = require('path')
const axios = require('axios')

const upload = (app,file) => {
    return new Promise(async (resolve, reject) => {
        const day = dayjs().format('YYYY-MM-DD')
        const stream = fs.createReadStream(file.path)
        const res = await app.uploadFile({
            cloudPath: `tcb-cms/${day}/${uuidv4()}${path.extname(file.name)}`,
            fileContent: stream,
        })
        console.log('file uploaded: ', res);
        resolve({
            fileName: file.name,
            fileID: res.fileID
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

const getImageInfo = async file => {
  const infos = await axios.get(`${file.download_url}?imageInfo`)
  return {
    ...file,
    ...infos.data,
  }
}

const uploader = {
    dataFormat,
    upload,
    getURL,
    getImageInfo,
}

module.exports = uploader