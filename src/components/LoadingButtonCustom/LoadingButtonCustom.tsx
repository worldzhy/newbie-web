import React, { type FC } from 'react';
import { LoadingButton, type LoadingButtonProps } from '@mui/lab';
import styleConfig from '@/constants/styleConfig';

interface Props {
  className?: string
}

const LoadingButtonCustom: FC<Props & LoadingButtonProps> = ({ className, onClick, loading, children, ...props }) => {
  return (
    <LoadingButton
      variant='contained'
      className={`${className === undefined ? '' : className}`}
      onClick={onClick}
      loading={loading}
      sx={{
        textTransform: 'none',
        fontSize: '18px',
        fontWeight: '400',
        borderRadius: '0',
        padding: '8px 24px',
        border: `2px solid ${styleConfig.color.primaryBlackColor}`,
        color: `${styleConfig.color.primaryWhiteColor}`,
        backgroundColor: `${styleConfig.color.primaryBlackColor}`,
        '&:hover': { backgroundColor: `${styleConfig.color.primaryBlackColorDark}` }
      }}
    >
      {children}
    </LoadingButton>
  );
};

export default LoadingButtonCustom;
