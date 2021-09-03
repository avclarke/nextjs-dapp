import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

import { Web3ReactProvider } from '@web3-react/core'
import type {
  ExternalProvider,
  JsonRpcFetchFunc,
} from '@ethersproject/providers'
import { Web3Provider } from '@ethersproject/providers'

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider
      getLibrary={(provider: ExternalProvider | JsonRpcFetchFunc) =>
        new Web3Provider(provider)
      }>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default MyApp
