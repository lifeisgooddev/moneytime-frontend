/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import moneypoolsConfig from 'config/constants/moneypools'
import fetchMoneypools from './fetchMoneypools'
import {
  fetchMoneypoolUserEarnings,
  fetchMoneypoolUserAllowances,
  fetchMoneypoolUserTokenBalances,
  fetchMoneypoolUserStakedBalances,
} from './fetchMoneypoolUser'
import { MoneypoolsState, Moneypool } from '../types'

const initialState: MoneypoolsState = { data: [...moneypoolsConfig] }

export const moneypoolsSlice = createSlice({
  name: 'moneypools',
  initialState,
  reducers: {
    setMoneypoolsPublicData: (state, action) => {
      const liveMoneypoolsData: Moneypool[] = action.payload
      state.data = state.data.map((moneypool) => {
        const liveMoneypoolData = liveMoneypoolsData.find((f) => f.pid === moneypool.pid)
        return { ...moneypool, ...liveMoneypoolData }
      })
    },
    setMoneypoolUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
  },
})

// Actions
export const { setMoneypoolsPublicData, setMoneypoolUserData } = moneypoolsSlice.actions

// Thunks
export const fetchMoneypoolsPublicDataAsync = () => async (dispatch) => {
  const moneypools = await fetchMoneypools();
  dispatch(setMoneypoolsPublicData(moneypools))
}
export const fetchMoneypoolUserDataAsync = (account) => async (dispatch) => {
  
  const usermoneypoolAllowances = await fetchMoneypoolUserAllowances(account)
  const usermoneypoolTokenBalances = await fetchMoneypoolUserTokenBalances(account)
  const userInfo = await fetchMoneypoolUserStakedBalances(account);
  const usermoneypoolEarnings = await fetchMoneypoolUserEarnings(account)
  const arrayOfUserDataObjects = usermoneypoolAllowances.map((moneypoolAllowance, index) => {
    return {
      index,
      allowance: usermoneypoolAllowances[index],
      tokenBalance: usermoneypoolTokenBalances[index],
      stakedBalance: userInfo[index][0],
      earnings: usermoneypoolEarnings[index],
      depositTime: userInfo[index][1]
    }
  })
  dispatch(setMoneypoolUserData({ arrayOfUserDataObjects }))
}

export default moneypoolsSlice.reducer
