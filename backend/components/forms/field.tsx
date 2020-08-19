import { Form, Input, InputNumber } from 'antd'
import { SSubContent } from '@/models/content.schema'

export const RenderSubForm = props => {
  const { fields } = props;
  return fields.map((field, i) => (
    <Form
      layout="vertical"
      key={`form-${i}`}
      name={`advanced-${i}`}
      initialValues={field}
    >
      {SSubContent.map(sc => (
        <Form.Item
          key={sc.name}
          name={sc.name}
          label={sc.label}
        >
          <Input />
        </Form.Item>
        ))}
    </Form>
  ))
}

const RenderFormItems = props => {
  const { name, label, ...restProps } = props;
  if (['createTime', 'updateTime', 'id'].includes(name)) {
    return (
      <Form.Item
        label={label}
        name={name}
      >
        <Input {...restProps} disabled={true} />
      </Form.Item>
    );
  } else if (name === 'order') {
    return (
      <Form.Item
        label={label}
        name={name}
      >
        <InputNumber {...restProps} />
      </Form.Item>
    )
  } else if (name === 'fields') {
    return null;
  } else {
    return (
      <Form.Item
        label={label}
        name={name}
      >
        <Input {...restProps} />
      </Form.Item>
    )
  }
}

export default RenderFormItems
