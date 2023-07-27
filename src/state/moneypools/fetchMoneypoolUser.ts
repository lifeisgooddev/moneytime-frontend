import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefMoneyABI from 'config/abi/MasterChefMoney.json'
import sousChefABI from 'config/abi/sousChef.json'
import multicall from 'utils/multicall'
import moneypoolsConfig from 'config/constants/moneypools'
import { getAddress, getMasterChefMoneyAddress } from 'utils/addressHelpers'

export const fetchMoneypoolUserAllowances = async (account: string) => {
  
  const lpContractAddress = getAddress(moneypoolsConfig[0].token.address)
  const parsedLpAllowances = await Promise.all(moneypoolsConfig.map(async (moneypool) => {
    if (moneypool.lpSymbol === "MONEY") {
      const callsMoneyPool = [ {
        address: lpContractAddress, 
        name: 'allowance', 
        params: [account, getMasterChefMoneyAddress()]
      }]
    
      const rawMoneyAllowances = await multicall(erc20ABI, callsMoneyPool)
      return new BigNumber(rawMoneyAllowances[0]).toJSON();
    }
    const callsSphnPool = [ {
      address: lpContractAddress, 
      name: 'allowance', 
      params: [account,  getAddress(moneypool.masterChef)]
    }]
  
    const rawSphnAllowances = await multicall(erc20ABI, callsSphnPool)
    return new BigNumber(rawSphnAllowances[0]).toJSON();
  }))
  console.log(parsedLpAllowances)
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

  const parsedStakedBalances = await Promise.all(moneypoolsConfig.map(async (moneypool) => {
    if (moneypool.lpSymbol === "MONEY") {
      const callsMoneyPool = [ {
        address: getMasterChefMoneyAddress(),
        name: 'userInfo',
        params: [moneypool.pid, account],
      }]
  
      const moneyStakedBalance = await multicall(masterchefMoneyABI, callsMoneyPool)
      return [new BigNumber(moneyStakedBalance[0][0]._hex).toJSON(), moneyStakedBalance[0][3].toString()]
    }
    
    const callsSphnPool = [ {
      address: getAddress(moneypool.masterChef),
      name: 'userInfo',
      params: [account],
    }]

    const sphnStakedBalance = await multicall(sousChefABI, callsSphnPool)
    return [new BigNumber(sphnStakedBalance[0][0]._hex).toJSON(), "0"]
  }))
  
  return parsedStakedBalances
}

export const fetchMoneypoolUserEarnings = async (account: string) => {
  const parsedEarnings = await Promise.all(moneypoolsConfig.map(async (moneypool) => {
    if (moneypool.lpSymbol === "MONEY") {
      const callsMoneyPool = [ {
        address: getMasterChefMoneyAddress(),
        name: 'pendingReward',
        params: [moneypool.pid, account],
      }]

      const moneyEarnings = await multicall(masterchefMoneyABI, callsMoneyPool)
      return moneyEarnings[0][0].toString();
    }

    const callsSphnPool = [ {
      address: getAddress(moneypool.masterChef),
      name: 'pendingReward',
      params: [account],
    }]

    const sphnEarnings = await multicall(sousChefABI, callsSphnPool)
    return sphnEarnings[0][0].toString();
  }));
  return parsedEarnings
}
