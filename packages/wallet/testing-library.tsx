import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';

const AllTheProviders = ({ children }: React.PropsWithChildren) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

const customRender = (
  ui: React.ReactElement,
  options: RenderOptions,
) => {
  const { wrapper: Wrapper, ...opts } = options;

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders>
        {Wrapper ? <Wrapper>{children}</Wrapper> : children}
      </AllTheProviders>
    ),
    ...opts,
  });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as renderWithTheme };
