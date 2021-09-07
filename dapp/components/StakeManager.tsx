import { useEffect, useMemo, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from '@ethersproject/contracts'
import { formatEther, formatUnits, parseEther } from '@ethersproject/units'

import YieldTokenAbi from '../../build/contracts/YieldToken.json'
import Button from './Button'
import Tabs from './Tabs'

export default function StakeManager() {
  const { library, account, chainId } = useWeb3React()
  const [type, setType] = useState<'deposit' | 'withdraw'>('deposit')
  const [balance, setBalance] = useState<string | undefined>()
  const [selectedTab, setSelectedTab] = useState<string>('Deposit')
  const [value, setValue] = useState<string>('')

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

  const deposit = async () => {
    try {
      const weiValue = parseEther(value)
      await contract.deposit(weiValue)
    } catch (err) {
      // TODO: Display error
      console.warn(err)
    }
  }
  const withdraw = () => {
    //TODO: Handle withdraw
  }

  const onSelectTab = (tab) => {
    setSelectedTab(tab)
  }

  const onChangeValue = (event) => {
    setValue(event.target.value)
  }

  return (
    <div className="w-96">
      <div className="py-4 text-center rounded bg-gray-100">
        Active stake: {balance}
      </div>
      <div className="my-2">
        <Tabs
          selected={selectedTab}
          onSelectTab={onSelectTab}
          items={['Deposit', 'Withdraw']}
        />
      </div>
      <input
        className="my-6 text-lg appearance-none border-2 border-gray-200 rounded w-full py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-600"
        onChange={onChangeValue}
        placeholder="0.00"
      />
      {selectedTab === 'Deposit' ? (
        <Button onClick={deposit}>Deposit</Button>
      ) : (
        <Button onClick={withdraw}>Withdraw</Button>
      )}
    </div>
  )
}
