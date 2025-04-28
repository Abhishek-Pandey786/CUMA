import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Chip,
  Card,
  CardContent,
  Avatar,
  useTheme,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress,
  alpha
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  People as PeopleIcon, 
  Description as DescriptionIcon,  
  Psychology as PsychologyIcon, 
  QuestionAnswer as QuestionAnswerIcon, 
  Dashboard as DashboardIcon,
  Refresh as RefreshIcon,
  SmartToy as SmartToyIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { FaUserCircle } from "react-icons/fa";

// Custom font import (make sure to add this to your index.html as well)
// Styled components
const StatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'default',
  borderRadius: theme.shape.borderRadius * 2,
  background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  }
}));

const IconContainer = styled(Box)(({ theme, color }) => ({
  backgroundColor: color || theme.palette.primary.main,
  borderRadius: '50%',
  width: 66,
  height: 66,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: '50%',
    background: `linear-gradient(45deg, ${alpha(color || theme.palette.primary.main, 0.6)}, transparent)`,
    opacity: 0.4,
    zIndex: -1,
  }
}));

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  backgroundSize: '200% 200%',
  animation: 'gradientFlow 15s ease infinite',
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

const TableCard = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  '& .MuiTableRow-root:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600
}));

const GradientText = styled(Typography)(({ theme, gradient }) => ({
  background: gradient || 'linear-gradient(45deg, #3498db, #1abc9c)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
  fontWeight: 700,
  letterSpacing: '0.5px',
}));

