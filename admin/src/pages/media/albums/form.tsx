import React, { useEffect, useState } from 'react';
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
  const [form] = Form.useForm();
  const { visible, setVisible, addAlbum, setReloadAlbums, updateAlbum } = props;
  const { id, name = '', description1 = '', description2 = '' } = props;
  const initialValues = { id, name, description1, description2 };
  useEffect(() => {
    form.resetFields();
  }, [id, name, description1, description2]);
  const handleCancel = () => {
    setVisible(false);
  };
  const onFinish = async (values) => {
    console.log('Success:', values);
    setLoading(true);
    let res;
    if (!values.id) {
      res = await addAlbum(values);
    } else {
      res = await updateAlbum(values);
    }
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
        form={form}
        name="basic"
        initialValues={initialValues}
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
        <Form.Item
          name="id"
        >
          <Input type="hidden" />
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
