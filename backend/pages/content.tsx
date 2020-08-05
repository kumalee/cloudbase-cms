import MainLayout from '../layouts/main'

export default function Content() {
  return (
    <MainLayout>
      <div>
        <h3>内容设置</h3>
        <p>开发者可以根据数据库字段进行内容设置，并自动生成管理界面，修改内容设置后，需刷新页面查看最新的管理界面</p>
      </div>
    </MainLayout>
  )
}
