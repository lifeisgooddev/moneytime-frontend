import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [

  {
    uuid: 0,
    pId: 6,
    stakingToken: tokens.wbnb,
    earningToken: tokens.money,
    contractAddress: {
      97: '0x55Eb484Ab62ADE2eE3B3c2eD78533d7e80F5e517',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 2,
    tokenPerBlock: '3',
  },
  {
    uuid: 1,
    pId: 7,
    stakingToken: tokens.glto,
    earningToken: tokens.money,
    contractAddress: {
      97: '0x55Eb484Ab62ADE2eE3B3c2eD78533d7e80F5e517',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 3,
    tokenPerBlock: '3',
  },
  {
    uuid: 2,
    pId: 8,
    stakingToken: tokens.busd,
    earningToken: tokens.money,
    contractAddress: {
      97: '0x55Eb484Ab62ADE2eE3B3c2eD78533d7e80F5e517',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '2',
    sortOrder: 1,
    isFinished: false,
  },
  {
    uuid: 3,
    pId: 9,
    stakingToken: tokens.btcb,
    earningToken: tokens.money,
    contractAddress: {
      97: '0x55Eb484Ab62ADE2eE3B3c2eD78533d7e80F5e517',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 5,
    tokenPerBlock: '2',
  },
  {
    uuid: 4,
    pId: 10,
    stakingToken: tokens.eth,
    earningToken: tokens.money,
    contractAddress: {
      97: '0x55Eb484Ab62ADE2eE3B3c2eD78533d7e80F5e517',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 6,
    tokenPerBlock: '2',
  },
  {
    uuid: 5,
    pId: 11,
    stakingToken: tokens.dot,
    earningToken: tokens.money,
    contractAddress: {
      97: '0x55Eb484Ab62ADE2eE3B3c2eD78533d7e80F5e517',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 6,
    tokenPerBlock: '2',
  },
  {
    uuid: 6,
    pId: 12,
    stakingToken: tokens.dai,
    earningToken: tokens.money,
    contractAddress: {
      97: '0x55Eb484Ab62ADE2eE3B3c2eD78533d7e80F5e517',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 6,
    tokenPerBlock: '1',
  },
  {
    uuid: 7,
    pId: 13,
    stakingToken: tokens.usdc,
    earningToken: tokens.money,
    contractAddress: {
      97: '0x55Eb484Ab62ADE2eE3B3c2eD78533d7e80F5e517',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 6,
    tokenPerBlock: '1',
  },
  {
    uuid: 8,
    pId: 14,
    stakingToken: tokens.cake,
    earningToken: tokens.money,
    contractAddress: {
      97: '0x55Eb484Ab62ADE2eE3B3c2eD78533d7e80F5e517',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 6,
    tokenPerBlock: '1',
  },
  {
    uuid: 9,
    pId: 15,
    stakingToken: tokens.usdt,
    earningToken: tokens.money,
    contractAddress: {
      97: '0x55Eb484Ab62ADE2eE3B3c2eD78533d7e80F5e517',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 4,
    tokenPerBlock: '1',
  },
  {
    uuid: 10,
    pId: 11,
    stakingToken: tokens.wbnb,
    earningToken: tokens.time,
    contractAddress: {
      97: '0x5c4a6A235C3EEc708b041C6798fF738336C6D4e4',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 6,
    tokenPerBlock: '6',
  },
  {
    uuid: 11,
    pId: 12,
    stakingToken: tokens.glto,
    earningToken: tokens.time,
    contractAddress: {
      97: '0x5c4a6A235C3EEc708b041C6798fF738336C6D4e4',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 6,
    tokenPerBlock: '6',
  },
  {
    uuid: 12,
    pId: 13,
    stakingToken: tokens.busd,
    earningToken: tokens.time,
    contractAddress: {
      97: '0x5c4a6A235C3EEc708b041C6798fF738336C6D4e4',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 6,
    tokenPerBlock: '4',
  },
  {
    uuid: 13,
    pId: 14,
    stakingToken: tokens.btcb,
    earningToken: tokens.time,
    contractAddress: {
      97: '0x5c4a6A235C3EEc708b041C6798fF738336C6D4e4',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 6,
    tokenPerBlock: '4',
  },
  {
    uuid: 14,
    pId: 15,
    stakingToken: tokens.eth,
    earningToken: tokens.time,
    contractAddress: {
      97: '0x5c4a6A235C3EEc708b041C6798fF738336C6D4e4',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 6,
    tokenPerBlock: '4',
  },
  {
    uuid: 15,
    pId: 16,
    stakingToken: tokens.dot,
    earningToken: tokens.time,
    contractAddress: {
      97: '0x5c4a6A235C3EEc708b041C6798fF738336C6D4e4',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 6,
    tokenPerBlock: '4',
  },
  {
    uuid: 16,
    pId: 17,
    stakingToken: tokens.cake,
    earningToken: tokens.time,
    contractAddress: {
      97: '0x5c4a6A235C3EEc708b041C6798fF738336C6D4e4',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 6,
    tokenPerBlock: '4',
  },
  {
    uuid: 17,
    pId: 18,
    stakingToken: tokens.dai,
    earningToken: tokens.time,
    contractAddress: {
      97: '0x5c4a6A235C3EEc708b041C6798fF738336C6D4e4',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 6,
    tokenPerBlock: '3',
  },
  {
    uuid: 18,
    pId: 19,
    stakingToken: tokens.usdt,
    earningToken: tokens.time,
    contractAddress: {
      97: '0x5c4a6A235C3EEc708b041C6798fF738336C6D4e4',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 6,
    tokenPerBlock: '3',
  },
  {
    uuid: 19,
    pId: 20,
    stakingToken: tokens.usdc,
    earningToken: tokens.time,
    contractAddress: {
      97: '0x16227D60f7a0e586C66B005219dfc887D13C9531',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 6,
    tokenPerBlock: '3',
  }
]

export default pools
