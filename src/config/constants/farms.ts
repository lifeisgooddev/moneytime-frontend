import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '0xB39eADa9B7b1BC6dB7D1876cdfBe574b8096a280',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'MONEY-BUSD LP',
    lpAddresses: {
      97: '0x7166fd61c89466be87f0944dc66f97c4e697c3cf',
      56: '',
    },
    multiplier : '50X',
    token: tokens.money,
    quoteToken: tokens.busd,
  },
  {
    pid: 1,
    lpSymbol: 'MONEY-BNB LP',
    lpAddresses: {
      97: '0xf86aecd53d34a622d599aaf2b821eeff7677e489',
      56: '',
    },
    token: tokens.money,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '0xC1E83ff33807b45acc9e6985fDCe025bc70c20D6',
      56: '',
    },
    token: tokens.wbnb,
    quoteToken: tokens.busd,
  },
  {
    pid: 5,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '0x297af4052A0A57304BE2085F8C6A5655215A8F36',
      56: '',
    },
    token: tokens.usdt,
    quoteToken: tokens.busd,
  },
  {
    pid: 6,
    lpSymbol: 'GLTO-BNB LP',
    lpAddresses: {
      97: '0xdbbef13586c17aa34593a6f035a615e9175e41c5',
      56: '',
    },
    token: tokens.glto,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 7,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      97: '0x45f1ffef33c42a2eadb223da67f63ae5d8d2f426',
      56: '',
    },
    token: tokens.btcb,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 8,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      97: '0xfb9b781d5d1675e64278003d06f8979865914836',
      56: '',
    },
    token: tokens.eth,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 9,
    lpSymbol: 'DAI-BUSD LP',
    lpAddresses: {
      97: '0x876d01aced504e6f4868becbc8aac694078df23d',
      56: '',
    },
    token: tokens.dai,
    quoteToken: tokens.busd,
  },
  {
    pid: 10,
    lpSymbol: 'USDC-BUSD LP',
    lpAddresses: {
      97: '0x261b33445f4bf55f6341df925b598d67cdc50fb7',
      56: '',
    },
    token: tokens.usdc,
    quoteToken: tokens.busd,
  },
  {
    pid: 11,
    lpSymbol: 'DOT-BNB LP',
    lpAddresses: {
      97: '0xb75b540fc0790416cf99eb0e42ba12c32897635b',
      56: '',
    },
    token: tokens.dot,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 12,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '0x301b5c9b0337829894799c1b22a06a7e77544919',
      56: '',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
  },
]

export default farms
