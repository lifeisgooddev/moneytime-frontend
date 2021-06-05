import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image } from '@pancakeswap-libs/uikit'
import { CommunityTag, CoreTag } from 'components/Tags'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  farmImage?: string
  tokenSymbol?: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
  h2 {
    text-align: right;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  isCommunityFarm,
  farmImage,
  tokenSymbol,
}) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <Image src={`/images/${farmImage}.svg`} alt={tokenSymbol} width={150} height={150} />
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="4px"size='lg'>Reward locked for {lpLabel}</Heading>
        <Flex justifyContent="center">
          <MultiplierTag variant="backgroundRed">{multiplier}</MultiplierTag>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
