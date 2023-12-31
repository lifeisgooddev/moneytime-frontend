import styled from 'styled-components'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  background: ${(props) => props.theme.card.background};
  box-shadow: 0px 2px 12px -2px rgba(0,0,0), 0px 1px 1px rgba(25, 19, 38, 0.05);
  border-radius: 32px;
  display: flex;
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'secondary']};
  
  flex-direction: column;
  position: relative;
`

export default Card
