import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import Asterisk from '../../../../public/assets/asterisk.svg'
import InlineCommentBox from '../InlineCommentBox/InlineCommentBox'

interface Props {
  tagId: string
  comments: InlineComment[]
}

const InlineCommentAsterisk = ({ tagId, comments }: Props) => {
  const [isCommentsActive, setIsCommentsActive] = useState(false)

  const [lowestIndex, setLowestIndex] = useState<number | null>(null)
  const [highestIndex, setHighestIndex] = useState<number | null>(null)

  const [commentBoxPosition, setCommentBoxPosition] = useState({
    x: 0,
    y: 0
  })

  const [defaultHtml, setDefaultHtml] = useState<string>('')
  const [innerHtml, setInnerHtml] = useState<string>('')

  useEffect(() => {
    // get lowest start pos and highest end pos
    const lowestStartPos = comments.reduce(
      (lowest, comment) =>
        comment.startPos < lowest ? comment.startPos : lowest,
      Infinity
    )
    const highestEndPos = comments.reduce(
      (highest, comment) =>
        comment.endPos > highest ? comment.endPos : highest,
      -Infinity
    )

    setLowestIndex(lowestStartPos)
    setHighestIndex(highestEndPos)
  }, [comments])

  useEffect(() => {
    const _innerHtml = document.getElementById(tagId).innerHTML
    setDefaultHtml(_innerHtml)
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
      const beforeMark = defaultHtml.slice(0, startPos)
      const afterMark = defaultHtml.slice(endPos, defaultHtml.length)
      const textWithin = defaultHtml.slice(startPos, endPos)

      const modifiedHtml = `${beforeMark}<mark id='${tagId}-mark' >${textWithin}</mark>${afterMark}`
      return modifiedHtml
    },
    [tagId, defaultHtml]
  )

  useLayoutEffect(() => {
    if (!defaultHtml || !lowestIndex || !highestIndex) return

    const modifiedHtml = modifyInnerHtml({
      startPos: lowestIndex,
      endPos: highestIndex
    })
    setInnerHtml(modifiedHtml)
  }, [modifyInnerHtml, tagId, defaultHtml, lowestIndex, highestIndex])

  useLayoutEffect(() => {
    if (!innerHtml) return
    const tag = document.getElementById(tagId)
    tag.innerHTML = innerHtml
  }, [innerHtml, tagId])

  useLayoutEffect(() => {
    queueMicrotask(() => {
      const trigger = document.getElementById(`inline-comment-trigger-${tagId}`)
      trigger?.addEventListener('click', () => {
        handleToggleCommentBoxActive()
      })
    })
  }, [tagId, innerHtml, handleToggleCommentBoxActive])

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
          comments={comments}
          toggleComment={handleToggleCommentBoxActive}
          position={{
            x: commentBoxPosition.x,
            y: commentBoxPosition.y - 64
          }}
        />
      )}
    </>
  )

  if (typeof window === 'object') {
    // Check if document is finally loaded
    return createPortal(render(), document.getElementById(tagId))
  }
  return null
}

export default InlineCommentAsterisk
