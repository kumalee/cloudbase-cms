import Link from 'next/link';
import { Menu } from 'antd';

const menuArray = [
  {
    title: '首页',
    href: '/',
    key: 'home',
  },
  {
    title: '作品',
    key: 'products',
    subMenus: [
      {
        title: '住宅',
        href: '/products/residents',
        key: 'residents',
      },
      {
        title: '商业',
        href: '/products/commercial',
        key: 'commercial',
      },
      {
        title: '其他',
        href: '/products/others',
        key: 'others',
      }
    ]
  },
  {
    title: '简介',
    href: '/about',
    key: 'about',
  }
]

const { SubMenu, Item } = Menu;

export default function FFMenu(props) {
  return (
    <Menu
      style={{ width: '100%' }}
      defaultSelectedKeys={[props.defaultKey]}
      defaultOpenKeys={[props.openKey || props.defaultKey]}
      mode="inline"
    >
      {menuArray.map(menu => {
        if (menu.subMenus) {
          return (
            <SubMenu key={menu.key} title={menu.title}>
              {menu.subMenus.map(subMenu => (
                <Item key={subMenu.key}>
                  <Link href="/products/[slug]" as={subMenu.href}>
                    <a>{subMenu.title}</a>
                  </Link>
                </Item>
              ))}
            </SubMenu>
          )
        } else {
          return (
            <Item key={menu.key}>
              <Link href={menu.href}>
                <a>{menu.title}</a>
              </Link>
            </Item>
          )
        }
      })}
    </Menu>
  )
}
