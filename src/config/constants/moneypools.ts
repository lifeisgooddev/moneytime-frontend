import tokens from './tokens'
import { MoneypoolConfig } from './types'

const moneypools: MoneypoolConfig[] = [
  {
    pid: 16,
    lpSymbol: 'MONEY',
    lpAddresses: {
      97: '0xfa0A675a44A7b93eF870e09F6bEd60B2198baEC3',
      56: '0x8FB386Da2848eaE8E452c4Ebb3AF5172d06bcdCb',
    },
    token: tokens.money,
    quoteToken: tokens.money
  }
]

export default moneypools