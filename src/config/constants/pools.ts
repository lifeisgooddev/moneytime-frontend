import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.time,
    earningToken: tokens.money,
    contractAddress: {
      97: '0x34f9b8A5C825e02f59Aa72F9024cBcC738e3A058',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.4',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 83,
    stakingToken: tokens.time,
    earningToken: tokens.money,
    contractAddress: {
      97: '0x34f9b8A5C825e02f59Aa72F9024cBcC738e3A058',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 2,
    tokenPerBlock: '2.5',
  },
  {
    sousId: 83,
    stakingToken: tokens.time,
    earningToken: tokens.money,
    contractAddress: {
      97: '0x34f9b8A5C825e02f59Aa72F9024cBcC738e3A058',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 2,
    tokenPerBlock: '8',
  },
  {
    sousId: 83,
    stakingToken: tokens.time,
    earningToken: tokens.money,
    contractAddress: {
      97: '0x34f9b8A5C825e02f59Aa72F9024cBcC738e3A058',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 2,
    tokenPerBlock: '16.69',
  },
  {
    sousId: 83,
    stakingToken: tokens.time,
    earningToken: tokens.money,
    contractAddress: {
      97: '0x34f9b8A5C825e02f59Aa72F9024cBcC738e3A058',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 2,
    tokenPerBlock: '35',
  },
  {
    sousId: 83,
    stakingToken: tokens.time,
    earningToken: tokens.money,
    contractAddress: {
      97: '0x34f9b8A5C825e02f59Aa72F9024cBcC738e3A058',
      56: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 2,
    tokenPerBlock: '80',
  },
]

export default pools
