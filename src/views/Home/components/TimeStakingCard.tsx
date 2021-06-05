import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button,BaseLayout } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'

const StyledFarmStakingCard = styled(Card)`
  background-color: rgb(254,251,214,0.95);
  background-repeat: no-repeat;
  background-position: top right;
  padding-left:30px;
  padding-right:30px;
  // min-height: 376px;
`

const Block = styled.div`
  margin-bottom: 16px;
  grid-column: span 3;
`

const CardImage = styled.img`
  padding-left : 40px;
  padding-right : 40px;
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
      grid-column: span 6;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`
const TimeStakingCard = () => {
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
        <CardDiv>
          <CardImage src="/images/timecoin.svg" alt="cake logo" />
          <div>
            <Block>
              <CakeHarvestBalance />
              <Label>{TranslateString(544, 'MONEY to Harvest')}:</Label>
            </Block>
            <Block>
              <CakeWalletBalance />
              <Label>{TranslateString(546, 'MONEY in Wallet')}:</Label>
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

export default TimeStakingCard
