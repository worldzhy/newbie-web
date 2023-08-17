import {useContext, createContext, PropsWithChildren} from 'react';
import {theme} from '@/constants/theme';
import {CssBaseline} from '@mui/material';
import styleConfig from '@/constants/styleConfig';

export interface ThemeContextProps {
  muiTheme: any;
  theme: any;
}

const ThemeContext = createContext<ThemeContextProps>(undefined!);

export const ThemeProvider = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => (
  <ThemeContext.Provider value={{theme: styleConfig, muiTheme: theme}}>
    <CssBaseline />
    {children}
  </ThemeContext.Provider>
);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useThemeContext should be used within the ThemeProvider provider!'
    );
  }

  return context;
};

export default ThemeProvider;
