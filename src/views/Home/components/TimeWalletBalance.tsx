import React from 'react'
import { Text } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getTimeAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceMoneyBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const TimeWalletBalance = () => {
  const TranslateString = useI18n()
  const timeBalance = useTokenBalance(getTimeAddress())
  const busdBalance = new BigNumber(getBalanceNumber(timeBalance)).multipliedBy(usePriceMoneyBusd()).toNumber()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '54px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={getBalanceNumber(timeBalance)} decimals={4} fontSize="24px" lineHeight="36px" />
      {/* <CardBusdValue value={busdBalance} /> */}
    </>
  )
}

export default TimeWalletBalance
