import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    box-sizing: border-box;
  }
  html, body, #__next {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyle;
