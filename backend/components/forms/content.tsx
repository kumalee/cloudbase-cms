import { Form, Input, Button, Checkbox } from 'antd'
import { SContent } from '@/models/content.schema'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const FormContent = props => {
  const { collection } = props;
  const onFinish = values => {
    console.log('Success:', values)
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={collection}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {SContent.map(content => {
        return (
          <Form.Item
            key={content.name}
            label={content.label}
            name={content.name}
          >
            <Input />
          </Form.Item>
        )
      })}

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormContent;
