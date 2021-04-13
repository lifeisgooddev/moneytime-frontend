import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefMoneyABI from 'config/abi/MasterChefMoney.json'
import multicall from 'utils/multicall'
import moneypoolsConfig from 'config/constants/moneypools'
import { getAddress, getMasterChefMoneyAddress } from 'utils/addressHelpers'

export const fetchMoneypoolUserAllowances = async (account: string) => {
  const masterChefMoneyAdress = getMasterChefMoneyAddress()

  const calls = moneypoolsConfig.map((moneypool) => {
    const lpContractAddress = getAddress(moneypool.token.address)
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefMoneyAdress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchMoneypoolUserTokenBalances = async (account: string) => {
  const calls = moneypoolsConfig.map((moneypool) => {
    const lpContractAddress = getAddress(moneypool.lpAddresses)
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

export const fetchMoneypoolUserStakedBalances = async (account: string) => {
  const masterChefMoneyAdress = getMasterChefMoneyAddress()

  const calls = moneypoolsConfig.map((moneypool) => {
    return {
      address: masterChefMoneyAdress,
      name: 'userInfo',
      params: [moneypool.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefMoneyABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchMoneypoolUserEarnings = async (account: string) => {
  const masterChefMoneyAdress = getMasterChefMoneyAddress()

  const calls = moneypoolsConfig.map((moneypool) => {
    return {
      address: masterChefMoneyAdress,
      name: 'pendingMoney',
      params: [moneypool.pid, account],
    }
  })

  const rawEarnings = await multicall(masterchefMoneyABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
