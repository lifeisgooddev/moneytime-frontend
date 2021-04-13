/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import TimepoolsConfig from 'config/constants/timepools'
import fetchTimepools from './fetchTimepools'
import {
  fetchTimepoolUserEarnings,
  fetchTimepoolUserAllowances,
  fetchTimepoolUserTokenBalances,
  fetchTimepoolUserStakedBalances,
} from './fetchTimepoolUser'
import { TimepoolsState, Timepool } from '../types'

const initialState: TimepoolsState = { data: [...TimepoolsConfig] }

export const timepoolsSlice = createSlice({
  name: 'Timepools',
  initialState,
  reducers: {
    setTimepoolsPublicData: (state, action) => {
      const liveTimepoolsData: Timepool[] = action.payload
      state.data = state.data.map((timepool) => {
        const liveTimepoolData = liveTimepoolsData.find((f) => f.pid === timepool.pid)
        return { ...timepool, ...liveTimepoolData }
      })
    },
    setTimepoolUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
  },
})

// Actions
export const { setTimepoolsPublicData, setTimepoolUserData } = timepoolsSlice.actions

// Thunks
export const fetchTimepoolsPublicDataAsync = () => async (dispatch) => {
  const timepools = await fetchTimepools();
  dispatch(setTimepoolsPublicData(timepools))
}
export const fetchTimepoolUserDataAsync = (account) => async (dispatch) => {
  const userTimepoolAllowances = await fetchTimepoolUserAllowances(account)
  const userTimepoolTokenBalances = await fetchTimepoolUserTokenBalances(account)
  const userStakedBalances = await fetchTimepoolUserStakedBalances(account)
  const userTimepoolEarnings = await fetchTimepoolUserEarnings(account)
  const arrayOfUserDataObjects = userTimepoolAllowances.map((TimepoolAllowance, index) => {
    return {
      index,
      allowance: userTimepoolAllowances[index],
      tokenBalance: userTimepoolTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userTimepoolEarnings[index],
    }
  })
  dispatch(setTimepoolUserData({ arrayOfUserDataObjects }))
}

export default timepoolsSlice.reducer
