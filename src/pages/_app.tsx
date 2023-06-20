import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import React, { type ReactElement } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../constants/theme';
import { CssBaseline } from '@mui/material';

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
