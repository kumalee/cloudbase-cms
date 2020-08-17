import { Form, Input, InputNumber, Checkbox, DatePicker } from 'antd'
import moment from 'moment'

const DateTime = props => {
  let defaultValue = null;
  const { initialValue, disabled, ...restProps } = props
  if (initialValue) {
    defaultValue = moment(initialValue)
  }
  return (
    <DatePicker defaultValue={defaultValue} disabled={disabled} {...restProps} />
  )
}

const RenderFormItems = props => {
  const { name, label, ...restProps } = props;
  if (['createTime', 'updateTime', 'id'].includes(name)) {
    return (
      <Form.Item
        label={label}
        name={name}
      >
        <Input {...restProps} disabled />
        {/* { name === 'id' ? <Input {...restProps} disabled={true} /> :<DateTime {...restProps} disabled={true} />} */}
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
