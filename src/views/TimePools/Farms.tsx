import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Toggle, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import {useTimepools, usePriceMoneyBusd, usePriceBnbBusd} from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchTimepoolUserDataAsync } from 'state/actions'
import { Timepool } from 'state/types'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'
import { getFarmApy } from 'utils/apy'
import { orderBy } from 'lodash'

import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import FarmTabButtons from './components/FarmTabButtons'
import SearchInput from './components/SearchInput'
import { RowProps } from './components/FarmTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from './components/types'
import Select, { OptionProps } from './components/Select/Select'
import {QuoteToken} from "../../config/constants/types";

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
  }
`

const ToggleWrapper = styled.div`
  display: block;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;
  margin: auto;
  > div {
    // padding: 10px 20px;
    margin: auto;
    // padding-left: 75px;
    // padding-right: 75px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 80%;
  }


  ${({ theme }) => theme.mediaQueries.lg} {
    width: 80%;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 60%;
  }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

const Header = styled.div`
  align-items: center;
  // display: inline-block;
  width: 100%;
  // justify-content: center;
  // flex-direction: column;
  margin: auto;
  margin-top:27px;
  // padding-top: 116px;
  text-align: left;
  display:none;
  ${({ theme }) => theme.mediaQueries.xxl} {
    // height: 449px;
    padding-top: 0;
    display: inline-block;
  }
`
const HeadImg = styled.img`
  vertical-align: middle;
  width:30%;
  text-align: left;
  float:left;
  margin-left:-60px;
`
const HeadDiv = styled.div`

  ${({ theme }) => theme.mediaQueries.xl} {
    // height: 449px;
    padding-top: 0;
    // margin-top:-350px;
    & h2:first-child {
      color: #ae0108;
    }
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    margin-top:-450px;
    & h2:first-child {
      color: #ae0108;
    }
  }
  align-items: center;
  width: 100%;
  margin: auto;
  margin-top:100px;
  // padding-top: 116px;
  text-align: center;
  & h2:first-child {
    color: #ae0108;
  }
  & h2 {
    padding: 0px 20px;
  }

`

