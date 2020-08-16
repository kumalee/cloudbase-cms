export interface IRule {
  enum?: any[],
  len?: number,
  max?: number,
  message?: string,
  min?: number,
  pattern?: RegExp,
  required?: boolean,
  transform?: (value) => any
  type?: string, // string |number |boolean |url | email |method |regexp |integer |float |array |object |enum |date |hex |any
  validator?: (rule, value) => Promise<IRule>,
  whitespace?: boolean,
  validateTrigger?: string | string[],
}

export interface IField {
  name: string,
  label: string,
  type: 'input' | 'datepicker' | 'timepicker' | 'radio' | 'boolean' | 'select' | 'checkbox' | 'password' | 'number' | 'textarea' | 'autocomplete' | 'cascader' | 'transfer' | 'upload' | 'iconpicker' | 'imagepicker' | 'fields',
  rules?: IRule[],
  readonly?: boolean,
}