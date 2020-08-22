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
    const { value: checked, ...rrProps } = restProps
    return (
      <Switch checked={checked} {...rrProps} />
    )
  } else if (type === 'select') {
    return (
      <Select {...restProps} options={SchemaFieldTypes} />
    )
  }
}

const RenderSchemaFieldAttributesByType = props => {
  const { SchemaFields, field } = props;
  if (SchemaFields.filter(sf => sf.name === 'fieldType').length && field.fieldType === 'String') {
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
            name={`${attr.name}-${field.fieldId}`}
            label={attr.label}
            style={{ marginBottom: '16px' }}
          >
            <RenderSchemaFieldsByType type={attr.type} />
          </Form.Item>
        ))}
      </Space>
    )
  } else if (SchemaFields.filter(sf => sf.name === 'fieldType').length && field.fieldType === 'Connect') {
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
            name={`${attr.name}-${field.fieldId}`}
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
    <Fragment key={field.fieldId}>
      <Space style={{
        display: 'flex',
        width: '100%',
        flexFlow: 'row wrap',
        justifyContent: 'space-around'
      }} align="start">
        {SchemaFields.map(sc => (
          <Form.Item
            key={sc.name}
            name={`${sc.name}-${field.fieldId}`}
            label={sc.label}
            required={sc.required}
            hidden={sc.hidden}
            style={{ marginBottom: '16px' }}
          >
            <RenderSchemaFieldsByType type={sc.type} />
          </Form.Item>
        ))}
      </Space>
      <RenderSchemaFieldAttributesByType field={field} SchemaFields={SchemaFields} />
      <Button htmlType="button" onClick={() => deleteField(field.fieldId)}>
        <MinusCircleOutlined /> Delete the field
      </Button>
      <Divider />
    </Fragment>
  )) || null
}

const RenderSchemaColumns = props => {
  const { name, label, readonly, type, required, defaultValue, ...restProps } = props;
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
