import { Form, Button, Divider, Space } from 'antd'
import { SContent } from '@/models/content.schema'
import RenderFormItems, { RenderSubForm } from './field'

const FormContent = props => {
  const { collection } = props;
  const onFinish = values => {
    console.log('Success:', values)
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Form
        layout="inline"
        name="basic"
        initialValues={collection}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Space style={{ display: 'flex', width: '100%', flexFlow: 'row wrap' }} align="start">
          {SContent.map(content => {
            const { name, label } = content
            return (
              <RenderFormItems key={name} name={name} label={label} />
            )
          })}
        </Space>
      </Form>
      <Divider />
      {collection.fields ? <RenderSubForm fields={collection.fields} /> : <RenderSubForm fields={[{}]} />}
      <Button type="primary" htmlType="button">
        Add New Field
      </Button>
      <Divider />
      <Button type="primary" htmlType="submit">
        Save Collection Settings
      </Button>
    </>
  );
};

export default FormContent;
