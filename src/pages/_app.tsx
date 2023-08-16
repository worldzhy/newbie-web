import {useEffect} from 'react';
import type {AppProps} from 'next/app';
import {theme} from '@/constants/theme';
import {CssBaseline} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import Layout from '@/layouts';

import '@/styles/globals.scss';

const App = ({Component, pageProps}: AppProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
