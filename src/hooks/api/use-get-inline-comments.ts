import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import { queryKeys } from '../../utils/queryKeys'

type ReturnType = {
  comments: InlineComment[]
}

type Params = {
  id: string
}

const getInlineComments = async ({ id }: Params): Promise<ReturnType> => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/blog/${id}/inline-comments`

  const res = await axios.get(url, {
    headers: {
      ContentType: 'application/json'
    }
  })

  return res.data
}

const useGetInlineComments = (params: Params): UseQueryResult<ReturnType> => {
  return useQuery(queryKeys.inlineCommentsByBlogId, () =>
    getInlineComments(params)
  )
}

export default useGetInlineComments
