import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Skeleton, Space } from 'antd'
import MainLayout from '@/layouts/main'
import { getOneCollection } from '@/services/content'
import { IContent } from '@/models/content.d'
import FormContent from '@/components/forms/schema'
import '@/less/pages/content_edit.less'

export default function Content() {
  const router = useRouter()
  const { query } = router
  const { mode, id = '' } = query
  const [collection, setCollection] = useState<IContent | undefined>()
  useEffect(() => {
    const getColumns = async () => {
      if (id) {
        const res = await getOneCollection(id)
        if (res && res.result && res.result.data) {
          const { createTime, updateTime } = res.result.data
          const data = {
            ...res.result.data,
            createTime: createTime.replace('T', ' ').replace(/\.\d+Z/, ''),
            updateTime: updateTime.replace('T', ' ').replace(/\.\d+Z/, ''),
          }
          setCollection(data);
        }
      }
    }
    getColumns()
  },[id, mode])
  return (
    <MainLayout>
      <Space className="space_content">
        {id ? (
          collection ? <FormContent mode={mode} collection={collection} /> : <Skeleton />
        ): (
          <FormContent mode={mode} />
        )}
      </Space>
    </MainLayout>
  )
}
