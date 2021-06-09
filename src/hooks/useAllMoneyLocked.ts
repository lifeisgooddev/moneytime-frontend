import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getMasterChefMoneyAddress } from 'utils/addressHelpers'
import masterChefABI from 'config/abi/MasterChefMoney.json'
import timepoolsConfig from 'config/constants/timepools'
import moneypoolsConfig from 'config/constants/moneypools'
import useRefresh from './useRefresh'

const useAllMoneyLocked = () => {
  const [balances, setBalance] = useState([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchAllBalances = async () => {

      const callsTimePool = timepoolsConfig.map((pool) => ({
        address: getMasterChefMoneyAddress(),
        name: 'pendingReward',
        params: [pool.pid, account],
      }))
      
      const resTimePool = await multicall(masterChefABI, callsTimePool)

      const callsMoneyPool = moneypoolsConfig.map((pool) => ({
        address: getMasterChefMoneyAddress(),
        name: 'pendingReward',
        params: [pool.pid, account],
      }))
      
      const resMoneyPool = await multicall(masterChefABI, callsMoneyPool)
      const res = [...resTimePool.map(pool => [pool[0]]), ...resMoneyPool.map(pool => [pool[0]])];
      setBalance(res)
    }

    if (account) {
      fetchAllBalances()
    }
  }, [account, fastRefresh])

  return balances
}

export default useAllMoneyLocked
