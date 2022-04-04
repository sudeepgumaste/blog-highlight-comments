import axios from 'axios'
import { useMutation, UseMutationResult, useQueryClient } from 'react-query'

import { queryKeys } from '../../utils/queryKeys'

type Params = {
  comment: string
  tagId: string
  startPos: number
  endPos: number
  blogId: string
}

const addInlineComment = (params: Params): Promise<{ msg: string }> => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/blog/${params.blogId}/inline-comments`
  return axios.post(
    url,
    {
      comment: params.comment,
      tag_id: params.tagId,
      start_pos: params.startPos,
      end_pos: params.endPos
    },
    {
      headers: {
        ContentType: 'application/json'
      }
    }
  )
}

const useAddInlineComment = (): UseMutationResult<{ msg: string }, unknown> => {
  const queryClient = useQueryClient()
  return useMutation((params: Params) => addInlineComment(params), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.inlineCommentsByBlogId)
    }
  })
}

export default useAddInlineComment
