import dynamic from 'next/dynamic'
import Link from 'next/link'

import {
  ApiOutlined,
  LineChartOutlined,
  LogoutOutlined,
  PictureOutlined,
  ReadOutlined,
  SettingOutlined,
  TagOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons'

import { Route, MenuDataItem } from '@ant-design/pro-layout/lib/typings'
import { SiderMenuProps } from '@ant-design/pro-layout/lib/SiderMenu/SiderMenu'
import BreadCrumb from '../components/breadcrumb'

const ProLayout = dynamic(() => import('@ant-design/pro-layout'), {
  ssr: false,
})

const ROUTES: Route = {
  path: '/',
  routes: [
    {
      path: '/dashboard',
      name: '统计分析',
      icon: <LineChartOutlined />,
    },
    {
      path: '/operate',
      name: '运营',
      icon: <TagOutlined />,
      routes: [
        {
          path: '/albums',
          name: '相册',
          icon: <PictureOutlined />,
        },
        {
          path: '/articles',
          name: '文章',
          icon: <ReadOutlined />,
        },
      ],
    },
    {
      path: '/settings',
      name: '管理',
      icon: <SettingOutlined />,
      routes: [
        {
          path: '/content',
          name: '内容设置',
          icon: <ToolOutlined />,
        },
        {
          path: '/webhooks',
          name: 'Webhooks',
          icon: <ApiOutlined />,
        },
      ],
    },
    {
      path: '/profile',
      name: '个人信息',
      icon: <UserOutlined />,
    },
    {
      path: '/logout',
      name: '退出',
      icon: <LogoutOutlined />
    }
  ],
}

const menuHeaderRender = (
  logoDom: React.ReactNode,
  titleDom: React.ReactNode,
  props: SiderMenuProps
) => (
  <Link href="/">
    <a>
      {logoDom}
      {!props?.collapsed && titleDom}
    </a>
  </Link>
)

const menuItemRender = (options: MenuDataItem, element: React.ReactNode) => (
  <Link href={options.path}>
    <a>{element}</a>
  </Link>
)

export default function Main({ children }) {
  return (
    <ProLayout
      style={{ minHeight: '100vh' }}
      route={ROUTES}
      menuItemRender={menuItemRender}
      menuHeaderRender={menuHeaderRender}
    >
      <BreadCrumb />
      {children}
    </ProLayout>
  )
}
