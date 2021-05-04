import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'MONEY-BUSD LP',
    lpAddresses: {
      97: '0x52f004b523e0342d26e505368e7c3d64e8a875a8',
      56: '',
    },
    token: tokens.money,
    quoteToken: tokens.busd,
  },
  {
    pid: 1,
    lpSymbol: 'MONEY-WBNB LP',
    lpAddresses: {
      97: '0x48057bbd8b78c17fe95f53ead6c67aad831baa92',
      56: '',
    },
    token: tokens.money,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'WBNB-BUSD LP',
    lpAddresses: {
      97: '0xdfaf4af334ab85d43500b4e7edfa570c307b79d9',
      56: '',
    },
    token: tokens.wbnb,
    quoteToken: tokens.busd,
  },
  {
    pid: 3,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '0xa51d08793ebfa0b69b477109db999ed0a9faceed',
      56: '',
    },
    token: tokens.usdt,
    quoteToken: tokens.busd,
  },
  {
    pid: 4,
    lpSymbol: 'GLTO-WBNB LP',
    lpAddresses: {
      97: '0xd80283e7b4f824a9575dfe788d0d1dbf45c5ff0d',
      56: '',
    },
    token: tokens.glto,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 5,
    lpSymbol: 'BTCB-WBNB LP',
    lpAddresses: {
      97: '0x2563aebafb08e6a8db5a06f1da0da700756feece',
      56: '',
    },
    token: tokens.btcb,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 6,
    lpSymbol: 'ETH-WBNB LP',
    lpAddresses: {
      97: '0x6f4e54794f43622c4a244bb1a40f27ee37f93c76',
      56: '',
    },
    token: tokens.eth,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 7,
    lpSymbol: 'DAI-BUSD LP',
    lpAddresses: {
      97: '0x2b2e3fa83b47f4a25b8fe7fce786ad008710bdf4',
      56: '',
    },
    token: tokens.dai,
    quoteToken: tokens.busd,
  },
  {
    pid: 8,
    lpSymbol: 'USDC-BUSD LP',
    lpAddresses: {
      97: '0xe3d47962986003b31b2be49b1b59280a5ceae9e7',
      56: '',
    },
    token: tokens.usdc,
    quoteToken: tokens.busd,
  },
  {
    pid: 9,
    lpSymbol: 'DOT-WBNB LP',
    lpAddresses: {
      97: '0x2076147fe616bafadabe72b50634199375bb2d92',
      56: '',
    },
    token: tokens.dot,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 10,
    lpSymbol: 'CAKE-WBNB LP',
    lpAddresses: {
      97: '0x16e8110e7a0cd5fa1ce1cad318ebfdf85344bbd6',
      56: '',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
  },
]

export default farms
