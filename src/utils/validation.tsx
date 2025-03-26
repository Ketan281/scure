// src/utils/validation.ts
import { Credentials, FormErrors } from '../types/interfaces';
import { EMAIL_REGEX } from './constants';

export const validateInputs = (credentials: Credentials): { isValid: boolean; errors: FormErrors } => {
  const newErrors: FormErrors = { email: '', password: '' };
  let isValid = true;

  if (!credentials.email) {
    newErrors.email = 'Email is required';
    isValid = false;
  } else if (!EMAIL_REGEX.test(credentials.email)) {
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

  return { isValid, errors: newErrors };
};