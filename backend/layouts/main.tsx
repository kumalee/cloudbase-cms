import dynamic from 'next/dynamic'
import Link from 'next/link'

import {
  SmileOutlined,
  SettingOutlined,
  PlaySquareOutlined,
  LogoutOutlined,
} from '@ant-design/icons'

import { Route, MenuDataItem } from '@ant-design/pro-layout/lib/typings'
import { SiderMenuProps } from '@ant-design/pro-layout/lib/SiderMenu/SiderMenu'

const ProLayout = dynamic(() => import('@ant-design/pro-layout'), {
  ssr: false,
})

const ROUTES: Route = {
  path: '/',
  routes: [
    {
      path: '/',
      name: '内容管理',
      icon: <SmileOutlined />,
      routes: [
        {
          path: '/products',
          name: '作品',
          icon: <SettingOutlined />,
        },
      ],
    },
    {
      path: '/profile',
      name: '个人信息',
      icon: <PlaySquareOutlined />,
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
      {children}
    </ProLayout>
  )
}
