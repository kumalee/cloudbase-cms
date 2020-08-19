import { IContent, IFields } from './content.d'
import { IField } from './field'

export const SContent:IField[] = [
  {
    name: 'id',
    label: 'ID',
    type: 'input',
    readonly: true,
  },
  {
    name: 'icon',
    label: 'Icon',
    type: 'iconpicker',
  },
  {
    name: 'label',
    label: 'Label',
    type: 'input',
  },
  {
    name: 'collectionName',
    label: 'Collection Name',
    type: 'input',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'input',
  },
  {
    name: 'order',
    label: 'Order',
    type: 'number',
  },
  {
    name: 'createTime',
    label: 'Create Time',
    type: 'datepicker',
    readonly: true,
  },
  {
    name: 'updateTime',
    label: 'Update Time',
    type: 'datepicker',
    readonly: true,
  },
  {
    name: 'fields',
    label: 'Fields',
    type: 'fields',
  },
]

export const SSubContent:IField[] = [
  {
    name: 'fieldLabel',
    label: 'Field Label',
    type: 'input',
  },
  {
    name: 'fieldName',
    label: 'Field Name',
    type: 'input',
  },
  {
    name: 'fieldType',
    label: 'Field Type',
    type: 'select',
  },
  {
    name: 'hidden',
    label: 'Is Hidden?',
    type: 'boolean',
  },
  {
    name: 'isRequired',
    label: 'Is Required?',
    type: 'boolean',
  },
  {
    name: 'helpText',
    label: 'Help Text',
    type: 'input',
  }
]

// Specific Attributes for Input
const SAInput:IField[] = [
  {
    name: 'stringMaxLength',
    label: 'Max Length',
    type: 'number',
  },
  {
    name: 'stringMinLength',
    label: 'Min Length',
    type: 'number',
  },
  {
    name: 'defaultValue',
    label: 'Default Value',
    type: 'input',
  },
]

// Specific Attributes for Connect
const SAConnect:IField[] = [
  {
    name: 'connectResource',
    label: 'Connect Resource',
    type: 'select',
  },
  {
    name: 'connectField',
    label: 'Connect Field to Display',
    type: 'select',
  },
]

export const SFieldTypeMapping = {
  input: SAInput,
  connect: SAConnect,
}

// export const EmptyContent:IContent = {
//   id: '',
//   icon: '',
//   label: '',
//   collectionName: '',
//   description: '',
//   fields: [],
//   order: 0,
//   createTime: new Date(),
//   updateTime: new Date(),
// }

// export const EmptyFields:IFields[] = [{
//   fieldLabel: '',
//   fieldName: '',
//   fieldType: 'input',
// }]