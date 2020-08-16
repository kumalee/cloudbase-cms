import { Form, Input, InputNumber, Checkbox, DatePicker } from 'antd'
import moment from 'moment'

const DateTime = props => {
  let defaultValue = null;
  const { value, disabled, ...restProps } = props
  if (value) {
    defaultValue = moment(value)
  }
  return (
    <DatePicker defaultValue={defaultValue} disabled={disabled} {...restProps} />
  )
}

const RenderFormItems = props => {
  const { key, ...restProps } = props;
  if (['createTime', 'updateTime', 'id'].includes(key)) {
    return (
      <Form.Item
        label={key}
        name={key}
      >
        { key === 'id' ? <Input {...restProps} disabled={true} /> :<DateTime {...restProps} disabled={true} />}
      </Form.Item>
    );
  } else if (key === 'order') {
    return (
      <Form.Item
        label={key}
        name={key}
      >
        <InputNumber {...restProps} />
      </Form.Item>
    )
  } else {
    return (
      <Form.Item
        label={key}
        name={key}
      >
        <Input {...restProps} />
      </Form.Item>
    )
  }
}