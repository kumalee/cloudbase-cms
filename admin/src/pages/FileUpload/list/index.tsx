import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Button } from 'antd';
import Gallery from 'react-photo-gallery';
import { getPictures } from '@/services/tcb';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css'


export default (props): React.ReactNode => {
  const [photos, setPhotos] = useState([]);
  const [data, setData] = useState({});
  useEffect(() => {
    const getPhoto = async () => {
      const res = await getPictures({});
      setData(res);
      setPhotos(res.map(r => ({
        src: `${r.link}?imageMogr2/thumbnail/!25p`,
        width: Number((r.width) / 4),
        height: Number((r.height) / 4),
      })))
    }
    getPhoto();
  }, [])
  return (
    <div className="gallery">
      <Gallery photos={photos} />
    </div>
  );
}
