import tokens from './tokens'
import { MoneypoolConfig } from './types'

const moneypools: MoneypoolConfig[] = [
  {
    pid: 16,
    lpSymbol: 'MONEY',
    lpAddresses: {
      97: '0xf3f3824df51BC1Bd846da3Bc9f9a80eb98Ff928A',
      56: '',
    },
    token: tokens.money,
    quoteToken: tokens.money
  }
]

export default moneypools