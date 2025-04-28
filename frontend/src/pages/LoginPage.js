import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  Grid,
  alpha,
  useTheme,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  AdminPanelSettings as AdminIcon,
  School as StudentIcon,
  WorkOutline as FacultyIcon
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

const LoginCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
  overflow: 'hidden',
  width: '100%',
  maxWidth: 500,
  padding: theme.spacing(5, 3),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '8px',
    background: 'linear-gradient(90deg, #3498db, #1abc9c)',
  }
}));

const RoleButton = styled(Button)(({ theme, bgcolor }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(2, 3),
  fontSize: '1.1rem',
  fontWeight: 500,
  fontFamily: "'Poppins', sans-serif",
  textTransform: 'none',
  display: 'flex',
  gap: theme.spacing(1.5),
  boxShadow: `0 5px 15px ${alpha(bgcolor, 0.3)}`,
  transition: 'all 0.3s ease',
  backgroundColor: bgcolor,
  '&:hover': {
    backgroundColor: bgcolor,
    transform: 'translateY(-3px)',
    boxShadow: `0 8px 20px ${alpha(bgcolor, 0.4)}`,
  }
}));

function LoginPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  // Button colors
  const adminColor = '#3F51B5';
  const facultyColor = '#8E24AA';
  const studentColor = '#00897B';

  const handleAdminClick = () => navigate('/admin-login');
  const handleFacultyClick = () => navigate('/faculty-login');
  const handleStudentClick = () => navigate('/student-login');

  return (
    <PageContainer>
      <LoginCard>
        <CardContent sx={{ p: 2 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            align="center" 
            gutterBottom
            sx={{ 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              mb: 1,
              background: 'linear-gradient(45deg, #3498db, #1abc9c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome
          </Typography>
          
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              color: theme.palette.text.secondary,
              mb: 4,
            }}
          >
            Select your role to continue
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <RoleButton 
                  variant="contained"
                  fullWidth
                  onClick={handleAdminClick}
                  startIcon={<AdminIcon sx={{ fontSize: 28 }} />}
                  bgcolor={adminColor}
                >
                  Admin
                </RoleButton>
              </Grid>
              
              <Grid item xs={12}>
                <RoleButton 
                  variant="contained"
                  fullWidth
                  onClick={handleFacultyClick}
                  startIcon={<FacultyIcon sx={{ fontSize: 28 }} />}
                  bgcolor={facultyColor}
                >
                  Faculty
                </RoleButton>
              </Grid>
              
              <Grid item xs={12}>
                <RoleButton 
                  variant="contained"
                  fullWidth
                  onClick={handleStudentClick}
                  startIcon={<StudentIcon sx={{ fontSize: 28 }} />}
                  bgcolor={studentColor}
                >
                  Student
                </RoleButton>
              </Grid>
            </Grid>
          </Box>
          
          <Box mt={4} textAlign="center">
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                color: theme.palette.text.secondary,
              }}
            >
              Don't have an account?{" "}
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
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Box>
            </Typography>
          </Box>
        </CardContent>
      </LoginCard>
    </PageContainer>
  );
}

export default LoginPage;
