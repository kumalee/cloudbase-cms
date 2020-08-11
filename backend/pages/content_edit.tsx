import MainLayout from '../layouts/main'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Content() {
  const router = useRouter()
  const { query } = router
  const { mode, id } = query
  const [columns, setColumns] = useState([])
  useEffect(() => {
    const getColumns = async () => {
      if (id) {
        setColumns([{
          name: 'name'
        }])
      }
    }
    getColumns()
  },[id, mode])
  return (
    <MainLayout>
      <div>
        Content Edit
      </div>
    </MainLayout>
  )
}
