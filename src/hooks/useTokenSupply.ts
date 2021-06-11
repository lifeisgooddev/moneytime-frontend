import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getAddress,  getMasterChefMoneyAddress } from 'utils/addressHelpers'
import masterChefABI from 'config/abi/MasterChefMoney.json'

import erc20ABI from 'config/abi/erc20.json'
import tokens from 'config/constants/tokens'
import useRefresh from './useRefresh'

const useTokenSupply = () => {
  const [balances, setBalance] = useState([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchAllBalances = async () => {

      const calls = [
        // Balance of token in the LP contract
        {
          address: getAddress(tokens.money.address),
          name: 'totalSupply'
        },
        // Balance of quote token on LP contract
        // {
        //   address: getAddress(moneypoolConfig.quoteToken.address),
        //   name: 'balanceOf',
        //   params: [lpAddress],
        // },
        // Balance of LP tokens in the master chef contract
        {
          address: getAddress(tokens.money.address),
          name: 'balanceOf',
          params: ['0x000000000000000000000000000000000000dEaD'],
        },
        // Total supply of LP tokens
        {
          address: getAddress(tokens.time.address),
          name: 'totalSupply'
        },
        {
          address: getAddress(tokens.time.address),
          name: 'balanceOf',
          params: ['0x000000000000000000000000000000000000dEaD'],
        }
      ]
      const result = await multicall(erc20ABI, calls)
      
      setBalance([...result])
    }

    if (account) {
      fetchAllBalances()
    }
  }, [account, fastRefresh])

  return balances
}

export default useTokenSupply