function AdminHomePage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalUsers: 0,
      totalReports: 0,
      totalAIResponses: 0,
      totalQueries: 0
    },
    users: []
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Get current admin email from localStorage
  const currentAdminEmail = localStorage.getItem('adminEmail');

  // Colors for stats cards
  const cardColors = {
    users: '#3498db',
    reports: '#f39c12',
    aiResponses: '#9b59b6',
    queries: '#1abc9c'
  };

    const fetchDashboardStats = async () => {
      try {
      setRefreshing(true);
        const response = await fetch('http://localhost:5000/api/admin/dashboard-stats');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch dashboard stats');
        }
        
        setDashboardData(data);
      setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
    } finally {
      setRefreshing(false);
      }
    };

  useEffect(() => {
    fetchDashboardStats();
    
    // Set up periodic refresh every 30 seconds
    const intervalId = setInterval(fetchDashboardStats, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleRefresh = () => {
    fetchDashboardStats();
  };

  const handleLaunchAI = async () => {
    try {
      const response = await fetch('http://localhost:5000/launch-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          userRole: 'Admin'
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to launch AI Assistant');
      }
      
      window.open('http://localhost:8501', '_blank');
    } catch (error) {
      console.error('Error launching AI Assistant:', error);
    }
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{ 
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <CircularProgress sx={{ color: 'white' }} size={60} />
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'white',
            fontFamily: "'Poppins', sans-serif",
            mt: 2,
            fontWeight: 500,
            letterSpacing: 1
          }}
        >
          Loading Dashboard...
        </Typography>
      </Box>
    );
  }

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
          <Box>
            <Typography 
              variant="h3" 
              component="h1" 
              color="white" 
              sx={{ 
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                letterSpacing: 1,
                mb: 1
              }}
            >
              Admin Dashboard
            </Typography>
            <Typography 
              variant="subtitle1" 
              color="white" 
              sx={{ 
                opacity: 0.9,
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                letterSpacing: 0.5
              }}
            >
              Manage your platform and monitor usage statistics
            </Typography>
          </Box>
          
          <Box>
            <Tooltip title="Refresh Dashboard">
              <IconButton 
                onClick={handleRefresh} 
                disabled={refreshing}
                sx={{ 
                  color: 'white', 
                  marginRight: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }
                }}
              >
                {refreshing ? <CircularProgress size={24} sx={{ color: 'white' }} /> : <RefreshIcon />}
              </IconButton>
            </Tooltip>
            
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DashboardIcon />}
        onClick={() => navigate("/admin-dashboard")}
              sx={{ 
                mr: 2,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                '&:hover': {
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                },
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                textTransform: 'none',
                padding: '8px 20px',
                borderRadius: '8px'
              }}
            >
              Admin Panel
            </Button>
            
            <Button
              variant="contained"
              color="success"
              startIcon={<SmartToyIcon />}
              onClick={handleLaunchAI}
              sx={{
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                '&:hover': {
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                },
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                textTransform: 'none',
                padding: '8px 20px',
                borderRadius: '8px'
              }}
            >
              Launch AI Assistant
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard elevation={3}>
              <IconContainer color={cardColors.users}>
                <PeopleIcon sx={{ color: 'white', fontSize: 32 }} />
              </IconContainer>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontFamily: "'Poppins', sans-serif", 
                  fontWeight: 600, 
                  color: '#555', 
                  mb: 1 
                }}
              >
                Total Users
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontFamily: "'Montserrat', sans-serif", 
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #2193b0, #6dd5ed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {dashboardData.stats.totalUsers}
              </Typography>
            </StatsCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard elevation={3}>
              <IconContainer color={cardColors.reports}>
                <DescriptionIcon sx={{ color: 'white', fontSize: 32 }} />
              </IconContainer>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontFamily: "'Poppins', sans-serif", 
                  fontWeight: 600, 
                  color: '#555', 
                  mb: 1 
                }}
              >
                Reports
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontFamily: "'Montserrat', sans-serif", 
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #f7971e, #ffd200)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {dashboardData.stats.totalReports}
              </Typography>
            </StatsCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard elevation={3}>
              <IconContainer color={cardColors.aiResponses}>
                <PsychologyIcon sx={{ color: 'white', fontSize: 32 }} />
              </IconContainer>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontFamily: "'Poppins', sans-serif", 
                  fontWeight: 600, 
                  color: '#555', 
                  mb: 1 
                }}
              >
                AI Responses
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontFamily: "'Montserrat', sans-serif", 
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #8e2de2, #4a00e0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {dashboardData.stats.totalAIResponses}
              </Typography>
            </StatsCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard elevation={3}>
              <IconContainer color={cardColors.queries}>
                <QuestionAnswerIcon sx={{ color: 'white', fontSize: 32 }} />
              </IconContainer>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontFamily: "'Poppins', sans-serif", 
                  fontWeight: 600, 
                  color: '#555', 
                  mb: 1 
                }}
              >
                Queries
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontFamily: "'Montserrat', sans-serif", 
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #11998e, #38ef7d)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {dashboardData.stats.totalQueries}
              </Typography>
            </StatsCard>
          </Grid>
        </Grid>

        {/* Users Table */}
        <Box sx={{ mt: 5 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 3 
            }}
          >
            <Typography 
              variant="h5" 
              component="h2" 
              color="white" 
              sx={{ 
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700, 
                textShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <PeopleIcon sx={{ fontSize: 28 }} /> Logged In Users
            </Typography>
            <Chip 
              label={`${dashboardData.users.length} Active User${dashboardData.users.length !== 1 ? 's' : ''}`} 
              color="primary" 
              sx={{ 
                fontWeight: 500,
                fontFamily: "'Poppins', sans-serif",
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
              }}
            />
          </Box>
          
          <TableCard>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.grey[900] }}>
                    <StyledTableCell sx={{ color: 'white', fontSize: '0.95rem' }}>Name</StyledTableCell>
                    <StyledTableCell sx={{ color: 'white', fontSize: '0.95rem' }}>Email</StyledTableCell>
                    <StyledTableCell sx={{ color: 'white', fontSize: '0.95rem' }}>Role</StyledTableCell>
                    <StyledTableCell sx={{ color: 'white', fontSize: '0.95rem' }}>Join Date</StyledTableCell>
                    <StyledTableCell sx={{ color: 'white', fontSize: '0.95rem' }}>Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardData.users.length > 0 ? (
                    dashboardData.users.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Avatar 
                              src={user.profilePic}
                              sx={{ 
                                bgcolor: user.role === 'Admin' ? 'primary.main' : 
                                        user.role === 'Student' ? 'secondary.main' : 'success.main',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                              }}
                            >
                              {!user.profilePic && user.fullName.charAt(0)}
                            </Avatar>
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                fontFamily: "'Poppins', sans-serif", 
                                fontWeight: 500 
                              }}
                            >
                    {user.fullName}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>{user.email}</TableCell>
                        <TableCell>
                          <Chip 
                            label={user.role} 
                            size="small"
                            sx={{ 
                              bgcolor: user.role === 'Admin' ? 'primary.main' : 
                                      user.role === 'Student' ? 'secondary.main' : 'success.main',
                              color: 'white',
                              fontWeight: 500,
                              fontFamily: "'Poppins', sans-serif",
                              fontSize: '0.75rem'
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>{user.joinDate}</TableCell>
                        <TableCell>
                          <Chip 
                            label={user.role === 'Admin' && user.email === currentAdminEmail ? 'Active' : 'Inactive'} 
                            size="small"
                            sx={{ 
                              bgcolor: user.role === 'Admin' && user.email === currentAdminEmail ? 
                                      'success.main' : 'error.main',
                              color: 'white',
                              fontWeight: 500,
                              fontFamily: "'Poppins', sans-serif",
                              fontSize: '0.75rem'
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            color: 'text.secondary',
                            fontFamily: "'Poppins', sans-serif",
                            py: 3
                          }}
                        >
                          No users found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TableCard>
        </Box>
      </Container>
    </PageContainer>
  );
}

export default AdminHomePage;
