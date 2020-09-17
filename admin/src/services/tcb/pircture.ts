import { initTcb } from './init'
import axios from 'axios'

export const addPicture = async (picture) => {
  const { app } = initTcb()
  // const links = await app
  //   .getTempFileURL({
  //     fileList: [picture.fileID]
  //   });
  // const res = await axios.get(`${links.fileList[0].download_url}?imageInfo`);
  // res format
  // {"format": "png", "width": "3000", "height": "3000", "size": "145081", "md5": "30dcef0df11f0c42752b5ee056d54abb", "photo_rgb": "0xe0e0e0"}
  await app.callFunction({
    name: 'tcb-ext-cms-api',
    data: {
      "operate": "create",
      "resource": "pictures",
      "params": {
        data: picture
      }
    }
  });
}

export const getPictures = async (props: any) => {
  const { page = 1, pageSize = 100 } = props;
  const { app } = initTcb()
  const res = await app.callFunction({
    name: 'tcb-ext-cms-api',
    data: {
      "operate": "getList",
      "resource": "pictures",
      "params": {
        "filter": {},
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
  const links = await app
    .getTempFileURL({
      fileList: pictures.map(p => p.picture)
    });
  const result = pictures.map(p => {
    const file = links.fileList.find(l => l.fileID === p.picture)
    console.log('file:', file);
    if (file) {
      p.link = file.download_url;
    }
    return p;
  })
  return result;
}
