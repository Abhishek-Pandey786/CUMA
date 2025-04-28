import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Container, 
  Typography, 
  TextField,
  Button,
  Card, 
  CardContent,
  InputAdornment,
  Alert,
  Snackbar,
  Link,
  alpha,
  useTheme,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  School as SchoolIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  backgroundSize: '200% 200%',
  animation: 'gradientFlow 15s ease infinite',
  padding: theme.spacing(2),
  '@keyframes gradientFlow': {
    '0%': {
      backgroundPosition: '0% 50%'
    },
    '50%': {
      backgroundPosition: '100% 50%'
    },
    '100%': {
      backgroundPosition: '0% 50%'
    }
  }
}));

const SignupCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
  overflow: 'hidden',
  width: '100%',
  maxWidth: 500,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '8px',
    background: 'linear-gradient(90deg, #3498db, #00897B)',
  }
}));

const FormTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: theme.shape.borderRadius * 1.5,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 2),
  },
  '& .MuiInputAdornment-root': {
    color: theme.palette.text.secondary,
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1.5),
  fontSize: '1rem',
  fontWeight: 600,
  fontFamily: "'Poppins', sans-serif",
  textTransform: 'none',
  boxShadow: `0 5px 15px ${alpha('#00897B', 0.3)}`,
  transition: 'all 0.3s ease',
  backgroundColor: '#00897B',
  marginTop: theme.spacing(2),
  '&:hover': {
    backgroundColor: '#00897B',
    transform: 'translateY(-3px)',
    boxShadow: `0 8px 20px ${alpha('#00897B', 0.4)}`,
  }
}));

const BackButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  marginBottom: theme.spacing(2),
  textTransform: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
  }
}));

function StudentSignUpPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    studentId: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { fullName, email, password, studentId } = formData;
    if (!fullName) return "Full Name is required!";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid Email Address!";
    if (!password || password.length < 8) return "Password must be at least 8 characters!";
    if (!studentId) return "Student ID is required!";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    
    if (validationError) {
      setError(validationError);
      setSuccess(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/students/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setError("");
        setSuccess(true);
        // Clear form
        setFormData({
          fullName: "",
          email: "",
          password: "",
          studentId: "",
        });
      } else {
        setError(data.message);
        setSuccess(false);
      }
    } catch (err) {
      setError("Connection error. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <PageContainer>
      <SignupCard>
        <CardContent sx={{ p: 4 }}>
          <BackButton 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/signup')}
          >
            Back to Roles
          </BackButton>
          
          <Typography 
            variant="h4" 
            component="h1" 
            align="center" 
            gutterBottom
            sx={{ 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              mb: 1,
              color: theme.palette.text.primary,
            }}
          >
            Student Sign Up
          </Typography>
          
          <Typography 
            variant="body1" 
            align="center" 
            sx={{ 
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              color: theme.palette.text.secondary,
              mb: 4,
            }}
          >
            Create your account to access CUMA
          </Typography>
          
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{ mt: 2 }}
          >
            <FormTextField
              fullWidth
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            <FormTextField
              fullWidth
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            <FormTextField
              fullWidth
              name="password"
              type="password"
              placeholder="Password (min. 8 characters)"
              value={formData.password}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            <FormTextField
              fullWidth
              name="studentId"
              placeholder="Student ID"
              value={formData.studentId}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SchoolIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            <SubmitButton 
              fullWidth 
              variant="contained" 
              type="submit"
            >
              Create Account
            </SubmitButton>
          </Box>
          
          <Box mt={3} textAlign="center">
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                color: theme.palette.text.secondary,
              }}
            >
              Already have an account?{" "}
              <Box
                component="span"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
                onClick={() => navigate('/login')}
              >
                Log In
              </Box>
            </Typography>
          </Box>
        </CardContent>
      </SignupCard>
      
      {/* Error Snackbar */}
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError("")}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setError("")} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
      
      {/* Success Snackbar */}
      <Snackbar 
        open={success} 
        autoHideDuration={6000} 
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSuccess(false)} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          You have successfully signed up as a student!
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}

export default StudentSignUpPage;
