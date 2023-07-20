import React, {type ReactElement, type ReactNode} from 'react';
import {CssBaseline} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import type {NextPage} from 'next';
import type {AppProps} from 'next/app';
import {theme} from '@/constants/theme';
import '@/styles/globals.scss';

export type NextPageWithLayout<
  P = {
    /* */
  },
  IP = P
> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({Component, pageProps}: AppPropsWithLayout): ReactElement => {
  const getLayout = Component.getLayout ?? (page => page);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
};

export default App;
