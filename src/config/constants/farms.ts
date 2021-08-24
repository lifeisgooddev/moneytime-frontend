import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 19,
    lpSymbol: 'MONEY-BNB LP',
    lpAddresses: {
      97: '0x0d4cd4bc87b2e96459efa8f044fcffa53ce412eb',
      56: '0xe4f25e12e55a40a92e4b09770373eeebf1e64a01',
    },
    token: tokens.money,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 20,
    lpSymbol: 'MONEY-BUSD LP',
    lpAddresses: {
      97: '0x9b1991e68e707990a7f9214e0910f407a11a17d5',
      56: '0xfddcdf19510bc037201f49cb988997f0eb31a667',
    },
    token: tokens.money,
    quoteToken: tokens.busd,
  },
  {
    pid: 0,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '0xdfaf4af334ab85d43500b4e7edfa570c307b79d9',
      56: '0x3245e8dd5a7fcac286ddbc4be357b9f66d76a48c',
    },
    token: tokens.wbnb,
    quoteToken: tokens.busd,
  },
  
  {
    pid: 2,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      97: '0x2563aebafb08e6a8db5a06f1da0da700756feece',
      56: '0x913285a0feeffe746290098e3451aae500c1e678',
    },
    token: tokens.btcb,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 3,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      97: '0x6f4e54794f43622c4a244bb1a40f27ee37f93c76',
      56: '0xef2806a1c756d3b3435e3b58199285e5c31757ad',
    },
    token: tokens.eth,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'DOT-BNB LP',
    lpAddresses: {
      97: '0x2076147fe616bafadabe72b50634199375bb2d92',
      56: '0xe2e1982e341455ca65066cf968acb72299ab8bd9',
    },
    token: tokens.dot,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 5,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '0x16e8110e7a0cd5fa1ce1cad318ebfdf85344bbd6',
      56: '0xc171efa18092374d90b94974cee7d9061e4ac91e',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 6,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '0xa51d08793ebfa0b69b477109db999ed0a9faceed',
      56: '0x4c16edfea95d37b16e48ba61d95286976097c006',
    },
    token: tokens.usdt,
    quoteToken: tokens.busd,
  },
  {
    pid: 7,
    lpSymbol: 'USDC-BUSD LP',
    lpAddresses: {
      97: '0x2b14e327c01107813a80ec4f273f7765fccaadd3',
      56: '0x1523baac9c8b92faf819dfa3f87c86e153ea80bc',
    },
    token: tokens.usdc,
    quoteToken: tokens.busd,
  },
  {
    pid: 8,
    lpSymbol: 'DAI-BUSD LP',
    lpAddresses: {
      97: '0x2b2e3fa83b47f4a25b8fe7fce786ad008710bdf4',
      56: '0x40f23ab98d163037ef876c04209978a91c5f19ac',
    },
    token: tokens.dai,
    quoteToken: tokens.busd,
  },
  {
    pid: 1,
    lpSymbol: 'GLTO-BNB (ICS) LP',
    lpAddresses: {
      97: '0xd80283e7b4f824a9575dfe788d0d1dbf45c5ff0d',
      56: '0x4ac95acB54bf2FDB48Cab3Fab6F40ff88bD85C85',
    },
    token: tokens.glto,
    quoteToken: tokens.wbnb,
  },
  
]

export default farms
