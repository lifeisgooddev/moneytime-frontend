import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserStakedBalance, updateUserBalance, fetchTimepoolUserDataAsync, fetchMoneypoolUserDataAsync } from 'state/actions'
import { stake, sousStake, sousStakeBnb, stakeSphn } from 'utils/callHelpers'
import { getMasterChefMoneyAddress } from 'utils/addressHelpers'
import { useMasterchefTime, useMasterchefMoney, useSousChef, } from './useContract'

export const useStakeTime = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefTimeContract = useMasterchefTime()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefTimeContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefTimeContract, pid],
  )

  return { onStake: handleStake }
}

export const useStakeMoney = (pid: number, token: string) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefMoneyContract = useMasterchefMoney()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefMoneyContract, pid, amount, account)
      if(token === "TIME")
        dispatch(fetchTimepoolUserDataAsync(account))
      else
        dispatch(fetchMoneypoolUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefMoneyContract, pid, token],
  )

  return { onStake: handleStake }
}

export const useStakeSphn = (masterchefAddress: string, token: string) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useSousChef(masterchefAddress)

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stakeSphn(masterChefContract, amount, account)
        dispatch(fetchMoneypoolUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract],
  )

  return { onStake: handleStake }
}

export const useStake = (pId: number, masterchefAddress: string, uuid) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefTimeContract = useMasterchefTime()
  const masterChefMoneyContract = useMasterchefMoney()
  const masterChefContract = masterchefAddress === getMasterChefMoneyAddress() ? masterChefMoneyContract : masterChefTimeContract

  const handleStake = useCallback(
    async (amount: string) => {
      await stake(masterChefContract, pId, amount, account)
      dispatch(updateUserStakedBalance(uuid, account))
      dispatch(updateUserBalance(uuid, account))
    },
    [account, dispatch, masterChefContract, pId, uuid],
  )

  return { onStake: handleStake }
}

export const useSousStake = (pId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefTimeContract = useMasterchefTime()
  const sousChefContract = useSousChef(pId)

  const handleStake = useCallback(
    async (amount: string, decimals: number) => {
      if (pId === 0) {
        await stake(masterChefTimeContract, 0, amount, account)
      } else if (isUsingBnb) {
        await sousStakeBnb(sousChefContract, amount, account)
      } else {
        await sousStake(sousChefContract, amount, decimals, account)
      }
      dispatch(updateUserStakedBalance(pId, account))
      dispatch(updateUserBalance(pId, account))
    },
    [account, dispatch, isUsingBnb, masterChefTimeContract, sousChefContract, pId],
  )

  return { onStake: handleStake }
}

