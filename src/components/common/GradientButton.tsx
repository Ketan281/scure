// src/components/common/GradientButton.tsx
import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface GradientButtonProps extends ButtonProps {
  loading?: boolean;
  startColor?: string;
  endColor?: string;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  loading = false,
  startColor = '#00ff88',
  endColor = '#00ccff',
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={props.disabled || loading}
      sx={{
        py: 1.5,
        background: `linear-gradient(45deg, ${startColor} 30%, ${endColor} 90%)`,
        '&:disabled': { background: '#2e3952' },
        fontSize: '1.1rem',
        fontWeight: 600,
        borderRadius: '8px',
        color:"#fff",
        ...props.sx
      }}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: '#fff' }} />
      ) : (
        children
      )}
    </Button>
  );
};