import React from "react"; 
import { ThemeProvider } from "styled-components";
import { Provider as ReduxProvider } from 'react-redux'
import GlobalStyle from "../styles/global"; 
import theme from '../styles/theme';
import { makeStore } from '../store';

const store = makeStore();

export const decorators = [
  (Story) => (
    <>
      <head>
        <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
      </head>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Story />
        </ThemeProvider>
      </ReduxProvider>
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
