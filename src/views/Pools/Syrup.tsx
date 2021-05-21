import React, { useState, useMemo } from 'react'
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
  display: inline-block;
  width: 100%;
  // justify-content: center;
  // flex-direction: column;
  margin: auto;
  margin-top:27px;
  // padding-top: 116px;
  text-align: left;
  ${({ theme }) => theme.mediaQueries.lg} {
    // height: 449px;
    padding-top: 0;
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
margin-top:-235px;
// padding-top: 116px;
text-align: center;
${({ theme }) => theme.mediaQueries.lg} {
  // height: 449px;
  padding-top: 0;
}
`

const HeadImg1 = styled.img`
  vertical-align: middle;
  width:25%;
  text-align: right;
  float:right;
`


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

  return (
    <Page>
      <Header>
        <HeadImg alt="hero" width="400px  " height="400px"  src="/images/casinochip.svg"/>
        
        <HeadImg1 alt="devilcoin" width="330px" height="330px" src="/images/casinochip.svg" />
      </Header>
      <HeadDiv> 
          <Heading mb="4px" size='xl'>Stake LP tokens to earn MONEY</Heading>
          <Heading mb="4px" size='xl'>Deposit Fee will be used to buyback MONEY</Heading>
      </HeadDiv>
      <PoolTabButtons stackedOnly={stackedOnly} setStackedOnly={setStackedOnly} />
      <FlexLayout>
        <Route exact path={`${path}`}>
          <>
            {stackedOnly
              ? orderBy(stackedOnlyPools, ['sortOrder']).map((pool) => <PoolCard key={pool.pId} pool={pool} />)
              : orderBy(openPools, ['sortOrder']).map((pool) => <PoolCard key={pool.pId} pool={pool} />)}
          </>
        </Route>
        <Route path={`${path}/history`}>
          {orderBy(finishedPools, ['sortOrder']).map((pool) => (
            <PoolCard key={pool.pId} pool={pool} />
          ))}
        </Route>
      </FlexLayout>
    </Page>
  )
}

export default Farm
