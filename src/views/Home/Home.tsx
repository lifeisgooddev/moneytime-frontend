import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import LotteryCard from 'views/Home/components/LotteryCard'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import WinCard from 'views/Home/components/WinCard'

const Hero = styled.div`
  align-items: center;
  display: inline-block;
  width: 100%;
  // justify-content: center;
  // flex-direction: column;
  margin: auto;
  // margin-bottom: 32px;
  margin-bottom: -180px;
  // padding-top: 116px;
  text-align: center;
  margin-left : -60px;
  ${({ theme }) => theme.mediaQueries.lg} {
    // height: 449px;
    padding-top: 0;
  }
`
const HeadImg = styled.img`
  vertical-align: middle;
  width:33%;
`

const HeadImg1 = styled.img`
  vertical-align: middle;
  width:33%;
  margin-top: -140px;
  height: 420px;
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;
  
  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled(BaseLayout)`

  text-align : right;
  margin-bottom: 32px;

  & > div {
    grid-column: span 12;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 12;
    }
  }
`
const CardImage = styled.img`
  margin-bottom: 16px;
  float : right;
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Hero>
        <HeadImg alt="hero" src="/images/hero.svg"/>
        <HeadImg alt="logo" src="/images/MoneytimeLogo.svg"/>
        <HeadImg1 alt="devilcoin" src="/images/devilcoins.svg"/>
      </Hero>
      <div>
        <Cards>
          <FarmStakingCard />
          <LotteryCard />
        </Cards>
        <CTACards>
          <TotalValueLockedCard />
        </CTACards>
      </div>
    </Page>
  )
}

export default Home
