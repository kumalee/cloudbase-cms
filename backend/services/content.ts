import { initTcb } from './init'
import { database } from 'tcb-js-sdk';

// get all collection
export const getCollections = async () => {
  const { app } = initTcb();
  return await app.callFunction({
    name: 'tcb-ext-cms-api',
    data: {
      "operate": "getList",
      "resource": "tcb-ext-cms-contents",
      "params": {
        "filter": {},
        "pagination": {
          "page":1,
          "perPage":100,
        },
        "sort":{
          "field":"order",
          "order":"DESC",
        },
      }
    }
  })
}

// get one collection
export const getOneCollection = async (id: string) => {
  const { app } = initTcb()
  return await app.callFunction({
    name: 'tcb-ext-cms-api',
    data: {
      operate: "getOne",
      resource: "tcb-ext-cms-contents",
      params: {
        id,
      }
    }
  })
}

// get connect content of provided ids
export const GetConnectCollections = async (ids: string[]) => {
  const { app } = initTcb()
  return await app.callFunction({
    name: 'tcb-ext-cms-api',
    data: {
      operate: 'getMany',
      resource: "tcb-ext-cms-contents",
      params: {
        ids
      }
    }
  })
}

export const UpdateContent = async (data) => {
  const { app } = initTcb()
  return await app.callFunction({
    name: 'tcb-ext-cms-api',
    data: {
      operate: 'update',
      resource: "tcb-ext-cms-contents",
      params: {
        id: data._id,
        data,
      }
    }
  })
}
