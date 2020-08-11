import { Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import Link from 'next/link'
import './index.less'

const breadcrumbNameMap = {
    '/dashboard': '统计分析',
    '/operate': '运营',
    '/content': '内容管理',
    '/content_edit': '内容设定',
    '/webhooks': 'Webhooks',
    '/profile': '个人信息',
    '/logout': '退出',
}

const BreadCrumb = () => {
    const router = useRouter();
    const pathSnippets = router.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link href={url}>
                  <span>{breadcrumbNameMap[url]}</span>
                </Link>
            </Breadcrumb.Item>
        );
    });
    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link href="/">
                <HomeOutlined />
            </Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
    return (
        <div className="custom-breadcrumb">
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        </div>
    )
}

export default BreadCrumb;
