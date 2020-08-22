import { Fragment, useState, useEffect } from 'react'
import { MinusCircleOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Divider, Space, Switch, Select, Button } from 'antd'
import { SchemaFields, SchemaFieldAttributesMapping, SchemaFieldTypes } from '@/models/schema'

const RenderSchemaFieldsByType = props => {
  const { type, ...restProps } = props
  if (type === 'input') {
    return (
      <Input {...restProps} />
    )
  } else if (type === 'number') {
    return (
      <InputNumber {...restProps} />
    )
  } else if (type === 'boolean') {
    return (
      <Switch {...restProps} />
    )
  } else if (type === 'select') {
    return (
      <Select {...restProps} options={SchemaFieldTypes} />
    )
  }
}

const RenderSchemaFieldAttributesByType = props => {
  const { SchemaFields } = props;
  if (SchemaFields.filter(sf => sf.value === 'string')) {
    const attributes = SchemaFieldAttributesMapping.StringAttributes
    return (
      <Space style={{
        display: 'flex',
        width: '100%',
        flexFlow: 'row wrap',
        justifyContent: 'space-around'
      }} align="start">
        {attributes.map(attr => (
          <Form.Item
            key={attr.name}
            name={attr.name}
            label={attr.label}
            style={{ marginBottom: '16px' }}
          >
            <RenderSchemaFieldsByType type={attr.type} />
          </Form.Item>
        ))}
      </Space>
    )
  } else if (SchemaFields.filter(sf => sf.value === 'string')) {
    const attributes = SchemaFieldAttributesMapping.ConnectAttributes
    return (
      <Space style={{
        display: 'flex',
        width: '100%',
        flexFlow: 'row wrap',
        justifyContent: 'space-around'
      }} align="start">
        {attributes.map(attr => (
          <Form.Item
            key={attr.name}
            name={attr.name}
            label={attr.label}
            style={{ marginBottom: '16px' }}
          >
            <RenderSchemaFieldsByType type={attr.type} />
          </Form.Item>
        ))}
      </Space>
    )
  }
  return null
}

export const RenderSchemaFields = props => {
  const { fields, deleteField } = props;
  return fields.length && fields.map((field, i) => (
    <Fragment key={field.fieldName}>
      <Form
        layout="inline"
        name={`advanced-${i}`}
        initialValues={field}
      >
        <Space style={{
          display: 'flex',
          width: '100%',
          flexFlow: 'row wrap',
          justifyContent: 'space-around'
        }} align="start">
          {SchemaFields.map(sc => (
            <Form.Item
              key={sc.name}
              name={sc.name}
              label={sc.label}
              required={sc.required}
              hidden={sc.hidden}
              style={{ marginBottom: '16px' }}
            >
              <RenderSchemaFieldsByType type={sc.type} />
            </Form.Item>
          ))}
        </Space>
        <RenderSchemaFieldAttributesByType SchemaFields={SchemaFields} />
      </Form>
      <Button htmlType="button" onClick={() => deleteField(field.fieldId)}>
        <MinusCircleOutlined /> Delete the field
      </Button>
      <Divider />
    </Fragment>
  )) || null
}

const RenderSchemaColumns = props => {
  const { name, label, readonly, type, required, ...restProps } = props;
  if (type === 'input') {
    let disabled = {}
    if (readonly) disabled = { disabled: true }
    return (
      <Form.Item
        label={label}
        name={name}
        required={required}
        style={{ marginBottom: '16px' }}
      >
        <Input {...restProps} {...disabled} />
      </Form.Item>
    );
  } else if (type === 'number') {
    return (
      <Form.Item
        label={label}
        name={name}
        required={required}
        style={{ marginBottom: '16px' }}
      >
        <InputNumber {...restProps} />
      </Form.Item>
    )
  }
  return null
}

export default RenderSchemaColumns
