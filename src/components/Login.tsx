import React, { useState, useCallback, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  FormControlLabel, 
  Checkbox, 
  Link, 
  Typography, 
  CircularProgress,
  Grid,
  useMediaQuery,
  IconButton
} from '@mui/material';
import { Lock, Email, Visibility, VisibilityOff } from '@mui/icons-material';
import ReCAPTCHA from 'react-google-recaptcha';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CyberCardProps {
  ismobile: boolean;
}

const CyberCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'ismobile',
})<CyberCardProps>(({ ismobile }) => ({
  position: 'relative',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  padding: '2rem',
  width: ismobile ? 'calc(100% - 32px)' : '450px',
  maxWidth: '500px',
  margin: '16px',
  transition: 'box-shadow 0.3s ease',
  maxHeight: 'calc(100vh - 32px)',
  overflowY: 'auto',
  '&:hover': {
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.2)'
  }
}));

const CyberSecurityLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '', 
    password: '', 
    remember: false 
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ 
    email: '', 
    password: '' 
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  
  const isMobile = useMediaQuery('(max-width:600px)');
  const RECAPTCHA_SITE_KEY = '6LfXUAArAAAAACCMHLi8AKFPAqYL6ezIQG2791Lx';

  const validateInputs = useCallback(() => {
    const newErrors = { email: '', password: '' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    if (!credentials.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(credentials.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!credentials.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (credentials.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [credentials.email, credentials.password]);

  useEffect(() => {
    const inputsValid = validateInputs();
    setIsFormValid(inputsValid);
  }, [credentials, validateInputs]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      toast.error('Please complete all fields correctly');
      return;
    }

    if (!recaptchaToken) {
      toast.error('Please verify you are not a robot');
      return;
    }

    setLoading(true);
    
    try {
      toast.info('Submitted', {
        autoClose: 2000,
        hideProgressBar: true
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Login Successful');
    } catch (error) {
      toast.error('Login Failed');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement>, 
    field: 'email' | 'password'
  ) => {
    setCredentials(prev => ({
      ...prev, 
      [field]: e.target.value
    }));
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

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
              <Typography variant="h4" sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #00ff88 30%, #00ccff 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '1.5px',
                mb: 2
              }}>
                Secure Portal
              </Typography>
            </Box>

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email / Username"
                variant="outlined"
                margin="dense"
                InputProps={{
                  startAdornment: <Email sx={{ color: '#00ff88', mr: 1 }} />
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': { borderColor: '#2e3952' },
                    '&:hover fieldset': { borderColor: '#00ff88' }
                  }
                }}
                error={!!errors.email}
                helperText={errors.email}
                value={credentials.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'email')}
                placeholder="secure@yourdomain.com"
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                margin="dense"
                InputProps={{
                  startAdornment: <Lock sx={{ color: '#00ff88', mr: 1 }} />,
                  endAdornment: (
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      sx={{ color: '#00ff88' }}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': { borderColor: '#2e3952' },
                    '&:hover fieldset': { borderColor: '#00ff88' }
                  }
                }}
                error={!!errors.password}
                helperText={errors.password}
                value={credentials.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'password')}
                placeholder="••••••••"
              />

              <Box my={1}>
                <ReCAPTCHA
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={setRecaptchaToken}
                  theme="dark"
                  style={{ transform: 'scale(0.95)' }}
                />
              </Box>

              <Grid container alignItems="center" justifyContent="space-between">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={credentials.remember}
                      onChange={(e) => setCredentials(prev => ({
                        ...prev, 
                        remember: e.target.checked
                      }))}
                      sx={{ color: '#00ff88' }}
                    />
                  }
                  label="Remember this device"
                  sx={{ color: '#fff' }}
                />
                <Link href="#" sx={{ 
                  color: '#00ccff !important',
                  fontSize: '0.875rem',
                  '&:hover': { textDecoration: 'underline' }
                }}>
                  Forgot Credentials?
                </Link>
              </Grid>

              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                disabled={!isFormValid || loading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  background: 'linear-gradient(45deg, #00ff88 30%, #00ccff 90%)',
                  '&:disabled': { background: '#2e3952' },
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: '8px'
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: '#fff' }} />
                ) : (
                  'Initiate Secure Session'
                )}
              </Button>

              <Typography variant="body2" textAlign="center" mt={1} sx={{ 
                color: '#8a93a3',
                '& a': { fontWeight: 500 }
              }}>
                New to our platform?{' '}
                <Link href="#" sx={{ color: '#00ccff !important' }}>
                  Request Access
                </Link>
              </Typography>
            </form>
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