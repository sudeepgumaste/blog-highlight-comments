import { useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  tagId: string
  position: {
    x: number
    y: number
  }
}

const HighlightCommentPopup = ({ tagId, position }: Props): JSX.Element => {
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ comment, tagId })
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
