// src/App.tsx
import React, { Suspense } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Box, 
  CircularProgress 
} from '@mui/material';
import CyberSecurityLogin from './components/CyberSecurityLogin';

// Define the theme outside the component
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff88',
    },
    background: {
      default: '#0a192f',
      paper: '#172a45',
    },
  },
  typography: {
    fontFamily: [
      'Inter', 
      'Roboto', 
      'Helvetica', 
      'Arial', 
      'sans-serif'
    ].join(','),
  },
});

// Fallback Loading Component
const LoadingOverlay: React.FC = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    height="100vh" 
    bgcolor="background.default"
  >
    <CircularProgress color="primary" />
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Suspense fallback={<LoadingOverlay />}>
        <CyberSecurityLogin />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;