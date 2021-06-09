import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getMasterChefMoneyAddress } from 'utils/addressHelpers'
import masterChefABI from 'config/abi/MasterChefMoney.json'
import { poolsConfig } from 'config/constants'
import useRefresh from './useRefresh'

const useAllMoneyEarnings = () => {
  const [balances, setBalance] = useState([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchAllBalances = async () => {

      const callsPool = poolsConfig.filter((item) => item.earningToken.symbol === "MONEY").map((pool) => ({
        address: getMasterChefMoneyAddress(),
        name: 'pendingReward',
        params: [pool.pId, account],
      }))
      
      const resPool = await multicall(masterChefABI, callsPool)
      const res = resPool.map(pool => [pool[0]]);
      setBalance(res)
    }

    if (account) {
      fetchAllBalances()
    }
  }, [account, fastRefresh])

  return balances
}

export default useAllMoneyEarnings
