import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'

import '../../styles/globals.css'

const queryCache = new QueryCache()
const queryClient = new QueryClient({
  queryCache
})

const GlobalProvidersWrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvidersWrapper>
      <Component {...pageProps} />
    </GlobalProvidersWrapper>
  )
}

export default MyApp
