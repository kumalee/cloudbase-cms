// import Container from '../components/container'
// import MoreStories from '../components/more-stories'
// import HeroPost from '../components/hero-post'
// import Intro from '../components/intro'
import Layout from '../components/layout'
import Content from '../components/content'
import IndexContent from '../components/index_content'
import { getHomePageData } from '../lib/api'
import Head from 'next/head'

export default function Index(props) {
  const { picture, name, desc} = props.data[0];
  return (
    <>
      <Layout>
        <Head>
          <title>Freeman - Architecture Photographer</title>
        </Head>
        <Content>
          <IndexContent picture={picture} name={name} desc={desc} />
        </Content>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      data: await getHomePageData()
    }
  }
}
