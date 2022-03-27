import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  tagId: string
  startPos: number
  endPos: number
}

const InlineCommentAsterisk = ({ tagId, startPos, endPos }: Props) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isCommentsActive, setIsCommentsActive] = useState(false)

  const [defaultHtml, setDefaultHtml] = useState<string>('')

  useEffect(() => {
    const _innerHtml = document.getElementById(tagId).innerHTML
    setDefaultHtml(_innerHtml)
  }, [tagId])

  const handleToggleCommentsActive = () => {
    setIsCommentsActive(isActive => !isActive)
  }

  const modifyInnerHtml = ({ startPos, endPos }) => {
    const beforeMark = defaultHtml.slice(0, startPos)
    const afterMark = defaultHtml.slice(endPos, defaultHtml.length)
    const textWithin = defaultHtml.slice(startPos, endPos)

    const modifiedHtml = `${beforeMark}<mark id='${tagId}-mark' >${textWithin}</mark>${afterMark}`

    return modifiedHtml
  }

  const handleHoverOnAsterisk = () => {
    let htmlToSet = ''
    if (!isHovered) {
      htmlToSet = modifyInnerHtml({
        startPos,
        endPos
      })
      setIsHovered(true)
    } else {
      htmlToSet = defaultHtml
      setIsHovered(false)
    }
    console.log(htmlToSet)
    const tag = document.getElementById(tagId)
    tag.innerHTML = htmlToSet
  }

  const render = () => (
    <span>
      <button
        className="tw-text-3xl | tw-absolute -tw-top-4 -tw-right-5"
        onClick={handleHoverOnAsterisk}
        onMouseOver={handleHoverOnAsterisk}
        onMouseOut={handleHoverOnAsterisk}
      >
        *
      </button>
    </span>
  )
  return createPortal(render(), document.getElementById(tagId))
}

export default InlineCommentAsterisk
