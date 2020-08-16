export interface IFields {
  fieldLabel: string,
  fieldName: string,
  fieldType: string,
  hidden?: boolean,
  stringMaxLength?: number,
  stringMinLength?: number,
  helpText?: string,
  isRequired?: boolean,
  connectField?: string,
  connectResource?: string,
}

export interface IContent {
  id: string,
  icon?: string,
  label: string,
  collectionName: string,
  description?: string,
  fields: IFields[],
  order?: number,
  createTime: Date,
  updateTime: Date,
}