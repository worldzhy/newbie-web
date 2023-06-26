import { createTheme } from '@mui/material/styles';
import '@fontsource/rubik/latin-400.css';
import '@fontsource/rubik/latin-500.css';
import '@fontsource/rubik/latin-700.css';

const theme = createTheme({
  typography: {
    fontFamily: ['Rubik'].join(','),
    h1: {
      fontSize: 40,
      fontWeight: 700,
      lineHeight: 1.185,
    },
  },
});
export { theme };
