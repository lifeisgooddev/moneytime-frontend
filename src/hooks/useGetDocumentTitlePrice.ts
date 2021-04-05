import { useEffect } from 'react'
import { usePriceMoneyBusd } from 'state/hooks'

const useGetDocumentTitlePrice = () => {
  const moneyPriceUsd = usePriceMoneyBusd()

  const moneyPriceUsdString = moneyPriceUsd.eq(0)
    ? ''
    : ` - $${moneyPriceUsd.toNumber().toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      })}`

  useEffect(() => {
    document.title = `PancakeSwap${moneyPriceUsdString}`
  }, [moneyPriceUsdString])
}
export default useGetDocumentTitlePrice
