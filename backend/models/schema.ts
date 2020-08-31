import { IColumn } from './column'

export const SchemaColumns:IColumn[] = [
  {
    name: '_id',
    label: 'ID',
    type: 'input',
    readonly: true,
    required: false,
  },
  {
    name: 'icon',
    label: 'Icon',
    type: 'iconpicker',
    required: false,
  },
  {
    name: 'label',
    label: 'Label',
    type: 'input',
    required: true,
  },
  {
    name: 'collectionName',
    label: 'Collection Name',
    type: 'input',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'input',
    required: false,
  },
  {
    name: 'order',
    label: 'Order',
    type: 'number',
    required: false,
    defaultValue: 100,
  },
  {
    name: 'createTime',
    label: 'Create Time',
    type: 'input',
    readonly: true,
    required: false,
  },
  {
    name: 'updateTime',
    label: 'Update Time',
    type: 'input',
    readonly: true,
    required: false,
  },
  {
    name: 'fields',
    label: 'Fields',
    type: 'array',
    required: false,
  },
]

export const SchemaFields:IColumn[] = [
  {
    name: 'fieldLabel',
    label: 'Field Label',
    type: 'input',
    required: true,
  },
  {
    name: 'fieldName',
    label: 'Field Name',
    type: 'input',
    required: true,
  },
  {
    name: 'fieldType',
    label: 'Field Type',
    type: 'select',
    required: true,
  },
  {
    name: 'hidden',
    label: 'Is Hidden?',
    type: 'boolean',
    required: false,
  },
  {
    name: 'required',
    label: 'Is Required?',
    type: 'boolean',
    required: false,
  },
  {
    name: 'helpText',
    label: 'Help Text',
    type: 'input',
    required: false,
  },
  {
    name: 'fieldId',
    label: 'Field Id',
    type: 'input',
    required: false,
    hidden: true,
  },
]

export const SchemaFieldTypes = [
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

// Specific Attributes for String
const StringAttributes:IColumn[] = [
  {
    name: 'stringMaxLength',
    label: 'Max Length',
    type: 'number',
    required: false,
  },
  {
    name: 'stringMinLength',
    label: 'Min Length',
    type: 'number',
    required: false,
  },
  {
    name: 'defaultValue',
    label: 'Default Value',
    type: 'input',
    required: false,
  },
]

// Specific Attributes for Connect
const ConnectAttributes:IColumn[] = [
  {
    name: 'connectResource',
    label: 'Connect Resource',
    type: 'select',
    required: true,
  },
  {
    name: 'connectField',
    label: 'Connect Field to Display',
    type: 'select',
    required: true,
  },
  {
    name: 'connectMany',
    label: 'Connect Many',
    type: 'boolean',
    required: false,
  }
]

export const SchemaFieldAttributesMapping = {
  StringAttributes,
  ConnectAttributes,
}
