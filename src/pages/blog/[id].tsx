import clsx from 'clsx'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import Divider from '../../components/atoms/Divider/Divider'
import HighlightCommentPopup from '../../components/templates/HighlightCommentPopup/HighlightCommentPopup'
import InlineCommentAsterisk from '../../components/templates/InlineCommentAsterisk/InlineCommentAsterisk'
import Layout from '../../components/templates/Layout/Layout'

import useGetBlogById from '../../hooks/api/use-get-blog-by-id'
import useGetInlineComments from '../../hooks/api/use-get-inline-comments'
import useDebounce from '../../hooks/utils/use-debounce'

import styles from './_.module.css'

interface Props {
  id: string
}

const BlogPage = ({ id: blogId }: Props) => {
  const { data: blogRes, isLoading } = useGetBlogById({ id: blogId })
  const { data: inlineCommentsRes } = useGetInlineComments({ id: blogId })

  const [renderComments, setRenderComments] = useState(false)
  const [commentBoxPosition, setCommentBoxPosition] = useState<null | {
    x: number
    y: number
  }>(null)
  const debouncedCommentBoxPosition = useDebounce({
    value: commentBoxPosition,
    debounceTimer: 500
  })

  const blogContentRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMountCommentBox = () => {
      const selection = window.getSelection()

      if (
        selection.anchorNode === selection.focusNode &&
        selection.anchorOffset === selection.focusOffset
      ) {
        setCommentBoxPosition(null)
        return
      }
      const { x: selectionX, y: selectionY } = selection
        .getRangeAt(0)
        .getBoundingClientRect()

      setCommentBoxPosition({
        x: selectionX,
        y: selectionY + 24
      })
    }
    // making sure the blog content is
    // rendered before trying to get the position
    queueMicrotask(() => {
      setRenderComments(true)
      document.addEventListener('selectionchange', handleMountCommentBox)
    })
    // const preserveBlogContentRef = blogContentRef.current

    return () => {
      document.removeEventListener('selectionchange', handleMountCommentBox)
    }
  }, [])

  return (
    <Layout
      content="Hashnode blog"
      description="Blog post about how to write on hashnode"
      title={`Blog ${blogId} | Sudeep Gumaste`}
    >
      <>
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
                ref={blogContentRef}
                className={clsx(styles.blogBody, 'tw-py-9')}
                dangerouslySetInnerHTML={{ __html: blogRes.blog }}
              ></section>
            </article>
          </div>
        )}
        {renderComments &&
          inlineCommentsRes?.comments.map(props => (
            <InlineCommentAsterisk key={props.tagId} {...props} />
          ))}
        {debouncedCommentBoxPosition && (
          <HighlightCommentPopup
            tagId="tag-1"
            position={{
              x: debouncedCommentBoxPosition.x,
              y: debouncedCommentBoxPosition.y
            }}
          />
        )}
      </>
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
