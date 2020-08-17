import { Form, Input, Button, Checkbox } from 'antd'
import { SContent } from '@/models/content.schema'
import RenderFormItems from './field'

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 3, span: 16 },
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
        const { name, label } = content
        return (
          <RenderFormItems key={name} name={name} label={label} />
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
