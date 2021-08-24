import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image, Text } from '@pancakeswap-libs/uikit'
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
      <Image src={`/images/farms/${farmImage}.svg`} alt={tokenSymbol} width={100} height={100} />
      <Flex flexDirection="column" alignItems="flex-end">
        {lpLabel === "MONEY-BNB LP" || lpLabel === "MONEY-BUSD LP" ? (
          <Text style={{textAlign : "right"}}>ℹ️ Money LP stakers in this pool are eligible to a BUSD & MONEY token airdrop from fees.AirDrop every 72h at random hours.</Text>
        ) : (<></>) }
        <Heading mb="4px"size='xl'>{lpLabel.split(' ')[0]}</Heading>
        <Flex justifyContent="center">
          <MultiplierTag variant="backgroundRed">{multiplier}</MultiplierTag>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
