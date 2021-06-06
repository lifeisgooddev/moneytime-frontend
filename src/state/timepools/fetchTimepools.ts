import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import masterchefMoneyABI from 'config/abi/MasterChefMoney.json'
import multicall from 'utils/multicall'
import {getAddress, getMasterChefMoneyAddress, getMasterChefTimeAddress} from 'utils/addressHelpers'
import timepoolsConfig from 'config/constants/timepools'

const fetchTimepools = async () => {
  const data = await Promise.all(
    timepoolsConfig.map(async (timepoolConfig) => {
      const lpAddress = getAddress(timepoolConfig.lpAddresses)
      const calls = [
        // Balance of token in the LP contract
        {
          address: getAddress(timepoolConfig.token.address),
          name: 'balanceOf',
          params: [getMasterChefMoneyAddress()],
        },
        // Balance of quote token on LP contract
        {
          address: getAddress(timepoolConfig.quoteToken.address),
          name: 'balanceOf',
          params: [getMasterChefMoneyAddress()],
        },
        // Balance of LP tokens in the master chef contract
        {
          address: lpAddress,
          name: 'balanceOf',
          params: [getMasterChefMoneyAddress()],
        },
        // Total supply of LP tokens
        {
          address: lpAddress,
          name: 'totalSupply',
        },
        // Token decimals
        {
          address: getAddress(timepoolConfig.token.address),
          name: 'decimals',
        },
        // Quote token decimals
        {
          address: getAddress(timepoolConfig.quoteToken.address),
          name: 'decimals',
        },
      ]
      const [
        tokenBalanceLP,
        quoteTokenBlanceLP,
        lpTokenBalanceMC,
        lpTotalSupply,
        tokenDecimals,
        quoteTokenDecimals,
      ] = await multicall(erc20, calls)
      // Ratio in % a LP tokens that are in staking, vs the total number in circulation
      const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

      // Total value in staking in quote token value
      const lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
        .div(new BigNumber(10).pow(18))
        .times(new BigNumber(2))
        .times(lpTokenRatio)

      // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
      const tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals))

      const quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
        .div(new BigNumber(10).pow(quoteTokenDecimals))
        .times(lpTokenRatio)
      const [info, totalAllocPoint, _poolDeposit] = await multicall(masterchefMoneyABI, [
        {
          address: getMasterChefMoneyAddress(),
          name: 'poolInfo',
          params: [timepoolConfig.pid],
        },
        {
          address: getMasterChefMoneyAddress(),
          name: 'totalAllocPoint',
        },
        {
          address: getMasterChefMoneyAddress(),
          name: 'poolDeposit',
          params: [timepoolConfig.pid],
        },
      ])
      const allocPoint = new BigNumber(info.allocPoint._hex)
      const lockTime = new BigNumber(info.lockPeriod._hex);
      const poolDeposit = new BigNumber(_poolDeposit[0]._hex).div(new BigNumber(10).pow(tokenDecimals));
      const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))
        // console.log('pid=',timepoolConfig.pid, ' poolDeposit', poolDeposit.toString());
      return {
        ...timepoolConfig,
        tokenAmount: tokenAmount.toJSON(),
        quoteTokenAmount: quoteTokenAmount.toJSON(),
        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        tokenPriceVsQuote: quoteTokenAmount.div(tokenAmount).toJSON(),
        poolWeight: poolWeight.toJSON(),
        multiplier: `${allocPoint.div(100).toString()}X`,
        lockTime: lockTime.toJSON(),
        poolDeposit: poolDeposit.toJSON()
      }
    }),
  )
  return data
}

export default fetchTimepools
