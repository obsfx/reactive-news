import { createGlobalStyle } from 'styled-components'
// @ts-ignore
import inter from 'typeface-inter'
// @ts-ignore
import normalize from 'normalize.css'

const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${inter}

  :root {
    --body-background-color: #131516;

    --header-background-color: #181a1b;
    --header-title-color: #d3cfc9;
    --header-title-icon-color: #a8a095;
    --header-title-icon-border-color: #6a6357;
    --header-title-span-color: #a5eeff;
    --header-link-color: #a8a095;
    --header-link-border-color: #3e4446;
    --header-link-hover-color: #dddad6;
    --header-link-active-color: #a5eeff;

    --item-background-color: #1e2122;
    --item-number-color: #e8e6e3;
    --item-title-color: #dddad6;
    --item-title-url-color: #a8a095;
    --item-info-color: #a8a195;
    --item-info-link-color: #bdb7af;
    --item-details-text-link-color: #3391ff;

    --item-loader-background-color: #25282a;

    --item-details-background-color: #1e2122;
    --item-details-text-color: #a8a195;

    --load-more-button-color: #a8a195;

    --comment-container-marker-color: #e8e6e3;
    --comment-info-color: #a8a195;
    --comment-text-color: #dddad6;
    --comment-childs-border-color: #4b5255;
    --comment-text-link-color: #3391ff;
  }

  body {
    background-color: var(--body-background-color);
    font-family: 'Inter', sans-serif;
  }
`

export default GlobalStyle