const HeadImg1 = styled.img`
  vertical-align: middle;
  width:22%;
  // margin-top: 135px;
  text-align: right;
  float:right;
  margin-right: 130px;
`
const BoxHeading = styled.div`
  background-image:none;  
  ${({ theme }) => theme.mediaQueries.sm} {
    background-image: url(/images/box-m.svg);
    padding-top: 55px;
    padding-bottom: 1px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    margin: auto;
    max-width: 825px;
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

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const TranslateString = useI18n()
  const farmsLP = useTimepools()
  const moneyPrice = usePriceMoneyBusd()
  const bnbPrice = usePriceBnbBusd()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState(ViewMode.CARD)
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    // if(currentTime.getTime() <=  +process.env.REACT_APP_END_COUNTDOWN ) {
      const interval= setInterval(() => setCurrentTime(new Date()), 1000);
      return () => {
        clearInterval(interval);
      }
    // }
  }, [])
  useEffect(() => {
    if (account) {
      dispatch(fetchTimepoolUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stackedOnly, setStackedOnly] = useState(false)

  const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => farm.multiplier === '0X')
  const stackedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
    switch (sortOption) {
      case 'apr':
        return orderBy(farms, 'apy', 'desc')
      case 'multiplier':
        return orderBy(
          farms,
          (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
          'desc',
        )
      case 'earned':
        return orderBy(farms, (farm: FarmWithStakedValue) => (farm.userData ? farm.userData.earnings : 0), 'desc')
      case 'liquidity':
        return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
      default:
        return farms
    }
  }

  const farmsList = useCallback(
    (farmsToDisplay: Timepool[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken) {
          return farm
        }

        let quoteTokenPriceUsd = new BigNumber( 1)
        if( farm.quoteToken.symbol === QuoteToken.BNB ){
          quoteTokenPriceUsd = quoteTokenPriceUsd.times(bnbPrice)
        }else if( farm.quoteToken.symbol === QuoteToken.BUSD ){
          quoteTokenPriceUsd = quoteTokenPriceUsd.times(1)
        }

        const totalLiquidity = new BigNumber(farm.poolDeposit)
        const apy = getFarmApy(farm.poolWeight, moneyPrice, totalLiquidity, 1.5)
        // if( farm.pid === 0 ) console.log('moneyPrice',farm.lpTotalInQuoteToken );
        // if( farm.pid === 0 ) console.log('moneyPrice',moneyPrice.toString() );
        // if( farm.pid === 0 ) console.log('totalLiquidity', totalLiquidity.toString() );
        // if( farm.pid === 0 ) console.log('api', apy);
        return { ...farm, apy, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = query.toLowerCase()
        farmsToDisplayWithAPY = farmsToDisplayWithAPY.filter((farm: FarmWithStakedValue) => {
          if (farm.lpSymbol.toLowerCase().includes(lowercaseQuery)) {
            return true
          }

          return false
        })
      }
      return farmsToDisplayWithAPY
    },
    [moneyPrice, query, bnbPrice],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const isActive = !pathname.includes('history')
  let farmsStaked = []
  if (isActive) {
    farmsStaked = stackedOnly ? farmsList(stackedOnlyFarms) : farmsList(activeFarms)
  } else {
    farmsStaked = farmsList(inactiveFarms)
  }

  farmsStaked = sortFarms(farmsStaked)

  const rowData = farmsStaked.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')

    const row: RowProps = {
      apr: {
        value: farm.apy && farm.apy.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        multiplier: farm.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        moneyPrice,
        originalValue: farm.apy,
      },
      farm: {
        image: farm.lpSymbol.split(' ')[0].toLocaleLowerCase(),
        label: lpLabel,
        pid: farm.pid,
      },
      earned: {
        earnings: farm.userData ? getBalanceNumber(new BigNumber(farm.userData.earnings)) : null,
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
      depositFee: {
        value: farm.depositFee
      },
      withdrawFee: {
        value: farm.withdrawFee
      }
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} />
    }

    return (
      <div>
        <FlexLayout>
          <Route exact path={`${path}`}>
            {farmsStaked.map((farm) => (
              <FarmCard key={farm.pid} farm={farm} moneyPrice={moneyPrice} account={account} removed={false} />
            ))}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsStaked.map((farm) => (
              <FarmCard key={farm.pid} farm={farm} moneyPrice={moneyPrice} account={account} removed />
            ))}
          </Route>
        </FlexLayout>
      </div>
    )
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  return (
    <>
      <Header>
        <HeadImg alt="hero" width="500px  " height="500px"  src="/images/hero.svg"/>

        <HeadImg1 alt="devilcoin" width="20px" height="330px" src="/images/rabbitboss.svg" />
      </Header>
      <HeadDiv>
          <BoxHeading>
            <Heading mb="20px" size='lg'>Stake $TIME earn $MONEY. After unlock your reward, 100% of your $TIME staked are burned when withdraw, <br/> IF YOU UNSTAKE BEFORE UNLOCK YOUR REWARD, <br/> 25% OF YOUR $TIME STAKED ARE BURNED and NO $MONEY REWARD EARNED.</Heading>
          </BoxHeading>
          <BoxHeading>
            <Heading mb="20px" size='lg'> CAUTION: After reward unlocked,<br/> user must unstake 100% of staked $TIME <br/> to earn $MONEY reward. (Harvest not allowed)</Heading>
          </BoxHeading>
          {/* <Heading mb="20px" size='xl'>MONEY Reward start 2 july 9pm UTC</Heading> */}
          <ControlContainer>
            <ViewControls>
              <ToggleWrapper>
                <Toggle checked={stackedOnly} onChange={() => setStackedOnly(!stackedOnly)} scale="lg" />
                <Text> {TranslateString(1116, 'Staked only')}</Text>
              </ToggleWrapper>
              <FarmTabButtons />
            </ViewControls>
          </ControlContainer>
      </HeadDiv>
      <Page>
        {renderContent()}
      </Page>
    </>
  )
}

export default Farms
