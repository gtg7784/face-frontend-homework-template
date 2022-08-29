import React from "react"; 
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/global"; 
import theme from '../styles/theme';

export const decorators = [
  (Story) => (
    <>
      <head>
        <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
      </head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    </>
  )
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
