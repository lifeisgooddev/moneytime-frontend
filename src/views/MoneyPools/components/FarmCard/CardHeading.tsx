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
  isFinished?: boolean
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
  isFinished
}) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <Image src={`/images/farms/${farmImage}.svg`} alt={tokenSymbol} width={150} height={150} />
      <Flex flexDirection="column" alignItems="flex-end">
        { lpLabel === "MONEY" ? (
          <>
          <Heading mb="4px"size='xl'>{lpLabel.split(' ')[0]}</Heading>
          <Flex justifyContent="center">
            <MultiplierTag variant="backgroundRed">{multiplier}</MultiplierTag>
          </Flex>
          </>
        ) : (
          <>
          <Heading mb="4px"size='lg'>Stake Money earn {lpLabel.split(' ')[0]}</Heading>
          { !isFinished ? (
            <Flex justifyContent="center">
              <Text textAlign="right">For 2 weeks only <br/> 6300 {lpLabel.split(' ')[0]} to be distributed </Text>
            </Flex>
            ) : (<></>) }
          </>
        )
        }
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
