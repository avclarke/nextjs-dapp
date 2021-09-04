import { useWeb3React } from '@web3-react/core'
import { UserRejectedRequestError } from '@web3-react/injected-connector'
import React, { useState } from 'react'

import { injected } from '../injected'
import Button from './Button'

type Props = {
  attempted: boolean
}

export default function ConnectWallet({ attempted }: Props) {
  const { activate } = useWeb3React()

  const [connecting, setConnecting] = useState(false)

  const connect = () => {
    setConnecting(true)
    activate(injected, undefined, true).catch((error) => {
      // ignore the error if it's a user rejected request
      setConnecting(false)
      const userError = error instanceof UserRejectedRequestError
      if (!userError) {
        // TODO: Feedback error
        console.log(error)
      }
    })
  }

  if (!attempted) {
    return null
  }

  if (connecting) {
    return <div>connecting...</div>
  }

  return <Button onClick={connect}>Connect Wallet</Button>
}
