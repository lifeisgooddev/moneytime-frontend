import React, { useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, IconButton, AddIcon, MinusIcon, useModal, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useHarvestMoney, useHarvestSphn } from 'hooks/useHarvest'
import {useStakeMoney, useStakeSphn} from 'hooks/useStake'
import {useUnstakeMoney, useUnstakeSphn} from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWeb3React } from '@web3-react/core'
import { usePriceMoneyBusd, useMoneypoolUser } from 'state/hooks'

import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'

interface Address {
  97?: string
  56: string
}


interface Token {
  symbol: string
  address?: Address
  decimals?: number
  projectLink?: string
}

interface FarmCardActionsProps {
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  tokenName?: string
  pid?: number
  addLiquidityUrl?: string
  masterChef?: string
  earningToken?: Token
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
  masterChef,
  earningToken
}) => {
  const { account } = useWeb3React()
  const onStakeMoney = useStakeMoney(pid, "MONEY").onStake;
  const onStakeSphn = useStakeSphn(masterChef, "MONEY").onStake;
  const  onStake  = earningToken.symbol === "MONEY" ? onStakeMoney : onStakeSphn;
  const onUnstakeMoney = useUnstakeMoney(pid, "MONEY").onUnstake;
  const onUnstakeSphn = useUnstakeSphn(masterChef, "MONEY").onUnstake;
  const  onUnstake  = earningToken.symbol === "MONEY" ? onUnstakeMoney : onUnstakeSphn;

  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const onRewardMoney = useHarvestMoney(pid, "MONEY").onReward;
  const onRewardSphn = useHarvestSphn(masterChef, "MONEY").onReward;
  const onReward = earningToken.symbol === "MONEY" ? onRewardMoney: onRewardSphn;
  const { allowance } = useMoneypoolUser(pid)
  const rawEarningsBalance = account ? getBalanceNumber(earnings, earningToken.decimals) : 0
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
      <div>
      <IconButtonWrapper>
        <IconButton variant="tertiary" onClick={onPresentWithdraw} mr="6px">
          <MinusIcon color="primary" width="14px" />
        </IconButton>
        <IconButton variant="tertiary" onClick={onPresentDeposit}>
          <AddIcon color="primary" width="14px" />
        </IconButton>
      </IconButtonWrapper>
      <br/>
      { earningToken.symbol !== "MONEY" ? (
        <Button
          disabled={rawEarningsBalance === 0 || pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onReward()
            setPendingTx(false)
          }}
        >
          {TranslateString(562, 'Harvest')}
        </Button>
        ) : (<></>)
      }
      </div>
    )
  }

  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <div>
      <Heading size="xl" color="text">{displayBalance}</Heading>
      <Flex>
        <Text>{
            earningToken.symbol === "MONEY" ? (
             <>
             ~ {(rawEarningsBalance * moneyPrice.toNumber()).toFixed(3)} USD
             </>
             ) : (<></>)
            
          } </Text>
      </Flex>
      </div>
      {account && isApproved? renderStakingButtons(): ""}
    </Flex>
  )
}

export default HarvestAction
