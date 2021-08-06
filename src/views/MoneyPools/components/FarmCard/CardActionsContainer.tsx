import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { provider as ProviderType } from 'web3-core'
import { getAddress } from 'utils/addressHelpers'
import { getBep20Contract } from 'utils/contractHelpers'
import { Button, Flex, Text } from '@pancakeswap-libs/uikit'
import { Farm } from 'state/types'
import { useMoneypoolFromSymbol, useMoneypoolUser } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import useWeb3 from 'hooks/useWeb3'
import { useERC20 } from 'hooks/useContract'
import { useApproveMoney } from 'hooks/useApprove'
import UnlockButton from 'components/UnlockButton'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'

const Action = styled.div`
  padding-top: 16px;
`
export interface FarmWithStakedValue extends Farm {
  apy?: number
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  provider?: ProviderType
  account?: string
  addLiquidityUrl?: string
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, account, addLiquidityUrl }) => {
  const TranslateString = useI18n()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses } = useMoneypoolFromSymbol(farm.lpSymbol)
  const { allowance, tokenBalance, stakedBalance, earnings } = useMoneypoolUser(pid)
  const lpAddress = getAddress(lpAddresses)
  const lpName = farm.lpSymbol.toUpperCase()
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const web3 = useWeb3()

  const stakingTokenContract = useERC20(getAddress(farm.token.address))

  const { onApprove } = useApproveMoney(stakingTokenContract, farm.token.symbol)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <></>
    ) : (
      // <Button mt="8px" width="100%" disabled={requestedApproval} onClick={handleApprove}>
      <Button mt="8px" width="100%" disabled onClick={handleApprove}>
        {TranslateString(758, 'Approve Contract')}
      </Button>
    )
  }

  return (
    <Action>
    <HarvestAction 
      earnings={earnings} 
      pid={pid} 
      stakedBalance={stakedBalance}
      tokenBalance={tokenBalance}
      tokenName={lpName}
      addLiquidityUrl={addLiquidityUrl}
    />
    <Flex>
      <Text bold textTransform="uppercase" color="text" fontSize="20px" pr="3px">
        {/* TODO: Is there a way to get a dynamic value here from useFarmFromSymbol? */}
        MONEY
      </Text>
      <Text color="text" fontSize="18px">
        {TranslateString(1072, 'earned')}
      </Text>
    </Flex>
    {!account ? <UnlockButton mt="8px" width="100%" /> : renderApprovalOrStakeButton()}
  </Action>
  )
}

export default CardActions
