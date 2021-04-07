import React from 'react'
import styled from 'styled-components'

export interface FeeProps {
  value: number
}

const Amount = styled.span`
  color: ${({ theme }) => (theme.colors.text)};
  display: flex;
  align-items: center;
`

const Fee: React.FunctionComponent<FeeProps> = ({ value }) => {
  return <Amount>{value}</Amount>
}

export default Fee
