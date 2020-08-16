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

export const EmptyContent:IContent = {
  id: '',
  icon: '',
  label: '',
  collectionName: '',
  description: '',
  fields: [],
  order: 0,
  createTime: new Date(),
  updateTime: new Date(),
}

export const EmptyFields:IFields[] = [{
  fieldLabel: '',
  fieldName: '',
  fieldType: 'input',
}]