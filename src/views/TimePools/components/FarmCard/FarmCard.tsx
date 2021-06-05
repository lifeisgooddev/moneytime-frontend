import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton } from '@pancakeswap-libs/uikit'
import { communityFarms } from 'config/constants'
import { Timepool } from 'state/types'
import { provider as ProviderType } from 'web3-core'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { useTimepoolFromSymbol, useTimepoolUser } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'

export interface FarmWithStakedValue extends Timepool {
  apy?: number
  liquidity?: BigNumber,
}

const RainbowLight = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 32px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div`
  align-self: baseline;
  // background: ${(props) => props.theme.card.background};
  background: rgb(254,251,214,0.95);
  border-radius: 32px;
  box-shadow: 0px 2px 12px -2px rgba(0,0,0), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  moneyPrice?: BigNumber
  provider?: ProviderType
  account?: string
}

const calculateRemainingTime = (time:any, lockPeriod:any) => {
  console.log(time);
  if(time === "0")
    return `?d ?h ?m`;
  const harvestTimeStamp = parseInt(time)*1000 + parseInt(lockPeriod)*1000; 
  const untilHarvest:any = new Date(harvestTimeStamp);
  const currentTime:any = new Date();
  if(currentTime >= untilHarvest)
    return `0d 0h 0m`;
  const totalSeconds     = Math.floor((untilHarvest - currentTime)/1000);
  const totalMinutes     = Math.floor(totalSeconds/60);
  const totalHours       = Math.floor(totalMinutes/60);
  const totalDays        = Math.floor(totalHours/24);

  const hours   = totalHours - ( totalDays * 24 );
  const minutes = totalMinutes - ( totalDays * 24 * 60 ) - ( hours * 60 );

  return `${totalDays}d ${hours}h ${minutes}m`;
}
const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, moneyPrice, account }) => {
  const TranslateString = useI18n()
  // const { pid } = useTimepoolFromSymbol(farm.lpSymbol)
  const pid = farm.pid;
  const { allowance, tokenBalance, stakedBalance, earnings } = useTimepoolUser(pid)

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const isCommunityFarm = communityFarms.includes(farm.token.symbol)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  const farmImage = farm.lockPeriod.split(' ')[1].toLocaleLowerCase().replace('s','');

  const totalValueFormated = farm.liquidity
    ? `$${farm.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const lpLabel = farm.lockPeriod;
  const earnLabel = farm.dual ? farm.dual.earnLabel : 'TIME'

  const farmAPY = farm.apy && farm.apy.toLocaleString('en-US', { maximumFractionDigits: 2 })

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: farm.quoteToken.address,
    tokenAddress: farm.token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayBalance = rawStakedBalance.toLocaleString()
  return (
    <FCard>
      <CardHeading
        lpLabel={lpLabel}
        multiplier={farm.multiplier}
        isCommunityFarm={isCommunityFarm}
        farmImage={farmImage}
        tokenSymbol={farm.token.symbol}
      />
      {!removed && (
        <Flex justifyContent="space-between" alignItems="center">
          <Text>{TranslateString(736, 'APR')}:</Text>
          <Text bold style={{ display: 'flex', alignItems: 'center' }}>
            {farm.apy ? (
              <>
                <ApyButton lpLabel={lpLabel} addLiquidityUrl={addLiquidityUrl} moneyPrice={moneyPrice} apy={farm.apy} />
                {farmAPY}%
              </>
            ) : (
              <Skeleton height={24} width={80} />
            )}
          </Text>
        </Flex>
      )}
      <Flex justifyContent="space-between">
        <Text>{TranslateString(318, 'Your stake')}:</Text>
        <Text>{displayBalance} {farm.lpSymbol}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>{TranslateString(318, 'Remaining lock period')}:</Text>
        <Text>{farm.userData ? calculateRemainingTime(farm.userData.depositTime, farm.lockTime) : "--/--/--"}</Text>
      </Flex>
      <CardActionsContainer farm={farm} account={account} addLiquidityUrl={addLiquidityUrl} />
      <Divider />
      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          removed={removed}
          bscScanAddress={`https://bscscan.com/address/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`}
          totalValueFormated={totalValueFormated}
          lpLabel={lpLabel}
          addLiquidityUrl={addLiquidityUrl}
        />
      </ExpandingWrapper>
    </FCard>
  )
}

export default FarmCard
