// src/hooks/useLogin.ts
import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Credentials, FormErrors } from '../types/interfaces';
import { validateInputs } from '../utils/validation';

export const useLogin = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '', 
    password: '', 
    remember: false 
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({ 
    email: '', 
    password: '' 
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement>, 
    field: keyof Credentials
  ) => {
    setCredentials(prev => ({
      ...prev, 
      [field]: e.target.value
    }));
  }, []);

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    const { isValid, errors: validationErrors } = validateInputs(credentials);
    setErrors(validationErrors);

    if (!isValid) {
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

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return {
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
  };
};