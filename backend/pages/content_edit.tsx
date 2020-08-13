import MainLayout from '../layouts/main'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getOneCollection } from '../services'
import FormContent from '../components/form/content'

type Field = {
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

type Collection = {
  id: string,
  icon?: string,
  label: string,
  collectionName: string,
  description?: string,
  fields: Field[],
  order?: number,
  createTime: string,
  updateTime: string,
}

export default function Content() {
  const router = useRouter()
  const { query } = router
  const { mode, id } = query
  const [collection, setCollection] = useState<Collection | undefined>()
  useEffect(() => {
    const getColumns = async () => {
      if (id) {
        const res = await getOneCollection(id)
        console.log('id, ', id , 'res, ', res);
        if (res && res.result && res.result.data) {
          setCollection(res.result.data);
        }
      }
    }
    getColumns()
  },[id, mode])
  return (
    <MainLayout>
      <div>
        Content Edit
        <FormContent />
        {collection ? (
          <p>
            {collection.id}<br />
            {collection.icon}<br />
            {collection.label}<br />
            {collection.collectionName}<br />
            {collection.description}<br />
            {collection.createTime}<br />
            {collection.updateTime}<br />
            {collection.order}<br />
            {collection.fields.map(field => (
              <p>
                {field.fieldLabel}<br />
                {field.fieldName}<br />
                {field.fieldType}<br />
              </p>
            ))}
          </p>
        ) : null}
      </div>
    </MainLayout>
  )
}
