import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button,BaseLayout } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import MoneyHarvestBalance from './MoneyHarvestBalance'
import MoneyLockedBalance from './MoneyLockedBalance'
import TimeHarvestBalance from './TimeHarvestBalance'
import MoneyWalletBalance from './MoneyWalletBalance'
import TimeWalletBalance from './TimeWalletBalance'

const StyledFarmStakingCard = styled(Card)`
  background: ${({ theme }) => theme.colors.card};
  background-repeat: no-repeat;
  background-position: top right;
  padding-left:10px;
  padding-right:10px;
  // min-height: 376px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-left:30px;
    padding-right:30px;
  }
`

const Block = styled.div`
  margin-bottom: 16px;
  grid-column: span 3;
`

const CardImage = styled.img`
  padding-left : 40px;
  padding-right : 40px;
  display: none;
  ${({ theme }) => theme.mediaQueries.md} {
    display: unset;
  }
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 20px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const CardDiv = styled(BaseLayout)`

  text-align : left;

  & > div {
    grid-column: span 6;
  }
  & > img {
    grid-column: span 6;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 4;
    }
  }
  ${({ theme }) => theme.mediaQueries.md} {
    & > div {
      grid-column: span 6;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
  
`
const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="xxl" mb="24px">
          {TranslateString(542, 'Dashboard')}
        </Heading>
        <CardDiv>
          <CardImage src="/images/moneycoin.svg" alt="cake logo" />
          <div>
            <Block>
              <MoneyHarvestBalance />
              <Label>{TranslateString(544, 'MONEY to Harvest')}:</Label>
            </Block>
            <Block>
              <MoneyLockedBalance />
              <Label>{TranslateString(544, 'MONEY to Locked')}:</Label>
            </Block>
            <Block>
              <MoneyWalletBalance />
              <Label>{TranslateString(546, 'MONEY in Wallet')}:</Label>
            </Block>
          </div>
          <CardImage src="/images/timecoin.svg" alt="cake logo" />
          <div>
            <Block>
              <TimeHarvestBalance />
              <Label>{TranslateString(544, 'TIME to Harvest')}:</Label>
            </Block>
            <Block>
              <TimeWalletBalance />
              <Label>{TranslateString(546, 'TIME in Wallet')}:</Label>
            </Block>
            <Actions>
              {account ? (
                <Button
                  id="harvest-all"
                  disabled={balancesWithValue.length <= 0 || pendingTx}
                  onClick={harvestAllFarms}
                  width="100%"
                >
                  {pendingTx
                    ? TranslateString(548, 'Collecting CAKE')
                    : TranslateString(532, `Harvest all (${balancesWithValue.length})`, {
                        count: balancesWithValue.length,
                      })}
                </Button>
              ) : (
                <UnlockButton width="100%" />
              )}
            </Actions>
          </div>
        </CardDiv>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
