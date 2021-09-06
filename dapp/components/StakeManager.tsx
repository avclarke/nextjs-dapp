import { useEffect, useMemo, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from '@ethersproject/contracts'
import { formatEther } from '@ethersproject/units'

import YieldTokenAbi from '../../build/contracts/YieldToken.json'
import Button from './Button'

export default function StakeManager() {
  const { library, account, chainId } = useWeb3React()
  const [type, setType] = useState<'deposit' | 'withdraw'>('deposit')
  const [balance, setBalance] = useState<string | undefined>()

  const address = YieldTokenAbi.networks[chainId].address

  const contract = useMemo(() => {
    return new Contract(address, YieldTokenAbi.abi, library.getSigner(account))
  }, [account, address])

  const fetchBalance = async () => {
    const bal = await contract.balanceOf(account)
    setBalance(formatEther(bal))
  }

  useEffect(() => {
    fetchBalance()
  }, [])

  const deposit = () => {
    //TODO: Handle deposit
  }
  const withdraw = () => {
    //TODO: Handle withdraw
  }

  return (
    <div>
      <div className="py-4">Active stake: {balance}</div>
      <Button onClick={deposit}>Deposit</Button>
      <br />
      <br />
      <Button onClick={withdraw}>Withdraw</Button>
    </div>
  )
}
