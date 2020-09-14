import { initTcb } from './init'

export const addPicture = async (picture) => {
  console.log('picture:', picture);
  const { app } = initTcb()
   await app.callFunction({
    name: 'tcb-ext-cms-api',
    data: {
      "operate": "create",
      "resource": "pictures",
      "params": {
        data: {
          "picture": picture.fileID,
          "name": picture.fileName,
        }
      }
    }
  });
}
