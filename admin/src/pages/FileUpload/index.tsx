import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Button } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import Chinese from '@uppy/locales/lib/zh_CN';
import { DashboardModal } from '@uppy/react';
import { getAuthHeader, addPicture } from '@/services/tcb';
import endpoints from '@/services/tcb/endpoints';
import List from './list';
import styles from './style.less';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css'

const uppy = new Uppy({ locale: Chinese })
  .use(XHRUpload, {
    headers: getAuthHeader(),
    endpoint: endpoints.upload,
    maxFileSize: 500 * 1024 * 1024,
    maxNumberOfFiles: 10,
    allowedFileTypes: ['image/*', '.jpg', '.jpeg', '.png', '.gif']
  })

uppy.on('file-added', (file) => {
  const data = file.data // is a Blob instance
  const url = URL.createObjectURL(data)
  const image = new Image()
  image.src = url
  image.onload = () => {
    uppy.setFileMeta(file.id, { width: image.width, height: image.height })
    // Call this method when you've finished using an object URL to let the browser know not to keep the reference to the file any longer.
    URL.revokeObjectURL(url)
  }
})

uppy.on('upload-success', (file, response) => {
  console.log(file, response)
  const { body } = response;
  if (body.code) {
    alert(body.code + ': ' + body.message);
  } else {
    console.timeLog('success: ');
    // addPicture(body.data.succMap[0]);
  }
})

export default (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PageContainer>
      <Card>
        <Button type="primary" onClick={()=>{setIsOpen(true)}}>
          <CloudUploadOutlined />
          Upload Files
        </Button>
        <DashboardModal
          uppy={uppy}
          closeModalOnClickOutside
          open={isOpen}
          onRequestClose={()=>{setIsOpen(false)}}
        />
        <List />
      </Card>
    </PageContainer>
  );
}
