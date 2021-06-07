import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap-libs/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};
    background-image: ${({ theme }) => theme.colors.backgroundImage};
    background-size: contain;
    img {
      height: auto;
      max-width: 100%;
    }
  }
  // .sc-ehSCib{
  //   background:rgb(255,255,255,0.49);
  // }
  // .fNtXtj {
  //   color: rgb(163,130,0);
  // }
  // .kwDaUr {
  //   border : 0;
  //   background:rgb(0,0,0,0);
  // }
  // .cJUvT{
  //   max-width : 100%;
  // }
  // .sc-eJMQSu{
  //   display:none;
  // }
  // .bxOpxZ{
  //   margin-top: -27px;
  // }
`

export default GlobalStyle
