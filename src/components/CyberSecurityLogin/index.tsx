
import React from 'react';
import { 
  Box, 
  Grid,
  useMediaQuery 
} from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CyberCard } from './CyberCard';
import { LoginForm } from './LoginForm';
import { GradientText } from '../common/GradientText';

const CyberSecurityLogin: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      <Grid 
        container 
        justifyContent="center" 
        alignItems="center" 
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(45deg, #0a192f 0%, #172a45 100%)',
          color: '#fff',
          padding: 0,
          margin: 0,
          width: "98.5vw",
          overflow: 'hidden'
        }}
      >
        <Grid 
          item 
          xs={12} 
          display="flex" 
          justifyContent="center" 
          alignItems="center"
          sx={{ width: '100%', height: '100%' }}
        >
          <CyberCard ismobile={isMobile}>
            <Box textAlign="center" mb={2}>
              <Box
                component="img"
                src="https://skurelabs.com/wp-content/uploads/2024/11/Skurelabs.png"
                alt="Skurelabs Logo"
                sx={{ width: { xs: '120px', sm: '150px' }, mb: 1 }}
              />
              <GradientText variant="h4">
                Secure Portal
              </GradientText>
            </Box>

            <LoginForm isMobile={isMobile} />
          </CyberCard>
        </Grid>
      </Grid>
      
      <ToastContainer 
        theme="dark"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default CyberSecurityLogin;