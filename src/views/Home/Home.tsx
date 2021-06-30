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
  margin: auto;
  
  padding-top: 60px;
  text-align: center;
  margin-left : 0px;
  ${({ theme }) => theme.mediaQueries.xl} {
    // height: 449px;
    padding-top: 0px;
    margin-left : -60px;
  }
`
const HeadImg = styled.img`
  vertical-align: middle;
  width:33%;
  display: none;
  ${({ theme }) => theme.mediaQueries.xl} {
    display: unset;
  }
`

const HeadImg1 = styled.img`
  vertical-align: middle;
  width: 90%;
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 33%;
  }
`

const HeadImg2 = styled.img`
  vertical-align: middle;
  width:33%;
  margin-top: -140px;
  height: 420px;
  display: none;
  ${({ theme }) => theme.mediaQueries.xl} {
    display: unset;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;
  margin-top: 50px;
  & > div {
    grid-column: span 12;
    width: 100%;
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

  ${({ theme }) => theme.mediaQueries.xl} {
    & > div {
      grid-column: span 6;
    }
    margin-top: -100px;
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
        <div>
          <Heading mt="20px" size='lg'>Using Smart Contracts, Tokens, and Crypto is always a risk. DYOR before investing.</Heading>
        </div>
        <HeadImg alt="hero" src="/images/hero.svg"/>
        <HeadImg1 alt="logo" src="/images/MoneytimeLogo.svg"/>
        <HeadImg2 alt="devilcoin" src="/images/devilcoins.svg"/>
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
