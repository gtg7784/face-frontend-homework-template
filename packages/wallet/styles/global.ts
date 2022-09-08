import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    font-family: 'Inter', sans-serif !important;
    box-sizing: border-box !important;
  }
  html, body, #__next {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyle;
