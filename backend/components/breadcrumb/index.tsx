import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';

const breadcrumbNameMap = {
    '/dashboard': '统计分析',
    '/content': '内容管理',
    '/webhooks': 'Webhooks',
    '/profile': '个人信息',
    '/logout': '退出'
};

const BreadCrumb = () => {
    const router = useRouter();
    const pathSnippets = router.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link href={url}>{breadcrumbNameMap[url]}</Link>
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
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    )
}

export default BreadCrumb;
