import React, { useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, IconButton, AddIcon, MinusIcon, useModal, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import {useStakeMoney} from 'hooks/useStake'

import {useUnstakeMoney} from 'hooks/useUnstake'
import { useHarvestMoney } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceMoneyBusd } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'


import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'

interface FarmCardActionsProps {
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  tokenName?: string
  pid?: number
  addLiquidityUrl?: string
}

interface FarmCardActionsProps {
  earnings?: BigNumber[]
  pid?: number
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

const HarvestAction: React.FC<FarmCardActionsProps> = ({ 
  earnings, 
  pid,
  stakedBalance,
  tokenBalance,
  tokenName,
  addLiquidityUrl,
}) => {
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestMoney(pid, "TIME")

  const { onStake } = useStakeMoney(pid, "TIME")
  const { onUnstake } = useUnstakeMoney(pid, "TIME")

  const rawEarningsBalance = account ? getBalanceNumber(earnings[0]) : 0
  const displayBalance = rawEarningsBalance.toLocaleString()

  const busdRewardBalance = account ? getBalanceNumber(earnings[1]) : 0
  const busdDisplayBalance = busdRewardBalance.toLocaleString()

  const moneyPrice = usePriceMoneyBusd();
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={onStake} tokenName={tokenName} addLiquidityUrl={addLiquidityUrl} />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={tokenName} />,
  )

  const renderStakingButtons = () => {
    return rawStakedBalance === 0 ? (
      <Button onClick={onPresentDeposit}>{TranslateString(999, 'Stake TIME')}</Button>
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
        <Text>{rawEarningsBalance === 0 ?
           0 : 
           (
             <>
             ~ {(rawEarningsBalance * moneyPrice.toNumber()).toFixed(3)}
             </>
            )
          } USD</Text>
        <Flex>
          <Text bold textTransform="uppercase" color="text" fontSize="20px" pr="3px">
            {/* TODO: Is there a way to get a dynamic value here from useFarmFromSymbol? */}
            Money
          </Text>
          <Text color="text" fontSize="18px">
            {TranslateString(1072, 'earned')}
          </Text>
        </Flex>
        {pid > 3 ? 
          <>
          <Heading size="xl" color="text">{busdDisplayBalance}</Heading>
          <Flex>
            <Text bold textTransform="uppercase" color="text" fontSize="20px" pr="3px">
              {/* TODO: Is there a way to get a dynamic value here from useFarmFromSymbol? */}
              Busd
            </Text>
            <Text color="text" fontSize="18px">
              {TranslateString(1072, 'earned')}
            </Text>
          </Flex>
          </>
         : ""
         }
        

      
      </div>
      {account ? renderStakingButtons() : ""}
    </Flex>
  )
}

export default HarvestAction
