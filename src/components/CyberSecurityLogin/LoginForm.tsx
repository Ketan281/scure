
import React from 'react';
import { 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  Link, 
  Typography,
  Grid,
  IconButton
} from '@mui/material';
import { Lock, Email, Visibility, VisibilityOff } from '@mui/icons-material';
import ReCAPTCHA from 'react-google-recaptcha';
import { RECAPTCHA_SITE_KEY } from '../../utils/constants';
import { useLogin } from '../../hooks/useLogin';
import { GradientButton } from '../common/GradientButton';

export const LoginForm: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const {
    credentials,
    loading,
    errors,
    showPassword,
    recaptchaToken,
    handleInputChange,
    handleLogin,
    togglePasswordVisibility,
    setCredentials,
    setRecaptchaToken
  } = useLogin();

  return (
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

      <ReCAPTCHA
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={setRecaptchaToken}
        theme="dark"
        style={{ transform: 'scale(0.95)', margin: '8px 0' }}
      />

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

      <GradientButton
        fullWidth
        type="submit"
        loading={loading}
        disabled={!recaptchaToken}
        sx={{ mt: 2 }}
      >
        Initiate Secure Session
      </GradientButton>

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
  );
};