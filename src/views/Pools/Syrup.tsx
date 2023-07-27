import React, { useState, useMemo, useEffect } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Heading } from '@pancakeswap-libs/uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import { usePools, useBlock } from 'state/hooks'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import Coming from './components/Coming'
import PoolCard from './components/PoolCard'
import PoolTabButtons from './components/PoolTabButtons'
import Divider from './components/Divider'



const Header = styled.div`
  align-items: center;
  display: none;
  width: 100%;
  // justify-content: center;
  // flex-direction: column;
  margin: auto;
  margin-top:27px;
  // padding-top: 116px;
  text-align: left;
  ${({ theme }) => theme.mediaQueries.xxl} {
    // height: 449px;
    padding-top: 0;
    display: inline-block;
  }
`
const HeadImg = styled.img`
  vertical-align: middle;
  width:25%;
  text-align: left;
  float:left;
`
const HeadDiv = styled.div`
align-items: center;
width: 100%;
margin: auto;
margin-top:100px;
// padding-top: 116px;
text-align: center;
& h2:first-child {
  color: #ae0108;
}

${({ theme }) => theme.mediaQueries.xxl} {
  margin-top:-395px;
}


`

const HeadImg1 = styled.img`
  vertical-align: middle;
  width:25%;
  text-align: right;
  float:right;
`
const BoxHeading = styled.div`
  background-image:none;  
  ${({ theme }) => theme.mediaQueries.sm} {
    background-image: url(/images/box.svg);
    padding-top: 25px;
    padding-bottom: 1px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    margin: auto;
    max-width: 735px;
  }
`

const calculateRemainingTime = (startTime:any, endTime:any) => {
  if(endTime <= startTime)
    return `0h 0m 0s`;
  const totalSeconds     =  Math.floor((endTime - startTime)/1000);
  const totalMinutes     = Math.floor(totalSeconds/60);
  const totalHours       = Math.floor(totalMinutes/60);

  const minutes = totalMinutes - ( totalHours * 60 );
  const seconds = totalSeconds - ( totalMinutes * 60 );

  return `${totalHours}h ${minutes}m ${seconds}s`;
}

const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const pools = usePools(account)
  const { blockNumber } = useBlock()
  const [stackedOnly, setStackedOnly] = useState(false)

  const [finishedPools, openPools] = useMemo(
    () => partition(pools, (pool) => pool.isFinished || blockNumber > pool.endBlock),
    [blockNumber, pools],
  )
  const stackedOnlyPools = useMemo(
    () => openPools.filter((pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)),
    [openPools],
  )

  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    // if(currentTime.getTime() <=  +process.env.REACT_APP_END_COUNTDOWN ) {
      const interval= setInterval(() => setCurrentTime(new Date()), 1000);
      return () => {
        clearInterval(interval);
      }
    // }
  }, [])

  return (
    <Page>
      <Header>
        <HeadImg alt="hero" width="400px  " height="400px"  src="/images/casinochip.svg"/>

        <HeadImg1 alt="devilcoin" width="330px" height="330px" src="/images/casinochip.svg" />
      </Header>
      <HeadDiv>
          <BoxHeading>
            <Heading mb="20px" size='lg'>Stake tokens to earn MONEY & TIME</Heading>
          </BoxHeading>
          <BoxHeading>
            <></>
            <Heading mb="20px" size='lg'>Deposit Fee will be used to buyback MONEY</Heading>
          </BoxHeading>
      </HeadDiv>
      <PoolTabButtons stackedOnly={stackedOnly} setStackedOnly={setStackedOnly} />
      <FlexLayout>
        <Route exact path={`${path}`}>
          <>
            {stackedOnly
              ? orderBy(stackedOnlyPools, ['sortOrder']).map((pool) => <PoolCard key={pool.uuid} pool={pool} />)
              : orderBy(openPools, ['sortOrder']).map((pool) => <PoolCard key={pool.uuid} pool={pool} />)}
          </>
        </Route>
        <Route path={`${path}/history`}>
          {orderBy(finishedPools, ['sortOrder']).map((pool) => (
            <PoolCard key={pool.uuid} pool={pool} />
          ))}
        </Route>
      </FlexLayout>
    </Page>
  )
}

export default Farm
