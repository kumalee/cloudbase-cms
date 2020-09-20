import { initTcb } from './init'

export const getPictures = async (props: any) => {
  const { page = 1, pageSize = 100, filter = {} } = props;
  const { app } = initTcb()
  const res = await app.callFunction({
    name: 'tcb-ext-cms-api',
    data: {
      "operate": "getList",
      "resource": "pictures",
      "params": {
        "filter": filter,
        "pagination": {
          "page": page,
          "perPage": pageSize,
        },
        "sort":{
          "field": "createTime",
          "order": "DESC",
        },
      }
    }
  });
  const pictures = res.result.data;
  return pictures;
}

export const deletePictures = async (props: any) => {
  const { ids, fileIDs } = props;
  const { app } = initTcb()
  const res = await app.callFunction({
    name: 'tcb-ext-cms-del-files',
    data: {
      "ids": ids,
      "fileIDs": fileIDs,
    },
  });
  const pictures = res.result.data;
  return pictures;
}
