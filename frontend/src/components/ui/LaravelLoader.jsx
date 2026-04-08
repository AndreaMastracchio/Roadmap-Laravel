import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import LaravelTypography from './LaravelTypography';

const LaravelLoader = ({ message = 'Caricamento...', py = 20 }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: py,
      gap: 2,
      width: '100%'
    }}>
      <CircularProgress
        size={50}
        thickness={4}
        sx={{ color: '#326ce5' }}
      />
      <LaravelTypography
        variant="body2"
        color="text.secondary"
        weight="medium"
      >
        {message}
      </LaravelTypography>
    </Box>
  );
};

export default LaravelLoader;
