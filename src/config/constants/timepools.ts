import tokens from './tokens'
import { TimepoolConfig } from './types'

const timepools: TimepoolConfig[] = [
  {
    pid: 10,
    lpSymbol: 'TIME',
    lpAddresses: {
      97: '0x521A89791762cc7815772eBB9f10F074F1C7EDd0',
      56: '0xd63DEadCEbb55Bd579699F2d026D2F8Ed705BE69',
    },
    token: tokens.time,
    quoteToken: tokens.time,
    lockPeriod: '4 Hours'
  },
  {
    pid: 11,
    lpSymbol: 'TIME',
    lpAddresses: {
      97: '0x521A89791762cc7815772eBB9f10F074F1C7EDd0',
      56: '0xd63DEadCEbb55Bd579699F2d026D2F8Ed705BE69',
    },
    token: tokens.time,
    quoteToken: tokens.time,
    lockPeriod: '1 Day'
  },
  {
    pid: 12,
    lpSymbol: 'TIME',
    lpAddresses: {
      97: '0x521A89791762cc7815772eBB9f10F074F1C7EDd0',
      56: '0xd63DEadCEbb55Bd579699F2d026D2F8Ed705BE69',
    },
    token: tokens.time,
    quoteToken: tokens.time,
    lockPeriod: '3 Days'
  },
  {
    pid: 13,
    lpSymbol: 'TIME',
    lpAddresses: {
      97: '0x521A89791762cc7815772eBB9f10F074F1C7EDd0',
      56: '0xd63DEadCEbb55Bd579699F2d026D2F8Ed705BE69',
    },
    token: tokens.time,
    quoteToken: tokens.time,
    lockPeriod: '1 Week'
  },
  {
    pid: 14,
    lpSymbol: 'TIME',
    lpAddresses: {
      97: '0x521A89791762cc7815772eBB9f10F074F1C7EDd0',
      56: '0xd63DEadCEbb55Bd579699F2d026D2F8Ed705BE69',
    },
    token: tokens.time,
    quoteToken: tokens.time,
    lockPeriod: '2 Weeks'
  },
  {
    pid: 15,
    lpSymbol: 'TIME',
    lpAddresses: {
      97: '0x521A89791762cc7815772eBB9f10F074F1C7EDd0',
      56: '0xd63DEadCEbb55Bd579699F2d026D2F8Ed705BE69',
    },
    token: tokens.time,
    quoteToken: tokens.time,
    lockPeriod: '1 Month'
  }
]

export default timepools
