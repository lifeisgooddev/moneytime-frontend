import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import {
  fetchFarmUserDataAsync,
  updateUserStakedBalance,
  updateUserBalance,
  updateUserPendingReward,
  fetchTimepoolUserDataAsync,
  fetchMoneypoolUserDataAsync
} from 'state/actions'
import { unstake, sousUnstake, sousEmegencyUnstake, unstakeSphn } from 'utils/callHelpers'
import { getMasterChefMoneyAddress } from 'utils/addressHelpers'
import { useMasterchefTime, useMasterchefMoney, useSousChef } from './useContract'

export const useUnstakeTime = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefTimeContract = useMasterchefTime()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefTimeContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefTimeContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export const useUnstakeMoney = (pid: number, token: string) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefMoneyContract = useMasterchefMoney()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefMoneyContract, pid, amount, account)
      if(token === "TIME")
        dispatch(fetchTimepoolUserDataAsync(account))
      else
        dispatch(fetchMoneypoolUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefMoneyContract, pid, token],
  )

  return { onUnstake: handleUnstake }
}

export const useUnstakeSphn = (masterchefAddress: string, token: string) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useSousChef(masterchefAddress)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstakeSphn(masterChefContract, amount, account)
        dispatch(fetchMoneypoolUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract],
  )

  return { onUnstake: handleUnstake }
}
export const useUnstake = (pId: number, masterchefAddress: string, uuid) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefTimeContract = useMasterchefTime()
  const masterChefMoneyContract = useMasterchefMoney()
  const masterChefContract = masterchefAddress === getMasterChefMoneyAddress() ? masterChefMoneyContract : masterChefTimeContract

  const handleUnstake = useCallback(
    async (amount: string) => {
      await unstake(masterChefContract, pId, amount, account)
      dispatch(updateUserStakedBalance(uuid, account))
      dispatch(updateUserBalance(uuid, account))
      dispatch(updateUserPendingReward(uuid, account))
    },
    [account, dispatch, masterChefContract, pId, uuid],
  )

  return { onUnstake: handleUnstake }
}

const SYRUPIDS = [5, 6, 3, 1, 22, 23, 78]

export const useSousUnstake = (pId) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefTimeContract = useMasterchefTime()
  const sousChefContract = useSousChef(pId)
  const isOldSyrup = SYRUPIDS.includes(pId)

  const handleUnstake = useCallback(
    async (amount: string, decimals: number) => {
      if (pId === 0) {
        const txHash = await unstake(masterChefTimeContract, 0, amount, account)
        console.info(txHash)
      } else if (isOldSyrup) {
        const txHash = await sousEmegencyUnstake(sousChefContract, amount, account)
        console.info(txHash)
      } else {
        const txHash = await sousUnstake(sousChefContract, amount, decimals, account)
        console.info(txHash)
      }
      dispatch(updateUserStakedBalance(pId, account))
      dispatch(updateUserBalance(pId, account))
      dispatch(updateUserPendingReward(pId, account))
    },
    [account, dispatch, isOldSyrup, masterChefTimeContract, sousChefContract, pId],
  )

  return { onUnstake: handleUnstake }
}

