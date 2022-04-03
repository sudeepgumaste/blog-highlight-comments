import { useEffect, useState } from 'react'

interface Params {
  value: any
  debounceTimer?: number
}

const useDebounce = ({ value, debounceTimer = 500 }: Params) => {
  const [state, setState] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setState(value)
    }, debounceTimer)
    return () => {
      clearTimeout(handler)
    }
  }, [value, debounceTimer])

  return state
}

export default useDebounce
