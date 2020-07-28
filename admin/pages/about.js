// import Container from '../components/container'
// import MoreStories from '../components/more-stories'
// import HeroPost from '../components/hero-post'
// import Intro from '../components/intro'
import Layout from '../components/layout'
import Content from '../components/content'
import AboutContent from '../components/about_content'
// import { getAllPosts } from '../lib/api'
import Head from 'next/head'

export default function Index() {
  return (
    <>
      <Layout>
        <Head>
          <title>Freeman - Architecture Photographer</title>
        </Head>
        <Content defaultKey="about">
          <AboutContent />
        </Content>
      </Layout>
    </>
  )
}

// export async function getStaticProps() {
//   const allPosts = getAllPosts([
//     'title',
//     'date',
//     'slug',
//     'author',
//     'coverImage',
//     'excerpt',
//   ])

//   return {
//     props: { allPosts },
//   }
// }
