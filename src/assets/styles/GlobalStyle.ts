import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  @font-face {
    font-family: 'SUIT-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  * {
    position: relative;
  }

  html {
    font-size: 1rem;
  }

  body {
    font-family: var(--font-default);
    font-size: var( --font-text);
    color: var(--font-color);
    font-weight: var(--font-weight-default);
    background: var(--background-color);
  }

  a {
    text-decoration: none;
    color: var(--font-color);
  }

  button {
    border: none;
    border-radius: var(--default-radius-small);
    font-weight: var(--font-weight-bold);
    cursor: pointer;
  }

  :root {
    --font-default: 'SUIT-Regular';
    --font-default-eng: 'Exo 2', sans-serif;
    --font-title: 8.4rem;
    --font-sub-title: 4rem;
    --font-text-large: 1.7rem;
    --font-text: 1.3rem;
    --font-text-small: 0.9rem;
    --font-weight-thin: 400;
    --font-weight-default: 500;
    --font-weight-bold: 600;
    --background-color: #f2f2f2;
    --grey-color: #f5f5f7;
    --main-color-pink: #f989b3;
    --main-color-pink-hover: #f76a9c;
    --main-color-green: #56dfb4;
    --font-color: #000000;
    --font-gray-color: #757575;
    --default-width: 88%;
    --default-radius: 0.75rem;
    --default-radius-small: 0.37rem;
    --border-style: 1px solid #ccc;
    --noise-background: url('/texture_background.webp');
    --noise-opacity : 0.01;

    @media only screen and (max-width: 1348px) {
        --default-width: 92%;
      
    }

    @media only screen and (max-width: 734px) {
        --default-width: 95%;
    }
    
  }

  section {
    width: 100%;
    border-radius: var(--default-radius);
  }


  *::before {
    content: "";
    z-index: 102;
    pointer-events: none;
    mix-blend-mode: exclusion;
    background-image: var(--noise-background);
    opacity:  var(--noise-opacity);
    background-position: 0 0;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0% auto auto 0%;
  }
`;

export default GlobalStyle;
