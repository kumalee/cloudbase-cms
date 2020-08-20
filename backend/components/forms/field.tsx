import { Fragment } from 'react'
import { MinusCircleOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Divider, Space, Switch, Select, Button } from 'antd'
import { SSubContent } from '@/models/content.schema'

const options = [
  {
    value: 'String',
    label: 'String',
  },
  {
    value: 'DateTime',
    label: 'DateTime',
  },
  {
    value: 'Boolean',
    label: 'Boolean',
  },
  {
    value: 'Number',
    label: 'Number',
  },
  {
    value: 'Image',
    label: 'Image',
  },
  {
    value: 'File',
    label: 'File',
  },
  {
    value: 'Email',
    label: 'Email',
  },
  {
    value: 'Tel',
    label: 'Tel',
  },
  {
    value: 'Url',
    label: 'Url',
  },
  {
    value: 'RichText',
    label: 'RichText',
  },
  {
    value: 'Markdown',
    label: 'Markdown',
  },
  {
    value: 'Array',
    label: 'Array',
  },
  {
    value: 'Connect',
    label: 'Connect',
  },
]

const RenderFieldByType = props => {
  const { type, value, ...restProps } = props
  console.log('restprops:', restProps, value);
  if (type === 'input') {
    return (
      <Input value={value} {...restProps} />
    )
  } else if (type === 'boolean') {
    return (
      <Switch defaultChecked={value} {...restProps} />
    )
  } else if (type === 'select') {
    return (
      <Select {...restProps} value={value} options={options} />
    )
  }
}

export const RenderSubForm = props => {
  const { fields } = props;
  return fields.map((field, i) => (
    <Fragment key={`form-${i}`}>
      <Form
        layout="inline"
        name={`advanced-${i}`}
        initialValues={field}
      >
        <Space style={{ display: 'flex', width: '100%', flexFlow: 'row wrap', justifyContent: 'space-around' }} align="start">
          {SSubContent.map(sc => (
            <Form.Item
              name={sc.name}
              label={sc.label}
              style={{ marginBottom: '16px' }}
            >
              <RenderFieldByType type={sc.type} />
            </Form.Item>
          ))}
        </Space>
      </Form>
      <Button htmlType="button">
        <MinusCircleOutlined /> Delete the field
      </Button>
      <Divider />
    </Fragment>
  ))
}

const RenderFormItems = props => {
  const { name, label, ...restProps } = props;
  if (['createTime', 'updateTime', 'id'].includes(name)) {
    return (
      <Form.Item
        label={label}
        name={name}
        style={{ marginBottom: '16px' }}
      >
        <Input {...restProps} disabled={true} />
      </Form.Item>
    );
  } else if (name === 'order') {
    return (
      <Form.Item
        label={label}
        name={name}
        style={{ marginBottom: '16px' }}
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
        style={{ marginBottom: '16px' }}
      >
        <Input {...restProps} />
      </Form.Item>
    )
  }
}

export default RenderFormItems
