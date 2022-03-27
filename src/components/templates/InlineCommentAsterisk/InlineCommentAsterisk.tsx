import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import Asterisk from '../../../../public/assets/asterisk.svg'
import InlineCommentBox from '../InlineCommentBox/InlineCommentBox'

interface Props {
  tagId: string
  startPos: number
  endPos: number
  commentId: string
  comment: string
}

const InlineCommentAsterisk = ({
  tagId,
  startPos,
  endPos,
  comment,
  commentId
}: Props) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isCommentsActive, setIsCommentsActive] = useState(false)

  const [commentBoxPosition, setCommentBoxPosition] = useState({
    x: 0,
    y: 0
  })

  const defaultHtml = useRef<string>('')

  useEffect(() => {
    const _innerHtml = document.getElementById(tagId).innerHTML
    defaultHtml.current = _innerHtml
  }, [tagId])

  const handleToggleCommentBoxActive = useCallback(() => {
    setIsCommentsActive(isActive => !isActive)

    const trigger = document.getElementById(`inline-comment-trigger-${tagId}`)
    const html = document.querySelector('html')

    const {
      top: triggerTop,
      left: triggerLeft,
      width: triggerWidth
    } = trigger.getBoundingClientRect()

    setCommentBoxPosition({
      x: triggerLeft + triggerWidth,
      y: triggerTop + html.scrollTop
    })
  }, [tagId])

  const modifyInnerHtml = useCallback(
    ({ startPos, endPos }) => {
      const beforeMark = defaultHtml.current.slice(0, startPos)
      const afterMark = defaultHtml.current.slice(
        endPos,
        defaultHtml.current.length
      )
      const textWithin = defaultHtml.current.slice(startPos, endPos)

      const modifiedHtml = `${beforeMark}<mark id='${tagId}-mark' >${textWithin}</mark>${afterMark}`

      return modifiedHtml
    },
    [tagId]
  )

  const handleHoverOnAsterisk = useCallback(() => {
    let htmlToSet = ''
    if (!isHovered) {
      htmlToSet = modifyInnerHtml({
        startPos,
        endPos
      })
      setIsHovered(true)
    } else {
      htmlToSet = defaultHtml.current
      setIsHovered(false)
    }
    const tag = document.getElementById(tagId)
    tag.innerHTML = htmlToSet
  }, [isHovered, tagId, modifyInnerHtml, startPos, endPos])

  useEffect(() => {
    // deferring the execution of the callback
    setTimeout(() => {
      // have to set the event handler this way because modifying the inner html results in
      // the button losing its event handlers. This ensures they are added back after hover
      // changing
      const inlineCommentTrigger = document.getElementById(
        `inline-comment-trigger-${tagId}`
      )
      inlineCommentTrigger.addEventListener(
        'click',
        handleToggleCommentBoxActive
      )
      if (!isHovered) {
        inlineCommentTrigger.addEventListener(
          'mouseover',
          handleHoverOnAsterisk
        )
      } else {
        inlineCommentTrigger.addEventListener('mouseout', handleHoverOnAsterisk)
      }
    }, 0)
  }, [handleHoverOnAsterisk, handleToggleCommentBoxActive, isHovered, tagId])

  const render = () => (
    <>
      <button
        id={`inline-comment-trigger-${tagId}`}
        className="tw-text-3xl | tw-absolute -tw-top-2 -tw-right-2 | tw-z-40"
      >
        <Asterisk className="tw-w-4 tw-h-4" />
      </button>
      {isCommentsActive && (
        <InlineCommentBox
          comment={comment}
          commentId={commentId}
          toggleComment={handleToggleCommentBoxActive}
          position={{
            x: commentBoxPosition.x,
            y: commentBoxPosition.y - 64
          }}
        />
      )}
    </>
  )
  return createPortal(render(), document.getElementById(tagId))
}

export default InlineCommentAsterisk
