const dataFormat = (data) => {
    return {
        msg: '',
        code: 0,
        data: data,
    }
}

const deleteFilesFromCOS = async (app, fileIDs) => {
  const { fileList } = await app.deleteFile({
    fileList: fileIDs
  })
  return fileList;
}

const deleteFilesFromDB = async (app, recordIDs) => {
  const res = await app.callFunction({
    name: 'tcb-ext-cms-api',
    data: {
      "operate": "deleteMany",
      "resource": "pictures",
      "params": {
        ids: recordIDs,
      },
    }
  });
  return res;
}

const deleter = {
    dataFormat,
    deleteFilesFromCOS,
    deleteFilesFromDB,
}

module.exports = deleter