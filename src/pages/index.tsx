import Head from 'next/head'
import Layout from '../components/templates/Layout/Layout'

export default function Home() {
  return (
    <Layout
      content="Hashnode blog"
      description="Blog post about how to erite on hashnode"
      title="Hashnode | Sudeep Gumaste"
    >
      <h1 className="tw-text-2xl tw-text-center tw-mb-8">Hello, world!</h1>
    </Layout>
  )
}
