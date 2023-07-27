import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import useTVL from 'hooks/useTVL'

const StyledTotalValueLockedCard = styled(Card)`
  background: ${({ theme }) => theme.colors.card};
  align-items: right;
  
  // display: flex;
  // flex: 1;
`

const StyledCardBody = styled(CardBody)`
  display:inline-block;
  float:left;
  width: 100%;
  h2:first-child {
    float:left
  }
`
const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  const data = useTVL()
  const tvl = 0

  return (
    <StyledTotalValueLockedCard>
      <StyledCardBody>
        <Heading size="lg" mb="24px">
          {TranslateString(762, 'Total Value Locked (TVL)')}
        </Heading>
        {data ? (
          <>
            <Heading size="xl">{`$${data.toLocaleString(undefined, { maximumFractionDigits: 3 })}`}</Heading>
            <Text color="textSubtle">{TranslateString(764, 'Across all Money and Time Pools')}</Text>
          </>
        ) : (
          <>
            <Skeleton height={66} />
          </>
        )}
      </StyledCardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
