import { createGlobalStyle } from 'styled-components'
// @ts-ignore
import inter from 'typeface-inter'
// @ts-ignore
import normalize from 'normalize.css'

const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${inter}

  body {
    font-family: 'Inter', sans-serif;
  }
`

export default GlobalStyle
