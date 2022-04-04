import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import useAddInlineComment from '../../../hooks/api/use-add-inline-comment'

interface Props {
  position: {
    x: number
    y: number
  }
  blogId: number
}

const HighlightCommentPopup = ({ position, blogId }: Props): JSX.Element => {
  const router = useRouter()
  const [comment, setComment] = useState('')
  const [selection, setSelection] = useState<null | {
    startPos: number
    endPos: number
  }>(null)
  const [tagId, setTagId] = useState<string | null>(null)

  const { mutate: handleAddComment, isLoading } = useAddInlineComment()

  useEffect(() => {
    const selection = window.getSelection()
    const { anchorOffset, focusOffset } = selection
    setSelection({
      startPos: anchorOffset,
      endPos: focusOffset
    })

    setTagId(selection.anchorNode.parentElement.id)
  }, [position.x, position.y])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleAddComment({
      comment,
      tagId,
      blogId,
      ...selection
    })
  }

  const render = () => (
    <form
      className=" tw-fixed | tw-p-4 | tw-bg-bg-layer-2 | tw-flex | tw-rounded-md"
      onSubmit={handleSubmit}
      style={{
        left: position.x,
        top: position.y
      }}
    >
      <input
        type="text"
        value={comment}
        onChange={e => {
          setComment(e.target.value)
        }}
        className="tw-bg-bg-layer-1 | tw-px-2 tw-py-1 | tw-flex-1 | tw-mr-2 | tw-rounded-md"
      />
      <button className="tw-bg-blue-500 | tw-rounded-full | tw-text-xs | tw-p-2">
        Send
      </button>
    </form>
  )

  if (typeof window === 'object') {
    // Check if document is finally loaded
    return createPortal(
      render(),
      document.getElementById('inline-comment-float-portal')
    )
  }
  return null
}

export default HighlightCommentPopup
