import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'
import { useDispatch } from 'react-redux'
import { updateUserAllowance, fetchFarmUserDataAsync, fetchTimepoolUserDataAsync, fetchMoneypoolUserDataAsync } from 'state/actions'
import { approve } from 'utils/callHelpers'
import { getMasterChefMoneyAddress } from 'utils/addressHelpers'
import { useMasterchefTime, useMasterchefMoney, useCake, useSousChef, useLottery } from './useContract'

// Approve a Farm
export const useApproveTime = (lpContract: Contract) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefTimeContract = useMasterchefTime()
  

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefTimeContract, account)
      dispatch(fetchFarmUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, masterChefTimeContract])

  return { onApprove: handleApprove }
}

export const useApproveMoney = (lpContract: Contract , token: string) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefMoneyContract = useMasterchefMoney()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefMoneyContract, account)
      if(token === "TIME")
        dispatch(fetchTimepoolUserDataAsync(account))
      else
        dispatch(fetchMoneypoolUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, masterChefMoneyContract, token])

  return { onApprove: handleApprove }
}

export const useApproveSphn = (masterchefAddress: string, lpContract: Contract , token: string) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useSousChef(masterchefAddress)
  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
        dispatch(fetchMoneypoolUserDataAsync(account))
      return tx
    } catch (e) {
      console.log(e)
      return false
    }
  }, [account, dispatch, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}


export const useApprove = (masterchefAddress: string, lpContract: Contract, uuid) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefTimeContract = useMasterchefTime()
  const masterChefMoneyContract = useMasterchefMoney()
  const masterChefContract = masterchefAddress === getMasterChefMoneyAddress() ? masterChefMoneyContract : masterChefTimeContract
  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      dispatch(updateUserAllowance(uuid, account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, masterChefContract, uuid])

  return { onApprove: handleApprove }
}

// Approve a Pool
export const useSousApprove = (lpContract: Contract, pId) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const sousChefContract = useSousChef(pId)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, sousChefContract, account)
      dispatch(updateUserAllowance(pId, account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, sousChefContract, pId])

  return { onApprove: handleApprove }
}

// Approve the lottery
export const useLotteryApprove = () => {
  const { account } = useWeb3React()
  const cakeContract = useCake()
  const lotteryContract = useLottery()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(cakeContract, lotteryContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, cakeContract, lotteryContract])

  return { onApprove: handleApprove }
}

// Approve an IFO
export const useIfoApprove = (tokenContract: Contract, spenderAddress: string) => {
  const { account } = useWeb3React()
  const onApprove = useCallback(async () => {
    const tx = await tokenContract.methods.approve(spenderAddress, ethers.constants.MaxUint256).send({ from: account })
    return tx
  }, [account, spenderAddress, tokenContract])

  return onApprove
}
