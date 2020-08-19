import { Space, Form, Button } from 'antd'
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
        {SContent.map(content => {
          const { name, label } = content
          return (
            <RenderFormItems key={name} name={name} label={label} />
          )
        })}
      </Form>
      {collection.fields ? <RenderSubForm fields={collection.fields} /> : <RenderSubForm fields={[{}]} />}
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </>
  );
};

export default FormContent;
