import tokens from './tokens'
import { MoneypoolConfig } from './types'

const moneypools: MoneypoolConfig[] = [
  {
    pid: 16,
    lpSymbol: 'MONEY',
    lpAddresses: {
      97: '0x95a96Aa9D1E1334200d1F6448930366595737c9b',
      56: '',
    },
    token: tokens.money,
    quoteToken: tokens.money
  }
]

export default moneypools