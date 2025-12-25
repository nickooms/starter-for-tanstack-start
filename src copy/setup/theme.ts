import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// const prefersDarkMode = typeof window !== 'undefined' ? useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true }) : false;

export const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  typography: {
    fontFamily: "'Roboto Variable', sans-serif",
  },
});
