import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefMoneyABI from 'config/abi/MasterChefMoney.json'
import multicall from 'utils/multicall'
import timepoolsConfig from 'config/constants/timepools'
import { getAddress, getMasterChefMoneyAddress } from 'utils/addressHelpers'

export const fetchTimepoolUserAllowances = async (account: string) => {
  const masterChefMoneyAdress = getMasterChefMoneyAddress()

  const calls = timepoolsConfig.map((timepool) => {
    const lpContractAddress = getAddress(timepool.token.address)
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefMoneyAdress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchTimepoolUserTokenBalances = async (account: string) => {
  const calls = timepoolsConfig.map((timepool) => {
    const lpContractAddress = getAddress(timepool.lpAddresses)
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchTimepoolUserStakedBalances = async (account: string) => {
  const masterChefMoneyAdress = getMasterChefMoneyAddress()

  const calls = timepoolsConfig.map((timepool) => {
    return {
      address: masterChefMoneyAdress,
      name: 'userInfo',
      params: [timepool.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefMoneyABI, calls)
  const parsedStakeAndDepositTime = rawStakedBalances.map((stakedBalance) => {
    return [new BigNumber(stakedBalance[0]._hex).toJSON(), stakedBalance[3].toString()]
  })
  
  return parsedStakeAndDepositTime
}

export const fetchTimepoolUserEarnings = async (account: string) => {
  const masterChefMoneyAdress = getMasterChefMoneyAddress()

  const calls = timepoolsConfig.map((timepool) => {
    return {
      address: masterChefMoneyAdress,
      name: 'pendingReward',
      params: [timepool.pid, account],
    }
  })

  const rawEarnings = await multicall(masterchefMoneyABI, calls)
  
  const parsedEarnings = rawEarnings.map((earnings) => {
    // return new BigNumber(earnings).toJSON()
    return [earnings[0].toString(), earnings[1].toString()];
  })
  return parsedEarnings
}
