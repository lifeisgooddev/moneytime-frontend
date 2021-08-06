import tokens from './tokens'
import { TimepoolConfig } from './types'

const timepools: TimepoolConfig[] = [
  {
    pid: 10,
    lpSymbol: 'TIME',
    lpAddresses: {
      97: '0xc89aBA08DFC0996931Da81D1dC01f0E4A4bCEaBB',
      56: '',
    },
    token: tokens.time,
    quoteToken: tokens.time,
    lockPeriod: '4 Hours'
  },
  {
    pid: 11,
    lpSymbol: 'TIME',
    lpAddresses: {
      97: '0xc89aBA08DFC0996931Da81D1dC01f0E4A4bCEaBB',
      56: '',
    },
    token: tokens.time,
    quoteToken: tokens.time,
    lockPeriod: '1 Day'
  },
  {
    pid: 12,
    lpSymbol: 'TIME',
    lpAddresses: {
      97: '0xc89aBA08DFC0996931Da81D1dC01f0E4A4bCEaBB',
      56: '',
    },
    token: tokens.time,
    quoteToken: tokens.time,
    lockPeriod: '3 Days'
  },
  {
    pid: 13,
    lpSymbol: 'TIME',
    lpAddresses: {
      97: '0xc89aBA08DFC0996931Da81D1dC01f0E4A4bCEaBB',
      56: '',
    },
    token: tokens.time,
    quoteToken: tokens.time,
    lockPeriod: '1 Week'
  },
  {
    pid: 14,
    lpSymbol: 'TIME',
    lpAddresses: {
      97: '0xc89aBA08DFC0996931Da81D1dC01f0E4A4bCEaBB',
      56: '',
    },
    token: tokens.time,
    quoteToken: tokens.time,
    lockPeriod: '2 Weeks'
  },
  {
    pid: 15,
    lpSymbol: 'TIME',
    lpAddresses: {
      97: '0xc89aBA08DFC0996931Da81D1dC01f0E4A4bCEaBB',
      56: '',
    },
    token: tokens.time,
    quoteToken: tokens.time,
    lockPeriod: '1 Month'
  }
]

export default timepools
