import React from 'react'
import styled from 'styled-components'
import ApyButton from 'views/Farms/components/FarmCard/ApyButton'
import { Address } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import useI18n from 'hooks/useI18n'

export interface AprProps {
  value: string
  multiplier: string
  lpLabel: string
  tokenAddress?: Address
  quoteTokenAddress?: Address
  moneyPrice: BigNumber
  originalValue: number
  hideButton?: boolean
}

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};

  button {
    width: 20px;
    height: 20px;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.textSubtle};
      }
    }
  }
`

const AprWrapper = styled.div`
  min-width: 60px;
  text-align: left;
`

const Apr: React.FC<AprProps> = ({
  value,
  lpLabel,
  tokenAddress,
  quoteTokenAddress,
  moneyPrice,
  originalValue,
  hideButton = false,
}) => {
  const TranslateString = useI18n()
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddress, tokenAddress })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  return (
    <Container>
      {originalValue ? (
        <>
          <AprWrapper>{value}%</AprWrapper>
          {!hideButton && (
            <ApyButton lpLabel={lpLabel} moneyPrice={moneyPrice} apy={originalValue} addLiquidityUrl={addLiquidityUrl} />
          )}
        </>
      ) : (
        <AprWrapper>{TranslateString(656, 'Loading...')}</AprWrapper>
      )}
    </Container>
  )
}

export default Apr
