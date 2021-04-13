/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import poolsConfig from 'config/constants/pools'
import { getAddress } from 'utils/addressHelpers'
import { fetchPoolsBlockLimits, fetchPoolsMultiplier, fetchPoolsTotalStatking } from './fetchPools'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
} from './fetchPoolsUser'
import { PoolsState, Pool } from '../types'

const initialState: PoolsState = { data: [...poolsConfig] }

export const PoolsSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setPoolsPublicData: (state, action) => {
      const livePoolsData = action.payload
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsData.find((entry) => entry.pId === pool.pId)
        // const livePoolData = livePoolsData.find((entry) => pool.tokenAddress === getAddress(entry.stakingToken.address) && pool.contractAddress === getAddress(entry.contractAddress))
        return { ...pool, ...livePoolData }
      })
    },
    setPoolsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool) => {
        const userPoolData = userData.find((entry) => entry.uuid === pool.uuid)
        return { ...pool, userData: userPoolData }
      })
    },
    updatePoolsUserData: (state, action) => {
      const { field, value, uuid } = action.payload
      const index = state.data.findIndex((p) => p.uuid  === uuid)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
  },
})

// Actions
export const { setPoolsPublicData, setPoolsUserData, updatePoolsUserData } = PoolsSlice.actions

// Thunks
export const fetchPoolsPublicDataAsync = () => async (dispatch) => {
  const blockLimits = await fetchPoolsBlockLimits()
  const totalStakings = await fetchPoolsTotalStatking()
  const multipliers = await fetchPoolsMultiplier()
  
  const liveData = poolsConfig.map((pool) => {
    const blockLimit = blockLimits.find((entry) => entry.pId === pool.pId)
    const totalStaking = totalStakings.find((entry) => entry.pId === pool.pId)
    // const multiplier = multipliers.find((entry) => entry.tokenAddress === getAddress(pool.stakingToken.address) && entry.contractAddress === getAddress(pool.contractAddress))
    return {
      ...blockLimit,
      ...totalStaking,
      // ...multiplier
    }
  })
  dispatch(setPoolsPublicData(liveData))
}

export const fetchPoolsUserDataAsync = (account) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  const stakingTokenBalances = await fetchUserBalances(account)
  const stakedBalances = await fetchUserStakeBalances(account)
  const pendingRewards = await fetchUserPendingRewards(account)

  const userData = poolsConfig.map((pool) => ({
    uuid: pool.uuid,
    pId: pool.uuid,
    allowance: allowances[pool.uuid],
    stakingTokenBalance: stakingTokenBalances[pool.uuid],
    stakedBalance: stakedBalances[pool.uuid],
    pendingReward: pendingRewards[pool.uuid],
  }))

  dispatch(setPoolsUserData(userData))
}

export const updateUserAllowance = (uuid: string, account: string) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  dispatch(updatePoolsUserData({ uuid, field: 'allowance', value: allowances[uuid] }))
}

export const updateUserBalance = (uuid: string, account: string) => async (dispatch) => {
  const tokenBalances = await fetchUserBalances(account)
  dispatch(updatePoolsUserData({ uuid, field: 'stakingTokenBalance', value: tokenBalances[uuid] }))
}

export const updateUserStakedBalance = (uuid: string, account: string) => async (dispatch) => {
  const stakedBalances = await fetchUserStakeBalances(account)
  console.log(stakedBalances)
  dispatch(updatePoolsUserData({ uuid, field: 'stakedBalance', value: stakedBalances[uuid] }))
}

export const updateUserPendingReward = (uuid: string, account: string) => async (dispatch) => {
  const pendingRewards = await fetchUserPendingRewards(account)
  dispatch(updatePoolsUserData({ uuid, field: 'pendingReward', value: pendingRewards[uuid] }))
}

export default PoolsSlice.reducer
