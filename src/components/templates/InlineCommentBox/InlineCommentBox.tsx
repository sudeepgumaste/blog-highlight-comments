import { createPortal } from 'react-dom'

interface Props {
  commentId: string
  comment: string
  position: {
    x: number
    y: number
  }
  toggleComment
}

const InlineCommentBox = ({
  comment,
  commentId,
  position,
  toggleComment
}: Props): JSX.Element => {
  const render = () => (
    <div
      className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 | tw-z-50"
      onClick={toggleComment}
    >
      <div
        style={{
          top: position.y,
          left: position.x
        }}
        className="tw-absolute | tw-p-4 | tw-bg-bg-layer-2 | tw-rounded-xl | tw-shadow-xl | tw-text-white"
      >
        {comment}
      </div>
    </div>
  )

  return createPortal(
    render(),
    document.getElementById('inline-comment-float-portal')
  )
}

export default InlineCommentBox
