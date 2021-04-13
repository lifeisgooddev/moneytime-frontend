import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserBalance, updateUserPendingReward, fetchTimepoolUserDataAsync, fetchMoneypoolUserDataAsync } from 'state/actions'
import { soushHarvest, soushHarvestBnb, harvest } from 'utils/callHelpers'
import { getMasterChefMoneyAddress } from 'utils/addressHelpers'
import { useMasterchefTime, useMasterchefMoney, useSousChef } from './useContract'

export const useHarvestTime = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefTimeContract = useMasterchefTime()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefTimeContract, farmPid, account)
    dispatch(fetchFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, masterChefTimeContract])

  return { onReward: handleHarvest }
}

export const useHarvestMoney = (farmPid: number, token: string) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefMoneyContract = useMasterchefMoney()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefMoneyContract, farmPid, account)
    if(token === "TIME")
      dispatch(fetchTimepoolUserDataAsync(account))
    else
      dispatch(fetchMoneypoolUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, masterChefMoneyContract, token])

  return { onReward: handleHarvest }
}

export const useHarvest = (pId: number, masterchefAddress: string, uuid) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefTimeContract = useMasterchefTime()
  const masterChefMoneyContract = useMasterchefMoney()
  const masterChefContract = masterchefAddress === getMasterChefMoneyAddress() ? masterChefMoneyContract : masterChefTimeContract

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pId, account)
    dispatch(updateUserPendingReward(uuid, account))
    dispatch(updateUserBalance(uuid, account))
    return txHash
  }, [account, dispatch, pId, masterChefContract, uuid])

  return { onReward: handleHarvest }
}

export const useAllHarvest = (farmPids: number[]) => {
  const { account } = useWeb3React()
  const masterChefTimeContract = useMasterchefTime()

  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return [...accum, harvest(masterChefTimeContract, pid, account)]
    }, [])

    return Promise.all(harvestPromises)
  }, [account, farmPids, masterChefTimeContract])

  return { onReward: handleHarvest }
}

export const useSousHarvest = (pId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const sousChefContract = useSousChef(pId)
  const masterChefTimeContract = useMasterchefTime()

  const handleHarvest = useCallback(async () => {
    if (pId === 0) {
      await harvest(masterChefTimeContract, 0, account)
    } else if (isUsingBnb) {
      await soushHarvestBnb(sousChefContract, account)
    } else {
      await soushHarvest(sousChefContract, account)
    }
    dispatch(updateUserPendingReward(pId, account))
    dispatch(updateUserBalance(pId, account))
  }, [account, dispatch, isUsingBnb, masterChefTimeContract, sousChefContract, pId])

  return { onReward: handleHarvest }
}
