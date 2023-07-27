import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import masterChefTimeABI from 'config/abi/MasterChefTime.json'
import masterChefMoneyABI from 'config/abi/MasterChefMoney.json'
import cakeABI from 'config/abi/cake.json'
import wbnbABI from 'config/abi/weth.json'
import multicall from 'utils/multicall'
import { getAddress, getWbnbAddress, getMasterChefMoneyAddress, getMasterChefTimeAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'

export const fetchPoolsBlockLimits = async () => {
  const callsStartBlock = poolsConfig.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'startBlock',
    }
  })
  // console.log('callsStartBlock', callsStartBlock);
  const starts = await multicall(sousChefABI, callsStartBlock)
  return poolsConfig.map((cakePoolConfig, index) => {
    const startBlock = starts[index]
    return {
      uuid: cakePoolConfig.uuid,
      startBlock: new BigNumber(startBlock).toJSON()
    }
  })
}

export const fetchPoolsMultiplier = async () => {
  const moneyPools = poolsConfig.filter((p) => getAddress(p.contractAddress) === getMasterChefMoneyAddress())
  const timePools = poolsConfig.filter((p) => getAddress(p.contractAddress) === getMasterChefTimeAddress())

  const moneyCalls = moneyPools.map((p) => ({
    address: getMasterChefMoneyAddress(),
    name: 'poolInfo',
    params: [p.pId],
  }))
  const moneyInfo = await multicall(masterChefMoneyABI, moneyCalls)
  const moneyTotalAllocPoint = await multicall(masterChefMoneyABI, [
    {
      address: getMasterChefMoneyAddress(),
      name: 'totalAllocPoint',
    },
  ]);
  const timeCalls = timePools.map((p) => ({
    address: getMasterChefTimeAddress(),
    name: 'poolInfo',
    params: [p.pId],
  }))
  const timeInfo = await multicall(masterChefTimeABI, timeCalls)

  const timeTotalAllocPoint = await multicall(masterChefTimeABI, [
    {
      address: getMasterChefTimeAddress(),
      name: 'totalAllocPoint',
    },
  ]);
  
  return [
    ...moneyInfo.map((p, index) => ({
      tokenAddress: p.lpToken,
      contractAddress: getMasterChefMoneyAddress(),
      multiplier: new BigNumber(moneyInfo[index].allocPoint._hex).toJSON(),
      poolWeight: new BigNumber(moneyInfo[index].allocPoint._hex).div(moneyTotalAllocPoint).toJSON()
    })),
    ...timeInfo.map((p, index) => ({
      tokenAddress: p.lpToken,
      contractAddress: getMasterChefTimeAddress(),
      multiplier: new BigNumber(timeInfo[index].allocPoint._hex).toJSON(),
      poolWeight: new BigNumber(timeInfo[index].allocPoint._hex).div(timeTotalAllocPoint).toJSON()
    })),
  ]
}


export const fetchPoolsTotalStatking = async () => {
  const nonBnbPools = poolsConfig;
  // const bnbPool = poolsConfig.filter((p) => p.stakingToken.symbol === 'BNB')

  const callsNonBnbPools = nonBnbPools.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.stakingToken.address),
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  // const callsBnbPools = bnbPool.map((poolConfig) => {
  //   return {
  //     address: getWbnbAddress(),
  //     name: 'balanceOf',
  //     params: [getAddress(poolConfig.contractAddress)],
  //   }
  // })
  // console.log('callsNonBnbPools', callsNonBnbPools);
  const nonBnbPoolsTotalStaked = await multicall(cakeABI, callsNonBnbPools)
  // const bnbPoolsTotalStaked = await multicall(wbnbABI, callsBnbPools)
  
  return [
    ...nonBnbPools.map((p, index) => ({
      uuid: p.uuid,
      totalStaked: new BigNumber(nonBnbPoolsTotalStaked[index]).toJSON(),
    })),
    // ...bnbPool.map((p, index) => ({
    //   pId: p.pId,
    //   totalStaked: new BigNumber(bnbPoolsTotalStaked[index]).toJSON(),
    // })),
  ]
}


