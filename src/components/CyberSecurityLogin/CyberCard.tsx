import React from 'react';
import { Box, styled } from '@mui/material';
import { CyberCardProps } from '../../types/interfaces';

export const CyberCard = styled(Box, {
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
  // maxHeight: 'calc(100vh - 32px)',
  overflowY: 'auto',
  '&:hover': {
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.2)'
  }
}));