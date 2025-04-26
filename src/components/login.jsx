import React, { use, useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  InputAdornment, 
  IconButton,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  Person as PersonIcon, 
  Lock as LockIcon, 
  Visibility, 
  VisibilityOff 
} from '@mui/icons-material';
import CryptoJS from "crypto-js";
import {signInUserAPI} from '../services/authAPI.js';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const encryptPassword = (password) => {
    return CryptoJS.AES.encrypt(password, "crypto-gatePass@25@synthite").toString();
  };

  
  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    setLoading(true);
    const encryptedPassword = encryptPassword(password);
    const data = {
      user_name: username,
      psw: encryptedPassword,
    };
  
    try {
      const response = await signInUserAPI(data); // 🔄 await instead of .then()
  
      if (!response || !response.accessToken) {
        throw new Error("Invalid credentials");
      }
  
      localStorage.setItem('token', response.accessToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to login. Please try again.");
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };
  


  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5'
      }}
    >
      <Paper 
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.17)'
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            textAlign: 'center', 
            mb: 4,
            fontWeight: 600,
            color: '#2c3e50'
          }}
        >
          Login
        </Typography>

        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLogin();
            }
          }}
        />

<Button
  fullWidth
  variant="contained"
  color="primary"
  size="large"
  onClick={handleLogin}
  disabled={loading}
  sx={{ 
    mt: 2,
    py: 1.5,
    fontWeight: 600,
    textTransform: 'none'
  }}
>
  {loading ? (
    <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
  ) : (
    "Sign In"
  )}
</Button>

        {/* Forgot Password Link */}
        {/* <Typography 
          variant="body2" 
          sx={{ 
            textAlign: 'center', 
            mt: 2,
            color: '#3498db',
            cursor: 'pointer'
          }}
          onClick={() => {}
        >
          Forgot Password?
        </Typography> */}

        {/* Error Snackbar */}
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setError(null)} 
            severity="error" 
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default Login;