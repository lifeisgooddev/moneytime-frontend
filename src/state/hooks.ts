import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { kebabCase } from 'lodash'
import { useWeb3React } from '@web3-react/core'
import { Toast, toastTypes } from '@pancakeswap-libs/uikit'
import { useSelector, useDispatch } from 'react-redux'
import { Team } from 'config/constants/types'
import { getWeb3NoAccount } from 'utils/web3'
import useRefresh from 'hooks/useRefresh'
import {
  fetchFarmsPublicDataAsync,
  fetchTimepoolsPublicDataAsync,
  fetchMoneypoolsPublicDataAsync,
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  push as pushToast,
  remove as removeToast,
  clear as clearToast,
  setBlock,
} from './actions'
import { State, Farm, Timepool, Moneypool, Pool, Block, ProfileState, TeamsState, AchievementState, PriceState } from './types'
import { fetchProfile } from './profile'
import { fetchTeam, fetchTeams } from './teams'
import { fetchAchievements } from './achievements'

const ZERO = new BigNumber(0)

export const useFetchPublicData = () => {

  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    dispatch(fetchTimepoolsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
    dispatch(fetchMoneypoolsPublicDataAsync())
  }, [dispatch, slowRefresh])

  useEffect(() => {
    const web3 = getWeb3NoAccount()
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch])
}

// Farms

export const useFarms = (): Farm[] => {
  const farms = useSelector((state: State) => state.farms.data)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)
  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  }
}

// Time pool

export const useTimepools = (): Timepool[] => {
  const timepools = useSelector((state: State) => state.timepools.data)
  return timepools
}

export const useTimepoolFromPid = (pid): Timepool => {
  const timepool = useSelector((state: State) => state.timepools.data.find((f) => f.pid === pid))
  return timepool
}

export const useTimepoolFromSymbol = (lpSymbol: string): Timepool => {
  const timepool = useSelector((state: State) => state.timepools.data.find((f) => f.lpSymbol === lpSymbol))
  return timepool
}

export const useTimepoolUser = (pid) => {
  const timepool = useTimepoolFromPid(pid)
  return {
    allowance: timepool.userData ? new BigNumber(timepool.userData.allowance) : new BigNumber(0),
    tokenBalance: timepool.userData ? new BigNumber(timepool.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: timepool.userData ? new BigNumber(timepool.userData.stakedBalance) : new BigNumber(0),
    earnings: timepool.userData ? [new BigNumber(timepool.userData.earnings[0]), new BigNumber(timepool.userData.earnings[1])]  : [new BigNumber('0'),new BigNumber('0')],
  }
}

// Money pool

export const useMoneypools = (): Moneypool[] => {
  const moneypools = useSelector((state: State) => state.moneypools.data)
  return moneypools
}

export const useMoneypoolFromPid = (pid): Moneypool => {
  const moneypool = useSelector((state: State) => state.moneypools.data.find((f) => f.pid === pid))
  return moneypool
}

export const useMoneypoolFromSymbol = (lpSymbol: string): Moneypool => {
  const moneypool = useSelector((state: State) => state.moneypools.data.find((f) => f.lpSymbol === lpSymbol))
  return moneypool
}

export const useMoneypoolUser = (pid) => {
  const moneypool = useMoneypoolFromPid(pid)
  return {
    allowance: moneypool.userData ? new BigNumber(moneypool.userData.allowance) : new BigNumber(0),
    tokenBalance: moneypool.userData ? new BigNumber(moneypool.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: moneypool.userData ? new BigNumber(moneypool.userData.stakedBalance) : new BigNumber(0),
    earnings: moneypool.userData ? new BigNumber(moneypool.userData.earnings) : new BigNumber(0),
  }
}


// Pools

export const usePools = (account): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

export const usePoolFromPid = (pId): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.pId === pId))
  return pool
}

export const usePoolFromUuid = (id): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.uuid === id))
  return pool
}

// Toasts
export const useToast = () => {
  const dispatch = useDispatch()
  const helpers = useMemo(() => {
    const push = (toast: Toast) => dispatch(pushToast(toast))

    return {
      toastError: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.DANGER, title, description })
      },
      toastInfo: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.INFO, title, description })
      },
      toastSuccess: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.SUCCESS, title, description })
      },
      toastWarning: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.WARNING, title, description })
      },
      push,
      remove: (id: string) => dispatch(removeToast(id)),
      clear: () => dispatch(clearToast()),
    }
  }, [dispatch])

  return helpers
}

// Profile

export const useFetchProfile = () => {
  const { account } = useWeb3React()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProfile(account))
  }, [account, dispatch])
}

export const useProfile = () => {
  const { isInitialized, isLoading, data, hasRegistered }: ProfileState = useSelector((state: State) => state.profile)
  return { profile: data, hasProfile: isInitialized && hasRegistered, isInitialized, isLoading }
}

// Teams

export const useTeam = (id: number) => {
  const team: Team = useSelector((state: State) => state.teams.data[id])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTeam(id))
  }, [id, dispatch])

  return team
}

export const useTeams = () => {
  const { isInitialized, isLoading, data }: TeamsState = useSelector((state: State) => state.teams)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTeams())
  }, [dispatch])

  return { teams: data, isInitialized, isLoading }
}

// Achievements

export const useFetchAchievements = () => {
  const { account } = useWeb3React()
  const dispatch = useDispatch()

  useEffect(() => {
    if (account) {
      dispatch(fetchAchievements(account))
    }
  }, [account, dispatch])
}

export const useAchievements = () => {
  const achievements: AchievementState['data'] = useSelector((state: State) => state.achievements.data)
  return achievements
}

export const usePriceTimeBusd = (): BigNumber => {
  return new BigNumber(1);
}

export const usePriceMoneyBusd = (): BigNumber => {
  const pid = 19 // CAKE-BNB LP
  const bnbPriceUSD = usePriceBnbBusd()
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO;
}

export const usePriceBnbBusd = (): BigNumber => {
  const pid = 0 // BUSD-BNB LP
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(1).times(farm.tokenPriceVsQuote) : ZERO
}

export const usePricePool = (id: number): BigNumber => {
  const pool = usePoolFromUuid(id);
  const bnbPriceUSD = usePriceBnbBusd();
  const lpSymbol = pool.stakingToken.symbol.concat("-BNB LP");
  const farm = useFarmFromSymbol(lpSymbol);
  if(pool.stakingToken.symbol === "WBNB"){
    return bnbPriceUSD;
  }

  if(pool.stableCoin) {
    return new BigNumber(1);
  }
  
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
}

// export const usePriceListPool = (id: number): BigNumber => {
//   const pools = useSelector((state: State) => state.pools.data);
//   pools.forEach
//   const bnbPriceUSD = usePriceBnbBusd();
//   const lpSymbol = pool.stakingToken.symbol.concat("-BNB LP");
//   const farm = useFarmFromSymbol(lpSymbol);
//   if(pool.stakingToken.symbol === "WBNB"){
//     return bnbPriceUSD;
//   }

//   if(pool.stableCoin) {
//     return new BigNumber(1);
//   }
  
//   return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
// }

// Block
export const useBlock = (): Block => {
  return useSelector((state: State) => state.block)
}
