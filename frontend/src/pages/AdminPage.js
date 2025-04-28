import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  alpha,
  useTheme,
  Fade,
  Zoom
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
  People as UsersIcon,
  Assessment as ReportsIcon
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

const DashboardCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.15)',
  padding: theme.spacing(5),
  maxWidth: 900,
  width: '100%',
  animation: `${fadeIn} 0.6s ease-out forwards`,
  background: alpha(theme.palette.background.paper, 0.95),
  overflow: 'visible',
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 700,
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
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

const DashboardButton = styled(Button)(({ theme, color = 'primary' }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  background: color === 'primary' 
    ? 'linear-gradient(135deg, #3498db, #2980b9)' 
    : 'linear-gradient(135deg, #2ecc71, #27ae60)',
  color: theme.palette.common.white,
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
  height: 190,
  width: 190,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
  },
  animation: `${float} 4s ease-in-out infinite`,
  animationDelay: props => props.delay || '0s',
}));

const IconContainer = styled(Box)(({ theme }) => ({
  fontSize: '3rem',
  marginBottom: theme.spacing(2),
}));

function AdminPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Fade in={true} timeout={800}>
          <DashboardCard>
            <CardTitle variant="h3">
              Admin Dashboard
            </CardTitle>
            <CardContent sx={{ py: 2 }}>
              <Grid container spacing={4} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm="auto">
                  <Zoom in={true} style={{ transitionDelay: '200ms' }}>
                    <DashboardButton 
                      onClick={() => navigate("/admin-users")}
                      delay="0s"
                    >
                      <IconContainer>
                        <UsersIcon fontSize="inherit" />
                      </IconContainer>
                      <Typography variant="h6" component="span" fontFamily="'Poppins', sans-serif">
                        Users
                      </Typography>
                    </DashboardButton>
                  </Zoom>
                </Grid>
                <Grid item xs={12} sm="auto">
                  <Zoom in={true} style={{ transitionDelay: '400ms' }}>
                    <DashboardButton 
                      onClick={() => navigate("/admin-reports")}
                      color="secondary"
                      delay="0.2s"
                    >
                      <IconContainer>
                        <ReportsIcon fontSize="inherit" />
                      </IconContainer>
                      <Typography variant="h6" component="span" fontFamily="'Poppins', sans-serif">
                        Reports
                      </Typography>
                    </DashboardButton>
                  </Zoom>
                </Grid>
              </Grid>
            </CardContent>
          </DashboardCard>
        </Fade>
      </Container>
    </PageContainer>
  );
}

export default AdminPage;
