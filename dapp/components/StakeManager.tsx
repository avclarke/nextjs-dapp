import { useEffect, useMemo, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from '@ethersproject/contracts'
import { formatEther, formatUnits, parseEther } from '@ethersproject/units'

import YieldTokenAbi from '../../build/contracts/YieldToken.json'
import TestTokenAbi from '../../build/contracts/TestToken.json'
import Button from './Button'
import Tabs from './Tabs'

export default function StakeManager() {
  const { library, account, chainId } = useWeb3React()
  const [state, setState] = useState({
    balance: '0',
    stake: '0',
    allowance: '0',
  })
  const [selectedTab, setSelectedTab] = useState<string>('Deposit')
  const [value, setValue] = useState<string>('')

  const yieldAddress = YieldTokenAbi.networks[chainId].address
  const tokenAddress = TestTokenAbi.networks[chainId].address

  const [yieldContract, tokenContract] = useMemo(() => {
    return [
      new Contract(yieldAddress, YieldTokenAbi.abi, library.getSigner(account)),
      new Contract(tokenAddress, TestTokenAbi.abi, library.getSigner(account)),
    ]
  }, [account, yieldAddress, tokenAddress])

  const fetchBalance = async () => {
    const stakeBal = await yieldContract.balanceOf(account)
    const tokenBal = await tokenContract.balanceOf(account)
    const allowance = await tokenContract.allowance(account, yieldAddress)

    setState({
      balance: formatEther(tokenBal),
      stake: formatEther(stakeBal),
      allowance: formatEther(allowance),
    })
  }

  useEffect(() => {
    fetchBalance()
  }, [])

  const deposit = async () => {
    try {
      // TODO: Display activity
      const weiValue = parseEther(value)
      await yieldContract.deposit(weiValue)
    } catch (err) {
      // TODO: Display error
      console.warn(err)
    }
  }

  const approve = async () => {
    try {
      const weiValue = parseEther(value)
      await tokenContract.approve(yieldAddress, weiValue)
      fetchBalance()
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
        Token balance: {state.balance}
        <br />
        Active stake: {state.stake}
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
        Number(state.allowance) >= Number(value) ? (
          <Button onClick={deposit}>Deposit</Button>
        ) : (
          <Button onClick={approve}>Approve</Button>
        )
      ) : (
        <Button onClick={withdraw}>Withdraw</Button>
      )}
    </div>
  )
}
