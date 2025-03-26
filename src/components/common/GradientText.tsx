// src/components/common/GradientText.tsx
import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface GradientTextProps extends TypographyProps {
  children: React.ReactNode;
  startColor?: string;
  endColor?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  startColor = '#00ff88',
  endColor = '#00ccff',
  ...props
}) => {
  return (
    <Typography
      {...props}
      sx={{
        fontWeight: 700,
        background: `linear-gradient(45deg, ${startColor} 30%, ${endColor} 90%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '1.5px',
        ...props.sx
      }}
    >
      {children}
    </Typography>
  );
};