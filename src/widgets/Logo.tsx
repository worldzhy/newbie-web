import React, { type ReactElement } from 'react';
import { Typography } from '@mui/material';
import styles from './Logo.module.css';

const Logo = (): ReactElement => {
  return <Typography className={styles.logo} variant='h1'>Logo</Typography>;
};

export default Logo;
