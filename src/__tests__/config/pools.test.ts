import pools from 'config/constants/pools'
import { getSouschefContract } from 'utils/contractHelpers'

// Pool 0 is special (cake pool)
// Pool 78 is a broken pool, not used, and break the tests
const idsToRemove = [0, 78]
const poolsToTest = pools.filter((pool) => !idsToRemove.includes(pool.pId))

describe('Config pools', () => {
  it.each(pools.map((pool) => pool.pId))('Pool #%d has an unique pId', (pId) => {
    const duplicates = pools.filter((p) => pId === p.pId)
    expect(duplicates).toHaveLength(1)
  })
  it.each(pools.map((pool) => [pool.pId, pool.contractAddress]))(
    'Pool #%d has an unique contract address',
    (pId, contractAddress) => {
      const duplicates = pools.filter((p) => contractAddress[56] === p.contractAddress[56])
      expect(duplicates).toHaveLength(1)
    },
  )
  it.each(poolsToTest.filter((pool) => pool.earningToken.symbol !== 'BNB'))(
    'Pool %p has the correct earning token',
    async (pool) => {
      const contract = getSouschefContract(pool.pId)
      const rewardTokenAddress = await contract.methods.rewardToken().call()
      expect(rewardTokenAddress.toLowerCase()).toBe(pool.earningToken.address[56].toLowerCase())
    },
  )
  it.each(poolsToTest.filter((pool) => pool.stakingToken.symbol !== 'BNB'))(
    'Pool %p has the correct staking token',
    async (pool) => {
      const contract = getSouschefContract(pool.pId)
      const stakingTokenAddress = await contract.methods.syrup().call()
      expect(stakingTokenAddress.toLowerCase()).toBe(pool.stakingToken.address[56].toLowerCase())
    },
  )
})
