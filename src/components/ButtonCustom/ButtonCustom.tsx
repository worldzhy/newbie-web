import styles from './ButtonCustom.module.css';
import React, { type FC } from 'react';
import { Button, type ButtonProps } from '@mui/material';
import styleConfig from '@/constants/styleConfig';

interface Props {
  className?: string
  customColor: 'dark' | 'light'
}

const ButtonCustom: FC<Props & ButtonProps> = ({ customColor, onClick, href, className, children, ...props }) => {
  return (
    <Button
      onClick={onClick}
      className={`${className === undefined ? '' : className} ${styles.button}`}
      variant='contained'
      href={href}
      sx={{
        fontFamily: 'Rubik',
        textTransform: 'none',
        fontSize: '18px',
        fontWeight: '400',
        borderRadius: '0',
        padding: '8px 24px',
        border: `2px solid ${styleConfig.color.primaryBlackColor}`,
        ...(customColor === 'dark' && {
          color: `${styleConfig.color.primaryWhiteColor}`,
          backgroundColor: `${styleConfig.color.primaryBlackColor}`,
          '&:hover': { backgroundColor: `${styleConfig.color.primaryBlackColorDark}` }
        }),
        ...(customColor === 'light' && {
          color: `${styleConfig.color.primaryBlackColor}`,
          backgroundColor: `${styleConfig.color.primaryWhiteColor}`,
          '&:hover': { backgroundColor: `${styleConfig.color.primaryGrayColor}` }
        })
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonCustom;
