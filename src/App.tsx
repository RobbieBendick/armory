import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { BindRoutes } from './bind-routes';
import {
  useMediaQuery,
  PaletteMode,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import React from 'react';
import { grey } from '@mui/material/colors';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#0ea47a',
          },
          divider: '#0ea47a',
          background: {
            default: '#fff',
            paper: '#fff',
            secondary: '#ededed',
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#0ea47a',
          },
          divider: '#0ea47a',
          background: {
            default: '#1a1c1e',
            paper: '#1a1c1e',
            secondary: '#161719',
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
});

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  mode: 'dark' as PaletteMode,
});

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // Retrieve the color mode from localStorage if available, otherwise use prefersDarkMode
  const storedColorMode = localStorage.getItem('colorMode');
  const initialMode =
    storedColorMode === 'dark' || storedColorMode === 'light'
      ? storedColorMode
      : prefersDarkMode
      ? 'dark'
      : 'light';

  const [mode, setMode] = React.useState<PaletteMode>(initialMode);
  const colorMode = React.useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('colorMode', newMode);
      },
    }),
    [mode]
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <BindRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
