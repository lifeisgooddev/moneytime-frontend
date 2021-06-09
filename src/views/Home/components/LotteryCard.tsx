import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, useModal, BaseLayout } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import { getCakeAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import useTokenBalance from 'hooks/useTokenBalance'
import { useMultiClaimLottery } from 'hooks/useBuyLottery'
import { useTotalClaim } from 'hooks/useTickets'
import BuyModal from 'views/Lottery/components/TicketCard/BuyTicketModal'
import { useLotteryAllowance } from 'hooks/useAllowance'
import { useApproval } from 'hooks/useApproval'
import PurchaseWarningModal from 'views/Lottery/components/TicketCard/PurchaseWarningModal'
import CakeWinnings from './CakeWinnings'
import LotteryJackpot from './LotteryJackpot'
import UnlockButton from '../../../components/UnlockButton'

const StyledLotteryCard = styled(Card)`
  background: ${({ theme }) => theme.colors.card};
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
  // padding-left:10px;
  // padding-:10px;
  // min-height: 376px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-left:30px;
  }
`

const Block = styled.div`
  margin-top: 16px;
  padding-right: 16px;
  display: inline-block;
  width : 100%;
  & div:first-child{
    float: left;
  }
  & div:last-child{
    float: right;
  }
`

const CardImage = styled.img`
  padding-left : 60px;
  padding-right : 60px;
  display: none;
  ${({ theme }) => theme.mediaQueries.md} {
    display: unset;
  }
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 16px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 25px;
  }
`

const Actions = styled.div`
  display: flex;
  margin-top: 24px;
  button {
    flex: 1 0 50%;
  }
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

const FarmedStakingCard = () => {
  const { account } = useWeb3React()
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const [requesteClaim, setRequestedClaim] = useState(false)
  const TranslateString = useI18n()
  const allowance = useLotteryAllowance()
  const [onPresentApprove] = useModal(<PurchaseWarningModal />)
  const { claimAmount } = useTotalClaim()
  const { onMultiClaim } = useMultiClaimLottery()
  const cakeBalance = useTokenBalance(getCakeAddress())
  const { handleApprove, requestedApproval } = useApproval(onPresentApprove)

  const handleClaim = useCallback(async () => {
    try {
      setRequestedClaim(true)
      const txHash = await onMultiClaim()
      // user rejected tx or didn't go thru
      if (txHash) {
        setRequestedClaim(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onMultiClaim, setRequestedClaim])

  const [onPresentBuy] = useModal(<BuyModal max={cakeBalance} tokenName="CAKE" />)

  return (
    <StyledLotteryCard>
      <CardBody>
        <CardDiv>
          <div>
            <Heading size="xxl" mb="24px">
              {TranslateString(550, 'Stats')}
            </Heading>
            
          </div>
          <CardImage src="/images/casinochip.svg" alt="cake logo"/>
        </CardDiv>
        <Block>
          <Label>{TranslateString(554, 'Money Supply')}</Label>
          <Label>{TranslateString(554, '$2,881,022')}</Label>
        </Block>
        <Block>
          <Label>{TranslateString(554, 'Total Money Market Cap')}</Label>
          <Label>{TranslateString(554, '$2,881,022')}</Label>
        </Block>
        <Block>
          <Label>{TranslateString(554, 'Total MONEY burned')}</Label>
          <Label>{TranslateString(554, '$2,881,022')}</Label>
        </Block>
        <Block>
          <Label>{TranslateString(554, 'Total MONEY per block')}</Label>
          <Label>{TranslateString(554, '$2,881,022')}</Label>
        </Block>

        <Block>
          <Label>{TranslateString(554, 'Total TIME Supply')}</Label>
          <Label>{TranslateString(554, '$2,881,022')}</Label>
        </Block>
        <Block>
          <Label>{TranslateString(554, 'Total TIME burned')}</Label>
          <Label>{TranslateString(554, '$2,881,022')}</Label>
        </Block>
        <Block>
          <Label>{TranslateString(554, 'Total TIME per block')}</Label>
          <Label>{TranslateString(554, '$2,881,022')}</Label>
        </Block>
      </CardBody>
    </StyledLotteryCard>
  )
}

export default FarmedStakingCard
