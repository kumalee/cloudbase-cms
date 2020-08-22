import { useRef, useState, useEffect } from 'react'
import { Form, Button, Divider, Space } from 'antd'
import { v4 as uuidV4 } from 'uuid'
import { SchemaColumns } from '@/models/schema'
import RenderSchemaColumns, { RenderSchemaFields } from './field'

const FormSchema = props => {
  const { collection } = props;
  const refForm = useRef(null);
  const [localFields, setLocalFields] = useState([{ fieldId: uuidV4() }])
  useEffect(() => {
    collection && setLocalFields(collection.fields.map(field => {
      field.fieldId = uuidV4()
      return field
    }))
  }, [collection])
  const onFinish = values => {
    console.log('Success:', values)
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

  return (
    <>
      <Form
        layout="inline"
        name="basic"
        initialValues={collection}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
      </Form>
      <Divider />
      <RenderSchemaFields fields={localFields} deleteField={deleteField} />
      <Button type="primary" htmlType="button" onClick={addField}>
        Add New Field
      </Button>
      <Divider />
      <Button type="primary" htmlType="submit" onClick={onSubmitAllForm}>
        Save Collection Settings
      </Button>
    </>
  );
};

export default FormSchema;
