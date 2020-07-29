import Layout from '../components/layout'
import Content from '../components/content'
import IndexContent from '../components/index_content'
import { getHomePageData } from '../lib/api'
import Head from 'next/head'

export default function Index(props) {
  return (
    <>
      <Layout>
        <Head>
          <title>Freeman - Architecture Photographer</title>
        </Head>
        <Content>
          <IndexContent />
        </Content>
      </Layout>
    </>
  )
}
