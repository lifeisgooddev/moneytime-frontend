import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getMasterChefTimeAddress } from 'utils/addressHelpers'
import masterChefABI from 'config/abi/MasterChefTime.json'
import { farmsConfig, poolsConfig } from 'config/constants'
import useRefresh from './useRefresh'

const useTimeAllEarnings = () => {
  const [balances, setBalance] = useState([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchAllBalances = async () => {
      const callsFarm = farmsConfig.map((farm) => ({
        address: getMasterChefTimeAddress(),
        name: 'pendingTime',
        params: [farm.pid, account],
      }))

      const resFarm = await multicall(masterChefABI, callsFarm)
      
      const callsPool = poolsConfig.filter((item) => item.earningToken.symbol === "TIME").map((pool) => ({
        address: getMasterChefTimeAddress(),
        name: 'pendingTime',
        params: [pool.pId, account],
      }))

      const resPool = await multicall(masterChefABI, callsPool)

      const res = [...resFarm, ...resPool];
      setBalance(res)
    }

    if (account) {
      fetchAllBalances()
    }
  }, [account, fastRefresh])

  return balances
}

export default useTimeAllEarnings
