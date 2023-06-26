import React, { type FC } from 'react';
import { Button, type ButtonProps } from '@mui/material';
import styleConfig from '@/constants/styleConfig';

interface Props {
  className?: string;
  customColor: 'dark' | 'light' | 'link';
}

const ButtonCustom: FC<Props & ButtonProps> = ({
  customColor,
  onClick,
  href,
  className,
  children,
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      className={`${className === undefined ? '' : className}`}
      variant="contained"
      href={href}
      sx={{
        fontFamily: 'Rubik',
        textTransform: 'none',
        fontSize: '18px',
        fontWeight: '400',
        ...(customColor === 'dark' && {
          borderRadius: '0',
          padding: '8px 24px',
          border: `2px solid ${styleConfig.color.primaryBlackColor}`,
          color: `${styleConfig.color.primaryWhiteColor}`,
          backgroundColor: `${styleConfig.color.primaryBlackColor}`,
          '&:hover': {
            backgroundColor: `${styleConfig.color.primaryBlackColorDark}`,
          },
        }),
        ...(customColor === 'light' && {
          borderRadius: '0',
          padding: '8px 24px',
          border: `2px solid ${styleConfig.color.primaryBlackColor}`,
          color: `${styleConfig.color.primaryBlackColor}`,
          backgroundColor: `${styleConfig.color.primaryWhiteColor}`,
          '&:hover': {
            backgroundColor: `${styleConfig.color.primaryGrayColor}`,
          },
        }),
        ...(customColor === 'link' && {
          fontSize: '14px',
          padding: '0',
          color: `${styleConfig.color.primaryBlueColor}`,
          textDecoration: 'underline',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          '&:hover': {
            opacity: '0.9',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            textDecoration: 'underline',
          },
        }),
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonCustom;
