import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getAddress,  getMasterChefMoneyAddress, getMasterChefTimeAddress } from 'utils/addressHelpers'
import masterChefMoneyABI from 'config/abi/MasterChefMoney.json'
import masterChefTimeABI from 'config/abi/MasterChefTime.json'

import erc20ABI from 'config/abi/erc20.json'
import tokens from 'config/constants/tokens'
import useRefresh from './useRefresh'

const useTokenPerBlock = () => {
  const [balances, setBalance] = useState([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchAllBalances = async () => {

      let calls = [
        {
          address: getMasterChefMoneyAddress(),
          name: 'moneyPerBlock()'
        }
      ]
      const [moneyPerBlock] = await multicall(masterChefMoneyABI, calls)
      
      calls = [
        {
          address: getMasterChefTimeAddress(),
          name: 'timePerBlock()'
        }
      ]
      const [timePerBlock] = await multicall(masterChefTimeABI, calls)
      const result = [moneyPerBlock, timePerBlock];
      setBalance([...result])
    }

    if (account) {
      fetchAllBalances()
    }
  }, [account, fastRefresh])

  return balances
}

export default useTokenPerBlock
