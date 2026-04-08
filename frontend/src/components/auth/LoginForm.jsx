import React from 'react';
import { TextField, Box } from '@mui/material';
import LaravelButton from '../ui/LaravelButton';

const LoginForm = ({ email, setEmail, password, setPassword, onSubmit }) => {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <LaravelButton
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, py: 1.5 }}
      >
        Accedi
      </LaravelButton>
    </Box>
  );
};

export default LoginForm;
