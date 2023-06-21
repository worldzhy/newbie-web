import styles from './ButtonCustom.module.css';
import React, { type FC } from 'react';
import { Button, type ButtonProps } from '@mui/material';
import { ThemeProvider, createTheme, type PaletteColorOptions, type PaletteColor } from '@mui/material/styles';
import styleConfig from '@/constants/styleConfig';

interface Props {
  className?: string
}

declare module '@mui/material/styles' {
  interface CustomPalette {
    dark: PaletteColorOptions
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    dark: true
  }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string): PaletteColor => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    dark: createColor(styleConfig.color.primaryBlackColor)
  }
});

const ButtonCustom: FC<Props & ButtonProps> = ({ color, onClick, className, children, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={onClick}
        className={`${className === undefined ? '' : className} ${styles.button}`}
        color={color}
        variant='contained'
      >
        {children}
      </Button>
    </ThemeProvider>
  );
};

export default ButtonCustom;
