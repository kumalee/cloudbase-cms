import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Button } from 'antd';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import Chinese from '@uppy/locales/lib/zh_CN';
import { DashboardModal } from '@uppy/react';
import { getAuthHeader, addPicture } from '@/services/tcb';
import endpoints from '@/services/tcb/endpoints';
import styles from './style.less';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css'

const CodePreview: React.FC<{}> = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const uppy = new Uppy({ locale: Chinese })
  .use(XHRUpload, {
    headers: getAuthHeader(),
    endpoint: endpoints.upload
  })

uppy.on('upload-success', (file, response) => {
  console.log(file, response)
  const { body } = response;
  addPicture(body.data.succMap[0]);
})

export default (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PageContainer>
      <Card>
        <Alert
          message="更快更强的重型组件，已经发布。"
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          高级表格{' '}
          <a href="https://protable.ant.design/" rel="noopener noreferrer" target="__blank">
            欢迎使用
          </a>
        </Typography.Text>
        <CodePreview>yarn add @ant-design/pro-table</CodePreview>
        <Typography.Text
          strong
          style={{
            marginBottom: 12,
          }}
        >
          高级布局{' '}
          <a href="https://prolayout.ant.design/" rel="noopener noreferrer" target="__blank">
            欢迎使用
          </a>
        </Typography.Text>
        <CodePreview>yarn add @ant-design/pro-layout</CodePreview>
        <Button onClick={()=>{setIsOpen(true)}}>Upload File</Button>
        <DashboardModal
          uppy={uppy}
          closeModalOnClickOutside
          open={isOpen}
          onRequestClose={()=>{setIsOpen(false)}}
        />
      </Card>
    </PageContainer>
  );
}
