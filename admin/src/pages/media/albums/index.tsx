import React, { useState, Fragment, useCallback } from 'react';
import { Button, Space, message } from 'antd';
import { CloudUploadOutlined, EditOutlined, CheckSquareOutlined, DeleteOutlined, StopOutlined } from '@ant-design/icons';
import { addAlbum as createAlbum, updateAlbum, deleteAlbums } from '@/services/tcb';
import List from './list';
import EditModalForm from './form';
import './index.less';

export default (): React.ReactNode => {
  const [mode, setMode] = useState('single');
  const [reloadAlbums, setReloadAlbums] = useState(new Date());
  const [choosedAlbums, setChoosedAlbums] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const deleteSelectedAlbums = useCallback(() => {
    if (choosedAlbums.length) {
      setDeleting(true);
      deleteAlbums(choosedAlbums).then(res => {
        setDeleting(false);
        setReloadAlbums(new Date());
      }).catch(error => {
        message.info('Oops: ' + JSON.stringify(error));
      });
    } else {
      message.info("You haven't selected any Album");
    }
  },[choosedAlbums]);
  const setSelectedAlbums = (selecteds) => {
    setChoosedAlbums(selecteds)
  }
  const addAlbum = () => {
    setIsEditing(true);
    // setReloadAlbum(new Date());
  }
  return (
    <Fragment>
      <Space>
        {mode === 'batch' ? (
          <Fragment>
            <Button type="primary" onClick={()=>{}}>
              <EditOutlined />
              Edit
            </Button>
            <Button type="danger" loading={deleting} onClick={deleteSelectedAlbums}>
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
            <Button type="primary" onClick={addAlbum}>
              <CloudUploadOutlined />
              Add Album
            </Button>
            <Button type="primary" onClick={()=>{setMode('batch')}}>
              <CheckSquareOutlined />
              Batch Edit
            </Button>
          </Fragment>
        )}
      </Space>
      <EditModalForm setReloadAlbums={setReloadAlbums} addAlbum={createAlbum} updateAlbum={updateAlbum} visible={isEditing} setVisible={setIsEditing} />
      <List reloadAlbums={reloadAlbums} mode={mode} selectedAlbums={choosedAlbums} setSelectedAlbums={setSelectedAlbums} />
    </Fragment>
  );
}
