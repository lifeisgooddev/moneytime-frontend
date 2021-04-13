import { configureStore } from '@reduxjs/toolkit'
import farmsReducer from './farms'
import timepoolsReducer from './timepools'
import moneypoolsReducer from './moneypools'
import toastsReducer from './toasts'
import poolsReducer from './pools'
import pricesReducer from './prices'
import profileReducer from './profile'
import teamsReducer from './teams'
import achievementsReducer from './achievements'
import blockReducer from './block'

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    farms: farmsReducer,
    timepools: timepoolsReducer,
    moneypools: moneypoolsReducer,
    toasts: toastsReducer,
    pools: poolsReducer,
    prices: pricesReducer,
    profile: profileReducer,
    teams: teamsReducer,
    achievements: achievementsReducer,
    block: blockReducer,
  },
})
