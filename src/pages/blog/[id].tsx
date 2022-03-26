import clsx from 'clsx'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useEffect } from 'react'

import Divider from '../../components/atoms/Divider/Divider'
import Layout from '../../components/templates/Layout/Layout'

import useGetBlogById from '../../hooks/api/use-get-blog-by-id'
import useGetInlineComments from '../../hooks/api/use-get-inline-comments'

import styles from './_.module.css'

interface Props {
  id: string
}

const BlogPage = ({ id: blogId }: Props) => {
  const { data: blogRes, isLoading } = useGetBlogById({ id: blogId })
  const { data: inlineCommentsRes } = useGetInlineComments({ id: blogId })

  const handleHighlight = ({ startPos, endPos, tagId }) => {
    const tag = document.getElementById(tagId)
    const innerHtml = tag.innerHTML
    const beforeMark = innerHtml.slice(0, startPos)
    const afterMark = innerHtml.slice(endPos, innerHtml.length)
    const textWithin = innerHtml.slice(startPos, endPos)

    const modifiedHtml = `${beforeMark}<mark id='${tagId}-mark' >${textWithin}</mark>${afterMark}`

    tag.innerHTML = modifiedHtml
  }

  useEffect(() => {
    inlineCommentsRes?.comments.forEach(({ startPos, endPos, tagId }) => {
      // console.log(comment)
      handleHighlight({ startPos, endPos, tagId })
    })
  }, [inlineCommentsRes])

  return (
    <Layout
      content="Hashnode blog"
      description="Blog post about how to write on hashnode"
      title={`Blog ${blogId} | Sudeep Gumaste`}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="tw-max-w-3xl tw-mx-auto | tw-px-4 md:tw-px-0">
          <h1 className="tw-text-4xl tw-font-bold | tw-mb-5">
            Dummy blog post title {blogId}
          </h1>
          <article className="tw-flex tw-flex-col">
            <div className="tw-mb-4">
              <Image
                src="/assets/Banner.png"
                width="768px"
                height="420px"
                alt="banner"
              />
            </div>
            <Divider orientation="horizontal" />
            <section
              className={clsx(styles.blogBody, 'tw-py-9')}
              dangerouslySetInnerHTML={{ __html: blogRes.blog }}
            ></section>
          </article>
        </div>
      )}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      id: params.id
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export default BlogPage
