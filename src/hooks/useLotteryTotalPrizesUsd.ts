import { usePriceMoneyBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalCake = getBalanceNumber(totalRewards)
  const moneyPriceBusd = usePriceMoneyBusd()

  return totalCake * moneyPriceBusd.toNumber()
}

export default useLotteryTotalPrizesUsd
