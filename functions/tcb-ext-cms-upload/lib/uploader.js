const fs = require('fs')
const dayjs = require('dayjs')
const uuidv4 = require('uuid/v4')
const path = require('path')

const upload = (app,file) => {
    return new Promise(async (resolve, reject) => {
        const day = dayjs().format('YYYY-MM-DD')
        const stream = fs.createReadStream(file.path)
        const { fileID } = await app.uploadFile({
            cloudPath: `tcb-cms/${day}/${uuidv4()}${path.extname(file.name)}`,
            fileContent: stream,
        })
        resolve({
            fileName: file.name,
            fileID
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
    const json = {}
    fileList.forEach(({ fileID, tempFileURL }, index) => {
        const { fileName } = files[index]
        json[`${fileName}`] = tempFileURL
    })
    return dataFormat(json)
}

const uploader = {
    upload,
    getURL
}

module.exports = uploader