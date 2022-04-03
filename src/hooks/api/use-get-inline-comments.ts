import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import { queryKeys } from '../../utils/queryKeys'

type ReturnType = {
  comments: InlineComment[]
  tagIdMap: { [key: string]: InlineComment[] }
}

type Params = {
  id: string
}

const getInlineComments = async ({
  id
}: Params): Promise<{ comments: InlineCommentResponse[] }> => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/blog/${id}/inline-comments`

  const res = await axios.get(url, {
    headers: {
      ContentType: 'application/json'
    }
  })

  return res.data
}

const useGetInlineComments = (params: Params): UseQueryResult<ReturnType> => {
  return useQuery(
    queryKeys.inlineCommentsByBlogId,
    () => getInlineComments(params),
    {
      select: response => {
        let commentsByTagId = {}
        response.comments.forEach(comment => {
          if (!commentsByTagId[comment.tag_id]) {
            commentsByTagId[comment.tag_id] = []
          }
          commentsByTagId[comment.tag_id].push({
            commentId: comment.comment_id,
            tagId: comment.tag_id,
            startPos: comment.start_pos,
            endPos: comment.end_pos,
            comment: comment.comment
          })
        })
        const transformedComments: InlineComment[] = response.comments.map(
          comment => {
            return {
              commentId: comment.comment_id,
              tagId: comment.tag_id,
              startPos: comment.start_pos,
              endPos: comment.end_pos,
              comment: comment.comment
            }
          }
        )
        return {
          comments: transformedComments,
          tagIdMap: commentsByTagId
        }
      }
    }
  )
}

export default useGetInlineComments
