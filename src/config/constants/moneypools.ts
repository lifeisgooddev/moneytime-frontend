import tokens from './tokens'
import { MoneypoolConfig } from './types'

const moneypools: MoneypoolConfig[] = [
  {
    pid: 16,
    lpSymbol: 'MONEY',
    lpAddresses: {
      97: '0xfc64A462F881A300C999a3fFB141a78b3687d947',
      56: '',
    },
    token: tokens.money,
    quoteToken: tokens.money
  }
]

export default moneypools