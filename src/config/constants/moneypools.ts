import tokens from './tokens'
import { MoneypoolConfig } from './types'

const moneypools: MoneypoolConfig[] = [
  {
    pid: 22,
    lpSymbol: 'MONEY',
    lpAddresses: {
      97: '0x03784d395AE03e5c8578E116038Ba12ccE169D1b',
      56: '',
    },
    token: tokens.money,
    quoteToken: tokens.money
  }
]

export default moneypools