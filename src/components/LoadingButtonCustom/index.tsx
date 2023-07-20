import React, {type ReactNode, type FC} from 'react';
import {LoadingButton, type LoadingButtonProps} from '@mui/lab';
import styleConfig from '@/constants/styleConfig';

interface Props extends LoadingButtonProps {
  className?: string;
  customColor: 'dark' | 'light';
  children: ReactNode;
}

const LoadingButtonCustom: FC<Props> = ({
  className,
  customColor,
  onClick,
  loading,
  children,
}) => {
  return (
    <LoadingButton
      variant="contained"
      className={`${className === undefined ? '' : className}`}
      onClick={onClick}
      loading={loading}
      sx={{
        textTransform: 'none',
        fontFamily: 'Rubik',
        fontSize: '18px',
        fontWeight: '400',
        borderRadius: '0',
        padding: '8px 24px',
        border: `2px solid ${styleConfig.color.primaryBlackColor}`,
        ...(customColor === 'dark' && {
          color: `${styleConfig.color.primaryWhiteColor}`,
          backgroundColor: `${styleConfig.color.primaryBlackColor}`,
          '&:hover': {
            backgroundColor: `${styleConfig.color.primaryBlackColorDark}`,
          },
        }),
        ...(customColor === 'light' && {
          color: `${styleConfig.color.primaryBlackColor}`,
          backgroundColor: `${styleConfig.color.primaryWhiteColor}`,
          '&:hover': {
            backgroundColor: `${styleConfig.color.primaryGrayColor}`,
          },
        }),
      }}
    >
      {children}
    </LoadingButton>
  );
};

export default LoadingButtonCustom;
