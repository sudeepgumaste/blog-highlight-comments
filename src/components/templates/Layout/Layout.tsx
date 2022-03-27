import Head from 'next/head'
import Nav from '../../atoms/Nav/Nav'

import styles from './_.module.css'

import clsx from 'clsx'

interface Props {
  children: JSX.Element
  title: string
  description: string
  content: string
}

const Layout = ({
  children,
  title,
  description,
  content
}: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name={description} content={content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main
        className={clsx(
          styles.content,
          'tw-bg-bg-layer-1 | tw-text-gray-300 | tw-py-4 | tw-relative'
        )}
      >
        {children}
        <div id="inline-comment-float-portal" />
      </main>
    </>
  )
}

export default Layout
