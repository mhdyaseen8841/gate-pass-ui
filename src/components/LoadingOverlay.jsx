import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingOverlay = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <CircularProgress size={60} thickness={4} />
    </Box>
  );
};

export default LoadingOverlay;