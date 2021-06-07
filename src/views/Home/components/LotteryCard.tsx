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
  padding-left:30px;
  min-height: 376px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  padding-left : 60px;
  padding-right : 60px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 20px;
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
          <CardImage src="/images/casinochip.svg" alt="cake logo"/>
        </CardDiv>
        <Block>
          <Label>{TranslateString(554, 'Total Market Cap __________________________________________ $2,881,022')}</Label>
          <Label>{TranslateString(554, 'Total MONEY burned _______________________________________ 14,480')}</Label>
          <Label>{TranslateString(554, 'Total MONEY per block _____________________________________ 1.25')}</Label>
        </Block>
        <Block>
          <Label>{TranslateString(554, 'Total Market Cap __________________________________________ $2,881,022')}</Label>
          <Label>{TranslateString(554, 'Total TIME burned _______________________________________ 14,480')}</Label>
          <Label>{TranslateString(554, 'Total TIME per block _____________________________________ 1.25')}</Label>
        </Block>
      </CardBody>
    </StyledLotteryCard>
  )
}

export default FarmedStakingCard
