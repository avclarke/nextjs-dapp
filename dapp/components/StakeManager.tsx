import { useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from '@ethersproject/contracts'

import YieldTokenAbi from '../../build/contracts/YieldToken.json'
import Button from './Button'

export default function StakeManager() {
  const { library, account, chainId } = useWeb3React()

  const address = YieldTokenAbi.networks[chainId].address

  const contract = useMemo(() => {
    new Contract(address, YieldTokenAbi.abi, library.getSigner(account))
  }, [account, address])

  const deposit = () => {
    //TODO: Handle deposit
  }
  const withdraw = () => {
    //TODO: Handle withdraw
  }

  return (
    <div>
      <Button onClick={deposit}>Deposit</Button>
      <br />
      <br />
      <Button onClick={withdraw}>Withdraw</Button>
    </div>
  )
}
