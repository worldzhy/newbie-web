import {FC, PropsWithChildren} from 'react';
import {Toolbar} from '@mui/material';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ThemeContext from '@/context/ThemeContext';

import styles from './index.module.scss';

const HEADER_HEIGHT = 64;

const MuiLayout: FC<PropsWithChildren> = ({children}) => {
  return (
    <ThemeContext>
      <Header height={HEADER_HEIGHT} />
      <main id="main-content" className={styles.mainContent}>
        <Toolbar style={{height: HEADER_HEIGHT}} />
        {children}
      </main>
      <Footer />
    </ThemeContext>
  );
};

export default MuiLayout;
