import { createPortal } from 'react-dom'

interface Props {
  comments: InlineComment[]
  position: {
    x: number
    y: number
  }
  toggleComment: () => void
}

const InlineCommentBox = ({
  comments,
  position,
  toggleComment
}: Props): JSX.Element => {
  const render = () => (
    <div className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 | tw-z-50">
      <div
        className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-bottom-0"
        onClick={e => {
          toggleComment()
          e.stopPropagation()
        }}
      />
      <ul
        style={{
          top: position.y,
          left: position.x
        }}
        className="tw-absolute | tw-p-4 | tw-bg-bg-layer-2 | tw-rounded-xl | tw-shadow-xl | tw-text-white | tw-flex tw-flex-col"
      >
        {comments.map(commentObj => (
          <li key={commentObj.commentId} className="last:tw-mb-0 tw-mb-2">
            <p>{commentObj.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  )

  return createPortal(
    render(),
    document.getElementById('inline-comment-float-portal')
  )
}

export default InlineCommentBox
