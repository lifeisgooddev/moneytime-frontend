import React, { useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, IconButton, AddIcon, MinusIcon, useModal, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useHarvestMoney } from 'hooks/useHarvest'
import {useStakeMoney} from 'hooks/useStake'
import {useUnstakeMoney} from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWeb3React } from '@web3-react/core'
import { usePriceMoneyBusd, useMoneypoolUser } from 'state/hooks'

import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'

interface FarmCardActionsProps {
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  tokenName?: string
  pid?: number
  addLiquidityUrl?: string
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({
  earnings, 
  pid,
  stakedBalance,
  tokenBalance,
  tokenName,
  addLiquidityUrl,
}) => {
  const { account } = useWeb3React()
  const { onStake } = useStakeMoney(pid, "MONEY")
  const { onUnstake } = useUnstakeMoney(pid, "MONEY")

  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestMoney(pid, "MONEY")
  const { allowance } = useMoneypoolUser(pid)
  const rawEarningsBalance = account ? getBalanceNumber(earnings) : 0
  const displayBalance = rawEarningsBalance.toLocaleString()
  const moneyPrice = usePriceMoneyBusd();

  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={onStake} tokenName={tokenName} addLiquidityUrl={addLiquidityUrl} />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={tokenName} />,
  )

  const renderStakingButtons = () => {
    return rawStakedBalance === 0 ? (
      <Button onClick={onPresentDeposit}>{TranslateString(999, 'Stake MONEY')}</Button>
    ) : (
      <IconButtonWrapper>
        <IconButton variant="tertiary" onClick={onPresentWithdraw} mr="6px">
          <MinusIcon color="primary" width="14px" />
        </IconButton>
        <IconButton variant="tertiary" onClick={onPresentDeposit}>
          <AddIcon color="primary" width="14px" />
        </IconButton>
      </IconButtonWrapper>
    )
  }

  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <div>
      <Heading size="xl" color="text">{displayBalance}</Heading>
      <Flex>
        <Text>{rawEarningsBalance === 0 ?
           0 : 
           (
             <>
             ~ {(rawEarningsBalance * moneyPrice.toNumber()).toFixed(3)}
             </>
            )
          } USD</Text>
      </Flex>
      </div>
      {account && isApproved? renderStakingButtons(): ""}
    </Flex>
  )
}

export default HarvestAction
