import BigNumber from 'bignumber.js'
import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceMoneyBusd, usePriceBnbBusd} from 'state/hooks'
import { State} from '../state/types'
import useRefresh from './useRefresh'


const useTVL = () => {
  const [balances, setBalance] = useState(0)
  const { fastRefresh } = useRefresh()
  const bnbPrice = usePriceBnbBusd()
  const moneyPrice = usePriceMoneyBusd()
  const farms = useSelector((state: State) => state.farms.data)
  const pools = useSelector((state: State) => state.pools.data)
  const moneyPool = useSelector((state: State) => state.moneypools.data)

  const calcTvl = useCallback(() => {
    let totalLiquidity = new BigNumber(0);
    farms.map((farm) => {
      if(farm.lpTotalInQuoteToken && farm.lpTotalInQuoteToken.toString() !== "NaN") {
        let quoteTokenPriceUsd = new BigNumber( 1)
        if( farm.quoteToken.symbol === 'WBNB' ){
          quoteTokenPriceUsd = quoteTokenPriceUsd.times(bnbPrice)
        }else if( farm.quoteToken.symbol === "BUSD" ){
          quoteTokenPriceUsd = quoteTokenPriceUsd.times(1)
        }
        totalLiquidity = totalLiquidity.plus(new BigNumber(farm.lpTotalInQuoteToken).times(quoteTokenPriceUsd))
      }
      return true;
    })
    pools.map(pool => {
      
      const lpSymbol = pool.stakingToken.symbol.concat("-BNB LP");
      const farm = farms.find((f) => f.lpSymbol === lpSymbol)
      if(pool.stakingToken.symbol === "WBNB"){
        totalLiquidity = totalLiquidity.plus(getBalanceNumber(bnbPrice.times(pool.totalStaked), pool.stakingToken.decimals))
      }

      else if(pool.stableCoin) {
        totalLiquidity = totalLiquidity.plus(getBalanceNumber(pool.totalStaked, pool.stakingToken.decimals))
      }
      else { 
        const tokenPrice = farm.tokenPriceVsQuote ? bnbPrice.times(farm.tokenPriceVsQuote) : new BigNumber(0)
        totalLiquidity = totalLiquidity.plus(getBalanceNumber(tokenPrice.times(pool.totalStaked), pool.stakingToken.decimals))
      }
      return true
    })

    moneyPool.map((pool) => {
      totalLiquidity = totalLiquidity.plus(new BigNumber(pool.poolDeposit).times(moneyPrice))
      return true;
    })
    setBalance(totalLiquidity.toNumber());
  }, [farms, bnbPrice, pools, moneyPool, moneyPrice])

  

  useEffect(() => {
    calcTvl();
  }, [fastRefresh, calcTvl])

  return balances
}

export default useTVL
