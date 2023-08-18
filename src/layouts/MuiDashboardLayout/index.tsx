import {FC, PropsWithChildren} from 'react';
import {Container, Toolbar} from '@mui/material';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import ThemeContext from '@/context/ThemeContext';

import styles from './index.module.scss';

const HEADER_HEIGHT = 64;
const DRAWER_WIDTH = 240;

const MuiDashboardLayout: FC<PropsWithChildren> = ({children}) => (
  <ThemeContext>
    <Header withNav={false} height={HEADER_HEIGHT} drawerWidth={DRAWER_WIDTH} />
    <Container sx={{display: 'flex'}} id="main-container">
      <NavBar headerHeight={HEADER_HEIGHT} drawerWidth={DRAWER_WIDTH} />
      <main id="main-content" className={styles.mainContent}>
        <Toolbar style={{height: 64}} />
        {children}
        <Footer />
      </main>
    </Container>
  </ThemeContext>
);

export default MuiDashboardLayout;
