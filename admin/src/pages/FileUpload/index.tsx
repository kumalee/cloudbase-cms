import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button, Space, message } from 'antd';
import { CloudUploadOutlined, EditOutlined, CheckSquareOutlined, DeleteOutlined, StopOutlined } from '@ant-design/icons';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import Chinese from '@uppy/locales/lib/zh_CN';
import { DashboardModal } from '@uppy/react';
import { getAuthHeader, deletePictures } from '@/services/tcb';
import endpoints from '@/services/tcb/endpoints';
import List from './list';
import './style.less';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css'

export default (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('single');
  const [reloadPircture, setReloadPicture] = useState(new Date());
  const [choosedPictures, setChoosedPictures] = useState({ids:[], fileIDs:[]});
  const [theuppy, setUppy] = useState();
  const deletePhotos = useCallback(() => {
    if (choosedPictures.ids.length) {
      deletePictures(choosedPictures);
    } else {
      message.info("You haven't selected any picture");
    }
  },[choosedPictures]);
  const setSelectedPictures = (selecteds) => {
    setChoosedPictures(selecteds)
  }
  useEffect(() => {
    const setUpUppy = async () => {
      const headers = await getAuthHeader()
      const uppy = new Uppy({ locale: Chinese })
      .use(XHRUpload, {
        headers,
        endpoint: endpoints.upload,
        maxFileSize: 500 * 1024 * 1024,
        maxNumberOfFiles: 10,
        timeout: 300 * 1000,
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
      uppy.on('complete', (result) => {
        if (result.failed && !result.failed.length) {
          setReloadPicture(new Date());
        }
      })
      setUppy(uppy)
    }
    setUpUppy()
  },[])
  return (
    <PageContainer>
      <Card>
        <Space>
          {mode === 'batch' ? (
            <Fragment>
              <Button type="primary" onClick={()=>{}}>
                <EditOutlined />
                Edit
              </Button>
              <Button type="danger" onClick={deletePhotos}>
                <DeleteOutlined />
                Delete
              </Button>
              <Button type="ghost" onClick={()=>{setMode('single')}}>
                <StopOutlined />
                Cancel
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button type="primary" onClick={()=>{setIsOpen(true)}}>
                <CloudUploadOutlined />
                Upload Files
              </Button>
              <Button type="primary" onClick={()=>{setMode('batch')}}>
                <CheckSquareOutlined />
                Batch Edit
              </Button>
            </Fragment>
          )}
        </Space>
        {theuppy ? (<DashboardModal
          uppy={theuppy}
          closeModalOnClickOutside
          open={isOpen}
          onRequestClose={()=>{setIsOpen(false)}}
        />) : null}
        <List reloadPircture={reloadPircture} mode={mode} selectedPictures={choosedPictures} setSelectedPictures={setSelectedPictures} />
      </Card>
    </PageContainer>
  );
}
