import { createGlobalStyle } from 'styled-components'
// @ts-ignore
import inter from 'typeface-inter'
// @ts-ignore
import normalize from 'normalize.css'

const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${inter}

  :root {
    --header-background-color: #e8e8e8;
    --header-title-color: #222222;
    --header-title-icon-color: #666666;
    --header-title-icon-border-color: #666666;
    --header-title-span-color: #4506f2;
    --header-link-color: #666666;
    --header-link-border-color: #cccccc;
    --header-link-hover-color: #111111;

    --item-background-color: #f4f4f4;
    --item-title-color: #111111;
    --item-title-url-color: #999999;
    --item-info-color: #656565;
    --item-info-link-color: #444444;

    --load-more-button-color: #656565;
  }

  body {
    font-family: 'Inter', sans-serif;
  }
`

export default GlobalStyle
