import { AbiItem } from 'web3-utils'
import poolsConfig from 'config/constants/pools'
import masterChefTimeABI from 'config/abi/MasterChefTime.json'
import masterChefMoneyABI from 'config/abi/MasterChefMoney.json'
import sousChefABI from 'config/abi/sousChef.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefMoneyAddress, getMasterChefTimeAddress } from 'utils/addressHelpers'
import { getWeb3NoAccount } from 'utils/web3'
import BigNumber from 'bignumber.js'

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// BNB pools use the native BNB token (wrapping ? unwrapping is done at the contract level)
const nonBnbPools = poolsConfig;
// const bnbPools = poolsConfig.filter((p) => p.stakingToken.symbol === 'BNB')
const nonMasterPools = poolsConfig.filter((p) => p.pId !== 0)
const moneyPools = poolsConfig.filter((p) => getAddress(p.contractAddress) === getMasterChefMoneyAddress())
const timePools = poolsConfig.filter((p) => getAddress(p.contractAddress) === getMasterChefTimeAddress())
const web3 = getWeb3NoAccount()
const masterChefTimeContract = new web3.eth.Contract((masterChefTimeABI as unknown) as AbiItem, getMasterChefTimeAddress())
const masterChefMoneyContract = new web3.eth.Contract((masterChefMoneyABI as unknown) as AbiItem, getMasterChefMoneyAddress())

export const fetchPoolsAllowance = async (account) => {

  const calls = nonBnbPools.map((pool) => {
    return { address: getAddress(pool.stakingToken.address), name: 'allowance', params: [account, getAddress(pool.contractAddress)] }
  })
  const rawPoolAllowances = await multicall(erc20ABI, calls)
  return nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.uuid]: new BigNumber(rawPoolAllowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  // Non BNB pools
  const calls = nonBnbPools.map((p) => ({
    address: getAddress(p.stakingToken.address),
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalances = nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.uuid]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // BNB pools
  // const bnbBalance = await web3.eth.getBalance(account)
  // const bnbBalances = bnbPools.reduce(
  //   (acc, pool) => ({ ...acc, [pool.uuid]: new BigNumber(bnbBalance).toJSON() }),
  //   {},
  // )

  return { ...tokenBalances }
}

export const fetchUserStakeBalances = async (account) => {
  const moneyCalls = moneyPools.map((p) => ({
    address: getMasterChefMoneyAddress(),
    name: 'userInfo',
    params: [p.pId, account],
  }))
  const userMoneyInfo = await multicall(masterChefMoneyABI, moneyCalls)
  const moneyStakedBalances = moneyPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.uuid]: new BigNumber(userMoneyInfo[index].amount._hex).toJSON(),
    }),
    {},
  )
  
  const timeCalls = timePools.map((p) => ({
    address: getMasterChefTimeAddress(),
    name: 'userInfo',
    params: [p.pId, account],
  }))
  const timeUserInfo = await multicall(masterChefTimeABI, timeCalls)
  const timeStakedBalances = timePools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.uuid]: new BigNumber(timeUserInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  return { ...moneyStakedBalances, ...timeStakedBalances }
}

export const fetchUserPendingRewards = async (account) => {
  const moneyCalls = moneyPools.map((p) => ({
    address: getMasterChefMoneyAddress(),
    name: 'pendingReward',
    params: [p.pId, account],
  }))
  const userMoneyInfo = await multicall(masterChefMoneyABI, moneyCalls)
  const moneyPendingRewards = moneyPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.uuid]: userMoneyInfo[index][0].toString(),
    }),
    {},
  )
  
  const timeCalls = timePools.map((p) => ({
    address: getMasterChefTimeAddress(),
    name: 'pendingTime',
    params: [p.pId, account],
  }))
  const timeUserInfo = await multicall(masterChefTimeABI, timeCalls)
  const timePendingRewards = timePools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.uuid]: new BigNumber(timeUserInfo[index]).toJSON(),
    }),
    {},
  )

  return { ...moneyPendingRewards, ...timePendingRewards }
}
