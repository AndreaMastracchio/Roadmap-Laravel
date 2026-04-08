import React from 'react';
import { Container } from '@mui/material';

const LaravelContainer = ({ children, maxWidth = 'lg', sx = {}, ...props }) => {
  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        px: { xs: 2, sm: 4, md: 6 },
        ...sx
      }}
      {...props}
    >
      {children}
    </Container>
  );
};

export default LaravelContainer;
