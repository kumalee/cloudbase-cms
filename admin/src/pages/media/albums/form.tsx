import React, { useState } from 'react';
import { Modal, Button, Form, Input, Space, message } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default (props): React.ReactNode => {
  const [loading, setLoading] = useState(false);
  const { visible, setVisible, addAlbum, setReloadAlbums } = props;

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values) => {
    console.log('Success:', values);
    setLoading(true);
    const res = await addAlbum(values);
    console.log(res);
    if (res.id) {
      setLoading(false);
      setVisible(false);
      setReloadAlbums(new Date());
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    message.info('Error: ' + JSON.stringify(errorInfo));
  };

  return (
    <Modal
      visible={visible}
      title="Create Album"
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: 'Please input album\'s name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description 1"
          name="description1"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description 2"
          name="description2"
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space size="small">
            <Button type="primary" loading={loading} htmlType="submit">
              Save
            </Button>
            <Button htmlType="button" onClick={handleCancel}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
