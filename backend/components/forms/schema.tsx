import { useRef, useState, useEffect } from 'react'
import { Form, Button, Divider, Space } from 'antd'
import { v4 as uuidV4 } from 'uuid'
import md5 from './md5'
import { SchemaColumns } from '@/models/schema'
import RenderSchemaColumns, { RenderSchemaFields } from './field'
import { UpdateContent } from '@/services/content'

const deleteUnusedKeys = (values, keys) => {
  keys.forEach(key => {
    if (!values[key]) delete values[key]
  })
}

const FormSchema = props => {
  const { collection, mode } = props;
  const refForm = useRef(null);
  const [fieldsDone, setFieldsDone] = useState(false)
  const [localFields, setLocalFields] = useState([{ fieldId: uuidV4() }])
  const [md5key, setMd5key] = useState(md5(JSON.stringify({ field: uuidV4() })))
  useEffect(() => {
    collection && setLocalFields(collection.fields.map(field => {
      field.fieldId = uuidV4()
      Object.keys(field).forEach(key => {
        const name = key === 'isRequired' ? 'required' : key
        collection[`${name}-${field.fieldId}`] = field[key]
      })
      return field
    }))
    if (mode === 'new' || (mode === 'edit' && collection)) {
      setFieldsDone(true)
      collection && setMd5key(md5(JSON.stringify(collection)))
    }
  }, [collection, mode])

  const onFinish = values => {
    console.log('Success:', values)
    const fields = localFields.map(lf => ({ fieldId: lf.fieldId }))
    const keys = Object.keys(values)
    keys.forEach(key => {
      const _id = key.match(/(?<=-).*(\w|\d){12}/)
      if (_id) {
        const _name = key.match(/\w+(?=-)/)
        const field = fields.find(f => f.fieldId === _id[0])
        if (field && _name[0]!=='fieldId' && values[key] !== undefined) {
          field[_name[0]] = values[key]
        }
        delete values[key]
      }
    })
    deleteUnusedKeys(values, ['_id', 'createTime', 'updateTime'])
    values.fields = fields.map(f=>{delete f.fieldId;return f})
    UpdateContent(values);
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const addField = () => {
    setLocalFields(localFields.concat({ fieldId: uuidV4() }))
  }

  const deleteField = fieldId => {
    setLocalFields(localFields.filter(lf => lf.fieldId !== fieldId ))
  }

  const onSubmitAllForm = () => {
    refForm.current.submit()
  }

  const onFieldsChange = (changedField, allFields) => {
    console.log('changed Field', changedField, allFields)
    console.log('localFields:', localFields)
  }

  const onValuesChange = (value) => {
    const keys = Object.keys(value)
    if (keys && keys[0]) {
      const key = keys[0]
      const _id = key.match(/(?<=-).*(\w|\d){12}/)
      if (_id) {
        const _name = key.match(/\w+(?=-)/)
        const vals = Object.values(value)
        if (_name[0] === 'fieldType') {
          console.log(_name[0], _id[0], vals[0])
          console.log('localFields:', localFields)
          localFields.find(lf => lf.fieldId === _id[0])[_name[0]] = vals[0]
          setLocalFields(localFields)
          setMd5key(md5(JSON.stringify(localFields)))
          if (vals[0] === 'Connect') {
            // do something
          } else if (vals[0] === 'String') {
            // do something
          } else {
            // hide all specific attributes
          }
        }
      }
    }
  }

  return fieldsDone && (
    <>
      <Form
        layout="inline"
        name="basic"
        initialValues={collection}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        onFieldsChange={onFieldsChange}
        ref={refForm}
      >
        <Space style={{
          display: 'flex',
          width: '100%',
          flexFlow: 'row wrap'
        }} align="start">
          {SchemaColumns.map(column =>
            <RenderSchemaColumns key={column.name} {...column} />
          )}
        </Space>
        <Divider />
        <RenderSchemaFields key={md5key} fields={localFields} deleteField={deleteField} />
      </Form>
      <Button type="primary" htmlType="button" onClick={addField}>
        Add New Field
      </Button>
      <Divider />
      <Button type="primary" htmlType="submit" onClick={onSubmitAllForm}>
        Save Collection Settings
      </Button>
    </>
  ) || null;
};

export default FormSchema;
