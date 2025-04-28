import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Fade,
  Alert,
  alpha,
  useTheme
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

// Styled Components
const LoginPageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  backgroundSize: '400% 400%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const LoginCard = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 450,
  animation: `${fadeIn} 0.8s ease-out forwards`,
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #3949AB, #4FC3F7)'
  }
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  animation: `${float} 3s ease-in-out infinite`,
}));

const LogoIcon = styled(Box)(({ theme }) => ({
  width: 70,
  height: 70,
  borderRadius: '50%',
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  boxShadow: `0 5px 15px ${alpha(theme.palette.primary.main, 0.2)}`,
  '& svg': {
    fontSize: '2.5rem',
  },
}));

const LoginTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(3),
  textAlign: 'center',
  position: 'relative',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius * 1.5,
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: `0 0 8px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
    '&.Mui-focused': {
      boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.25)}`,
    },
    '& fieldset': {
      borderWidth: '1px',
    },
  },
  '& .MuiInputLabel-root': {
    fontFamily: "'Poppins', sans-serif",
  },
  '& .MuiInputBase-input': {
    fontFamily: "'Poppins', sans-serif",
    padding: theme.spacing(1.5, 1.5, 1.5, 1),
  }
}));

const LoginButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  padding: theme.spacing(1.2),
  fontSize: '1rem',
  fontWeight: 600,
  fontFamily: "'Poppins', sans-serif",
  textTransform: 'none',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  background: 'linear-gradient(90deg, #1976d2, #2196f3)',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(3),
  '&:hover': {
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-2px)',
    background: 'linear-gradient(90deg, #1565c0, #1976d2)',
  },
}));

function AdminLoginPage() {
  const theme = useTheme();
  const { setUserInfo } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminEmail', email);
        localStorage.setItem('adminInfo', JSON.stringify({
          ...data.admin,
          role: 'admin'
        }));
        setUserInfo({ name: 'Admin', role: 'admin' });
        navigate('/admin/home');
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error('Login error:', error);
      setError("An error occurred during login");
    }
  };

  return (
    <LoginPageContainer>
      <Fade in={true} timeout={800}>
        <LoginCard>
          <LogoContainer>
            <LogoIcon>
              <LockIcon fontSize="large" />
            </LogoIcon>
          </LogoContainer>
          
          <LoginTitle variant="h4">
            Admin Login
          </LoginTitle>
          
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3, 
                borderRadius: theme.shape.borderRadius * 1.5,
                animation: `${fadeIn} 0.4s ease-out forwards`,
              }}
            >
              {error}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              required
              label="Admin Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            
            <StyledTextField
              fullWidth
              required
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <LoginButton
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
            >
              Login
            </LoginButton>
          </form>
        </LoginCard>
      </Fade>
    </LoginPageContainer>
  );
}

export default AdminLoginPage;
