import tokens from './tokens'
import { MoneypoolConfig } from './types'

const moneypools: MoneypoolConfig[] = [
  {
    pid: 16,
    lpSymbol: 'MONEY',
    lpAddresses: {
      97: '0x4868BE84Ba40206f95c97E43342611d414F4f35E',
      56: '',
    },
    token: tokens.money,
    quoteToken: tokens.money
  }
]

export default moneypools