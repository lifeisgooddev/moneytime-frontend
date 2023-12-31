import React from 'react'
import MetaLabel from './MetaLabel'

interface BalanceInUsdProps {
  token: string
  balance: number
}

const BalanceInUsd: React.FC<BalanceInUsdProps> = ({ token, balance }) => {
  const priceInUsd = 1; // prices
  const hasBalance = !!priceInUsd && balance > 0
  const total = priceInUsd * balance

  return (
    <MetaLabel>
      {hasBalance && `~$${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
    </MetaLabel>
  )
}

export default BalanceInUsd
