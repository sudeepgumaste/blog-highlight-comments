import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import { queryKeys } from '../../utils/queryKeys'

type ReturnType = {
  blog: string
}

type Params = {
  id: string
}

const getBlogById = async ({ id }: Params): Promise<ReturnType> => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/blog/${id}`

  const res = await axios.get(url, {
    headers: {
      ContentType: 'application/json'
    }
  })

  return res.data
}

const useGetBlogById = (params: Params): UseQueryResult<ReturnType> => {
  return useQuery(queryKeys.blogById, () => getBlogById(params))
}

export default useGetBlogById
