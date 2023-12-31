import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton, useModal, AddIcon, Image, Tag, Text, Flex, Heading } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import Label from 'components/Label'
import { useERC20 } from 'hooks/useContract'
import { useApprove } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useStake } from 'hooks/useStake'
import { useUnstake } from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import { getPoolApy, getFarmApy } from 'utils/apy'
import { getAddress } from 'utils/addressHelpers'
import { useHarvest } from 'hooks/useHarvest'
import Balance from 'components/Balance'
import { PoolCategory } from 'config/constants/types'
import tokens from 'config/constants/tokens'
import { Pool } from 'state/types'
import { usePriceMoneyBusd, usePriceBnbBusd, usePriceTimeBusd, usePricePool } from 'state/hooks'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import CompoundModal from './CompoundModal'
import CardTitle from './CardTitle'
import Card from './Card'
import OldSyrupTitle from './OldSyrupTitle'
import HarvestButton from './HarvestButton'
import CardFooter from './CardFooter'


interface HarvestProps {
  pool: Pool
}

const MultiplierTag = styled(Tag)`
  float: right;
  margin-right: 4px;
`

const PoolCard: React.FC<HarvestProps> = ({ pool }) => {
  const {
    uuid,
    pId,
    stakingToken,
    earningToken,
    harvest,
    poolCategory,
    totalStaked,
    startBlock,
    endBlock,
    isFinished,
    userData,
    stakingLimit,
  } = pool
  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const TranslateString = useI18n()
  const stakingTokenContract = useERC20(stakingToken.address ? getAddress(stakingToken.address) : '')
  const masterchefAddress = getAddress(pool.contractAddress)
  const { account } = useWeb3React()
  const { onApprove } = useApprove(masterchefAddress, stakingTokenContract, uuid)
  const { onStake } = useStake(pId, masterchefAddress, uuid)
  const { onUnstake } = useUnstake(pId, masterchefAddress, uuid)
  const { onReward } = useHarvest(pId, masterchefAddress, uuid)

  // APY
  const moneyPrice = usePriceMoneyBusd();// prices useGetApiPrice(earningToken.symbol)
  const timePrice = usePriceTimeBusd();
  const stakingTokenPrice = usePricePool(uuid);
  const totalStakedUsd = stakingTokenPrice?stakingTokenPrice.times(totalStaked) : new BigNumber(0);
  const apy = earningToken.symbol === "TIME" ? getFarmApy(
    pool.poolWeight,
    timePrice,
    new BigNumber(getBalanceNumber(pool.totalStaked, stakingToken.decimals)).times(stakingTokenPrice),
    0.5,
  ) :  getFarmApy(
    pool.poolWeight,
    moneyPrice,
    new BigNumber(getBalanceNumber(pool.totalStaked, stakingToken.decimals)).times(stakingTokenPrice),
    1.5,
  )
  // if(pId===6) console.log(pId, 'moneyPrice=', moneyPrice, ' apy=', apy,
  //     ' totalStaked', pool.totalStaked);
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)
  const isOldSyrup = stakingToken.symbol === tokens.cake.symbol
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool

  // console.log(accountHasStakedBalance,allowance.toNumber(), isBnbPool, stakingToken.symbol);
  const isCardActive = isFinished && accountHasStakedBalance

  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(earningToken.decimals))
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingToken.symbol} (${stakingLimit} max)` : stakingToken.symbol}
      stakingTokenDecimals={stakingToken.decimals}
    />,
  )

  const [onPresentCompound] = useModal(
    <CompoundModal earnings={earnings} onConfirm={onStake} tokenName={stakingToken.symbol} />,
  )
  const poolImage = `${pool.earningToken.symbol}.svg`.toLocaleLowerCase()
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={stakingToken.symbol}
      stakingTokenDecimals={stakingToken.decimals}
    />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])


  
  return (
    <Card isActive={isCardActive} isFinished={isFinished && pId !== 0}>
      {isFinished && pId !== 0 && <PoolFinishedSash />}
      <div style={{ padding: '24px' }}>
        {/* {earningToken.symbol === "MONEY" ?<Heading mb="20px" size='xl'>MONEY Reward start 2 july 9pm UTC</Heading> : <></>} */}
        
        <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
          <Image src={`/images/farms/${stakingToken.symbol.toLocaleLowerCase()}.svg`} alt={earningToken.symbol} width={150} height={150} />
          <Flex flexDirection="column" alignItems="flex-end">
            {earningToken.symbol === "MONEY" ? 
              <Heading mb="4px" size='xl' style={{color: "#39c36f"}}>{stakingToken.symbol}</Heading>
              :
              <Heading mb="4px" size='xl'  style={{color: "#00e8ff"}}>{stakingToken.symbol}</Heading>
            } 
            <Flex justifyContent="center">
              {
                !pool.isPartner ? (
                  <MultiplierTag variant="backgroundRed">{pool.tokenPerBlock}X</MultiplierTag>
                ) : (
                  <Text textAlign="right">For {pool.period} weeks only <br/> {pool.rewardCount} TIME to be distributed </Text>
                )
              } 
            </Flex>
            
          </Flex>
        </Wrapper>
        {/* <CardTitle isFinished={isFinished && pId !== 0}>
          {earningToken.symbol} {TranslateString(348, 'Pool')}
          <MultiplierTag variant="secondary">10x</MultiplierTag>
        </CardTitle>

        <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <Image src={`/images/pools/${poolImage}`} alt={earningToken.symbol} width={64} height={64} />
          </div>
          {account && harvest && (
            <HarvestButton
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? TranslateString(999, 'Collecting') : TranslateString(562, 'Harvest')}
              onClick={async () => {
                setPendingTx(true)
                await onReward()
                setPendingTx(false)
              }}
            />
          )}
        </div> */}
        <StyledRewardDetails>
          <Text>{TranslateString(384, 'Reward Token')}:</Text>
          {earningToken.symbol === "MONEY" ? (
            <Text  style={{color: "#39c36f"}}>{earningToken.symbol}</Text>
            ) : (
              <Text  style={{color: "#00e8ff"}}>{earningToken.symbol}</Text>
            )
          }
        </StyledRewardDetails>
        <StyledDetails>
          <Text>{TranslateString(384, 'Deposit Fee')}:</Text>
          { !pool.isPartner ? (
              <Text>{earningToken.symbol === "MONEY" ? "10%": "5%"}</Text>
            ) : (
              <Text>0%</Text>
            )
          }
        </StyledDetails>
        <StyledDetails>
          <Text>{TranslateString(736, 'APR')}:</Text>
          {isFinished || !apy ? (
            '-'
          ) : (
            <Balance fontSize="14px" isDisabled={isFinished} value={apy} decimals={2} unit="%" />
          )}
        </StyledDetails>
        <StyledDetails>
          <Text>{TranslateString(384, 'Your Stake')}:</Text>
          <Text>{getBalanceNumber(stakedBalance, stakingToken.decimals)} {stakingToken.symbol}</Text>
        </StyledDetails>
          <div>
            {!account && <UnlockButton  width="100%"/>}
            {account &&
              (needsApproval ? (
                <div style={{ flex: 1 }}>
                  <Button disabled={isFinished || requestedApproval} onClick={handleApprove} width="100%">
                    {`Approve ${stakingToken.symbol}`}
                  </Button> 
                </div>
              ) : (
                <>

                  <StyledCardActions>
                    <StyledCardActionsLeft>
                      <BalanceAndCompound>
                        <Balance value={getBalanceNumber(earnings, earningToken.decimals)} isDisabled={isFinished} />
                      </BalanceAndCompound>
                      {earningToken.symbol === "MONEY" ? (
                          <Text>{getBalanceNumber(earnings, earningToken.decimals) === 0 ?
                            0 : 
                            (
                              <>
                              ~ {(getBalanceNumber(earnings, earningToken.decimals) * moneyPrice.toNumber()).toFixed(3)}
                              </>
                            )
                          } USD
                          </Text>
                        ) : (<></>)
                      } 
                      <Flex >
                        <Text bold textTransform="uppercase" color="text" fontSize="20px" pr="3px">
                          {/* TODO: Is there a way to get a dynamic value here from useFarmFromSymbol? */}
                          {earningToken.symbol}
                        </Text>
                        <Text color="text" fontSize="18px">
                          {TranslateString(1072, 'earned')}
                        </Text>
                      </Flex>
                    </StyledCardActionsLeft>
                    <StyledCardActionsRight>
                      <Flex>
                      <Button
                        disabled={!earnings.toNumber() || pendingTx}
                        onClick={async () => {
                          setPendingTx(true)
                          await onReward()
                          setPendingTx(false)
                        }}
                      >
                      Harvest
                      </Button>
                      </Flex>

                      <Flex>
                      <Button
                        onClick={ onPresentDeposit }
                      >
                        {`Stake ${stakingToken.symbol}`}
                      </Button>
                      </Flex>
                      <Flex>
                      <Button
                        onClick={ onPresentWithdraw }
                      >
                        {`Unstake ${stakingToken.symbol}`}
                      </Button>
                      </Flex>
                    </StyledCardActionsRight>
                  </StyledCardActions>
                </>
              ))}
          </div>
      </div>
      <CardFooter
        projectLink={earningToken.projectLink}
        decimals={stakingToken.decimals}
        totalStaked={totalStakedUsd}
        startBlock={startBlock}
        endBlock={endBlock}
        isFinished={isFinished}
        poolCategory={poolCategory}
        tokenName={earningToken.symbol}
        tokenAddress={earningToken.address ? getAddress(earningToken.address) : ''}
        tokenDecimals={earningToken.decimals}
      />
    </Card>
  )
}


const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`

const PoolFinishedSash = styled.div`
  background-image: url('/images/pool-finished-sash.svg');
  background-position: top right;
  background-repeat: not-repeat;
  height: 135px;
  position: absolute;
  right: -24px;
  top: -24px;
  width: 135px;
`

const StyledCardActions = styled.div`
  display: inline-block;
  margin: auto;
  width: 100%;
  box-sizing: border-box;
  > div {
    width: 47%
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    > div {
      width: unset;
    }
  }
  
`
const StyledCardActionsLeft = styled.div`
  float: left;
`
const StyledCardActionsRight = styled.div`
  float: right;
  display: block;
  > div {
    padding-top:5px;
  }
  > div > button{
    width: 100%;
  }
  
`

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`

const StyledRewardDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  > div {
    font-size: 26px;
    font-width: bold;
  }
`

export default PoolCard
