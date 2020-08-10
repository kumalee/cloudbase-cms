import { initTcb } from './init'

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
          "perPage":100
        },
        "sort":{
          "field":"order",
          "order":"DESC"
        }
      }
    }
  });
}
