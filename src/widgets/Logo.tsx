import React, { type ReactElement } from 'react';
import Link from 'next/link';
import { Typography } from '@mui/material';
import styles from './Logo.module.css';

const Logo = (): ReactElement => {
  return (
    <Link href="/" className={styles.logo}>
      <Typography variant="h1" className={styles.text}>
        Logo
      </Typography>
    </Link>
  );
};

export default Logo;
