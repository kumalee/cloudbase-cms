import { initTcb } from './init'

export const getAlbums = async (props: any) => {
  const { page = 1, pageSize = 100, filter = {} } = props;
  const { app } = initTcb()
  const res = await app.callFunction({
    name: 'tcb-ext-cms-api',
    data: {
      "operate": "getList",
      "resource": "albums",
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
  const albums = res.result.data;
  return albums;
}

export const addAlbum = async (data) => {
  const { app } = initTcb()
  const res = await app.callFunction({
    name: 'tcb-ext-cms-api',
    data: {
      "operate": "create",
      "resource": "albums",
      "params": {
        "data": data
      }
    }
  });
  const album = res.result.data;
  return album;
}

export const updateAlbum = async (data) => {
  const { app } = initTcb()
  const res = await app.callFunction({
    name: 'tcb-ext-cms-api',
    data: {
      "operate": "update",
      "resource": "albums",
      "params": {
        "id": data.id,
        "data": data
      }
    }
  });
  const album = res.result.data;
  return album;
}

export const deleteAlbums = async (ids) => {
  const { app } = initTcb()
  const res = await app.callFunction({
    name: 'tcb-ext-cms-api',
    data: {
      "operate": "deleteMany",
      "resource": "albums",
      "params": {
        "ids": ids
      }
    }
  });
  const albums = res.result.data;
  return albums;
}
