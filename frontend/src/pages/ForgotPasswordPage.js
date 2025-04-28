import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  useTheme,
  Fade,
  alpha
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
  AccessTime as ClockIcon,
  Email as EmailIcon,
  VpnKey as KeyIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  padding: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
}));

const ContentCard = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.15)',
  padding: theme.spacing(6),
  maxWidth: 500,
  width: '100%',
  textAlign: 'center',
  position: 'relative',
  overflow: 'visible',
  margin: '0 auto',
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 700,
  marginBottom: theme.spacing(4),
  color: theme.palette.text.primary,
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -10,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 60,
    height: 4,
    borderRadius: 2,
    background: theme.palette.primary.main,
  }
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: alpha(theme.palette.info.main, 0.1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  color: theme.palette.info.main,
  border: `2px solid ${alpha(theme.palette.info.main, 0.3)}`,
  boxShadow: `0 5px 15px ${alpha(theme.palette.info.main, 0.2)}`,
  animation: `${float} 3s ease-in-out infinite, ${pulse} 6s ease-in-out infinite`,
  '& svg': {
    fontSize: '2.8rem',
  },
}));

const ComingSoonTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
}));

const MessageText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Poppins', sans-serif",
  marginBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const StyledStepper = styled(Stepper)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiStepLabel-root .Mui-completed': {
    color: theme.palette.success.main,
  },
  '& .MuiStepLabel-label': {
    fontFamily: "'Poppins', sans-serif",
  }
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
    }
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  padding: theme.spacing(1.2),
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  marginTop: theme.spacing(2),
  '&:hover': {
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-2px)',
  }
}));

function ForgotPasswordPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [formData, setFormData] = useState({
    email: "",
    userType: "",
    code: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [resetToken, setResetToken] = useState("");

  const steps = ['Email Verification', 'Code Verification', 'Reset Password'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  const handleEmailSubmit = async () => {
    if (!formData.email || !formData.userType) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          userType: formData.userType
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Verification code sent to your email!");
        setActiveStep(1);
      } else {
        setError(data.message || "Failed to send verification code");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeVerification = async () => {
    if (!formData.code) {
      setError("Please enter the verification code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch('http://localhost:5000/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          userType: formData.userType,
          code: formData.code
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResetToken(data.resetToken);
        setSuccess("Code verified successfully!");
        setActiveStep(2);
      } else {
        setError(data.message || "Invalid verification code");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!formData.newPassword || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resetToken,
          newPassword: formData.newPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password reset successful!");
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || "Failed to reset password");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>User Type</InputLabel>
              <Select
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                label="User Type"
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="faculty">Faculty</MenuItem>
              </Select>
            </FormControl>
            <StyledTextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />
              }}
            />
            <SubmitButton
              fullWidth
              variant="contained"
              onClick={handleEmailSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Send Verification Code"}
            </SubmitButton>
          </>
        );
      case 1:
        return (
          <>
            <StyledTextField
              fullWidth
              label="Verification Code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: <KeyIcon sx={{ mr: 1, color: 'action.active' }} />
              }}
            />
            <SubmitButton
              fullWidth
              variant="contained"
              onClick={handleCodeVerification}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Verify Code"}
            </SubmitButton>
          </>
        );
      case 2:
        return (
          <>
            <StyledTextField
              fullWidth
              label="New Password"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: <LockIcon sx={{ mr: 1, color: 'action.active' }} />
              }}
            />
            <StyledTextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: <LockIcon sx={{ mr: 1, color: 'action.active' }} />
              }}
            />
            <SubmitButton
              fullWidth
              variant="contained"
              onClick={handlePasswordReset}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Reset Password"}
            </SubmitButton>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <Container maxWidth="sm">
        <Fade in={true} timeout={800}>
          <ContentCard elevation={3}>
            <PageTitle variant="h4">
              Reset Password
            </PageTitle>

            <StyledStepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </StyledStepper>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                {success}
              </Alert>
            )}

            {renderStepContent(activeStep)}
          </ContentCard>
        </Fade>
      </Container>
    </PageContainer>
  );
}

export default ForgotPasswordPage;
