import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getMasterChefTimeAddress } from 'utils/addressHelpers'
import masterChefABI from 'config/abi/MasterChefTime.json'
import { farmsConfig, poolsConfig } from 'config/constants'
import { FarmConfig } from 'config/constants/types'
import useRefresh from './useRefresh'

export interface FarmWithBalance{
  pid: number;
  balance: BigNumber
}

const useFarmsWithBalance = () => {
  const [farmsWithBalances, setFarmsWithBalances] = useState<FarmWithBalance[]>([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalances = async () => {
      const calls = farmsConfig.map((farm) => ({
        address: getMasterChefTimeAddress(),
        name: 'pendingTime',
        params: [farm.pid, account],
      }))

      const rawFarmResults = await multicall(masterChefABI, calls)
      const resultFarms = farmsConfig.map((farm, index) => ({ pid: farm.pid, balance: new BigNumber(rawFarmResults[index]) }))

      const callsPool = poolsConfig.filter((item) => item.earningToken.symbol === "TIME").map((pool) => ({
        address: getMasterChefTimeAddress(),
        name: 'pendingTime',
        params: [pool.pId, account],
      }))

      const rawPoolResults = await multicall(masterChefABI, callsPool)
      const resultPools = poolsConfig.filter((item) => item.earningToken.symbol === "TIME").map((farm, index) => ({ pid: farm.pId, balance: new BigNumber(rawPoolResults[index]) }))
      const result = [...resultFarms, ...resultPools];
      setFarmsWithBalances(result);
    }

    if (account) {
      fetchBalances()
    }
  }, [account, fastRefresh])

  return farmsWithBalances
}

export default useFarmsWithBalance
