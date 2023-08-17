import {FC, PropsWithChildren} from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ThemeContext from '@/context/ThemeContext';

import styles from './index.module.scss';

const MuiLayout: FC<PropsWithChildren> = ({children}) => {
  return (
    <ThemeContext>
      <Header />
      <main id="main-content" className={styles.mainContent}>
        {children}
      </main>
      <Footer />
    </ThemeContext>
  );
};

export default MuiLayout;
