import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Toggle, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

const PoolTabButtons = ({ stackedOnly, setStackedOnly }) => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <ToggleWrapper>
        <Toggle  scale="lg" checked={stackedOnly} onChange={() => setStackedOnly(!stackedOnly)} />
        <Text> {TranslateString(999, 'Staked only')}</Text>
      </ToggleWrapper>
      <ButtonMenu activeIndex={isExact ? 0 : 1} scale="lg" variant="subtle">
        <ButtonMenuItem as={Link} to={`${url}`}>
          {TranslateString(1198, 'Active')}
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} to={`${url}/history`}>
          {TranslateString(388, 'Inactive')}
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default PoolTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
  a {
    padding-left: 12px;
    padding-right: 12px;
  }
  > div {
    margin-left: 0px;
    margin-right:0px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    > div {
      margin-left: 75px;
      margin-right: 75px;
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    > div {
      margin-left: 20px;
      margin-right: 20px;
    }
  }

`

const ToggleWrapper = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  margin-right: 32px;
  padding-left: 12px;
    padding-right: 12px;

  ${Text} {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
  }
`
