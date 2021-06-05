import tokens from './tokens'
import { TimepoolConfig } from './types'

const timepools: TimepoolConfig[] = [
  {
    pid: 0,
    lpSymbol: 'TIME',
    lpAddresses: {
      97: '0x199C1575eFDA2AA79ED043f2743d684c5EddF770',
      56: '',
    },
    token: tokens.time,
    quoteToken: tokens.time,
    lockPeriod: '4 Hours'
  },
  {
    pid: 1,
    lpSymbol: 'TIME',
    lpAddresses: {
      97: '0x199C1575eFDA2AA79ED043f2743d684c5EddF770',
      56: '',
    },
    token: tokens.time,
    quoteToken: tokens.time,
    lockPeriod: '1 Day'
  },
  {
    pid: 2,
    lpSymbol: 'TIME',
    lpAddresses: {
      97: '0x199C1575eFDA2AA79ED043f2743d684c5EddF770',
      56: '',
    },
    token: tokens.time,
    quoteToken: tokens.time,
    lockPeriod: '3 Days'
  },
  {
    pid: 3,
    lpSymbol: 'TIME',
    lpAddresses: {
      97: '0x199C1575eFDA2AA79ED043f2743d684c5EddF770',
      56: '',
    },
    token: tokens.time,
    quoteToken: tokens.time,
    lockPeriod: '1 Week'
  },
  {
    pid: 4,
    lpSymbol: 'TIME',
    lpAddresses: {
      97: '0x199C1575eFDA2AA79ED043f2743d684c5EddF770',
      56: '',
    },
    token: tokens.time,
    quoteToken: tokens.time,
    lockPeriod: '2 Weeks'
  },
  {
    pid: 5,
    lpSymbol: 'TIME',
    lpAddresses: {
      97: '0x199C1575eFDA2AA79ED043f2743d684c5EddF770',
      56: '',
    },
    token: tokens.time,
    quoteToken: tokens.time,
    lockPeriod: '1 Month'
  }
]

export default timepools
