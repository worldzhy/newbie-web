import Link from 'next/link';
import {Typography} from '@mui/material';
import styles from './index.module.scss';

const Logo = () => (
  <Link href="/" className={styles.logo}>
    <Typography variant="h1" className={styles.text}>
      Logo
    </Typography>
  </Link>
);

export default Logo;
