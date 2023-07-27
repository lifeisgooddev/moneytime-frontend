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
    masterChef: {
      97: '0xa2892CDD8152dB54b59252FbC5B05e0cB8cfC4bA',
      56: '0x015CD1D5FE7fABd84273cB068aC167217d5E92F1',
    },
    token: tokens.money,
    quoteToken: tokens.money,
    earningToken: tokens.money,
    isFinished: false
  },
  {
    pid: 0,
    lpSymbol: 'SPHN',
    lpAddresses: {
      97: '0xfa0A675a44A7b93eF870e09F6bEd60B2198baEC3',
      56: '0x8FB386Da2848eaE8E452c4Ebb3AF5172d06bcdCb',
    },
    masterChef: {
      97: '0x113fcA476986E8eC070679d76cFe534C380729B4',
      56: '0x113fcA476986E8eC070679d76cFe534C380729B4',
    },
    token: tokens.money,
    quoteToken: tokens.money,
    earningToken: tokens.sphn,
    isFinished: true
  },
  {
    pid: 1,
    lpSymbol: 'b1MT old',
    lpAddresses: {
      97: '0xfa0A675a44A7b93eF870e09F6bEd60B2198baEC3',
      56: '0x8FB386Da2848eaE8E452c4Ebb3AF5172d06bcdCb',
    },
    masterChef: {
      97: '0x360b189df20BE6f5f866546CCd3DE2bF2497a0d0',
      56: '0x360b189df20BE6f5f866546CCd3DE2bF2497a0d0',
    },
    token: tokens.money,
    quoteToken: tokens.money,
    earningToken: tokens.onemt,
    totalAmount : "6300",
    isFinished: true
  },
  {
    pid: 2,
    lpSymbol: 'b1MT',
    lpAddresses: {
      97: '0xfa0A675a44A7b93eF870e09F6bEd60B2198baEC3',
      56: '0x8FB386Da2848eaE8E452c4Ebb3AF5172d06bcdCb',
    },
    masterChef: {
      97: '0x4B1771f7078d745c7a04C056aAA44B811669AeaA',
      56: '0x4B1771f7078d745c7a04C056aAA44B811669AeaA',
    },
    token: tokens.money,
    quoteToken: tokens.money,
    earningToken: tokens.onemt,
    totalAmount : "6300",
    isFinished: false
  },
  {
    pid: 3,
    lpSymbol: 'b1MT old 2',
    lpAddresses: {
      97: '0xfa0A675a44A7b93eF870e09F6bEd60B2198baEC3',
      56: '0x8FB386Da2848eaE8E452c4Ebb3AF5172d06bcdCb',
    },
    masterChef: {
      97: '0x3538515c839185B1349e7676D3DDB669Fb2E0977',
      56: '0x3538515c839185B1349e7676D3DDB669Fb2E0977',
    },
    token: tokens.money,
    quoteToken: tokens.money,
    earningToken: tokens.onemt,
    totalAmount : "6300",
    isFinished: true
  }
]

export default moneypools