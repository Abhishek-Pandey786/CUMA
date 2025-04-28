import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent,
  CardActions,
  Grid,
  Paper,
  Avatar,
  Button,
  Divider,
  alpha,
  useTheme,
  Stack,
  Fade,
  Zoom,
  IconButton,
  Tooltip,
  Badge,
  Chip
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion } from "framer-motion";
import { 
  Person as PersonIcon,
  Book as CourseIcon,
  EventNote as EventIcon,
  Logout as LogoutIcon,
  School as SchoolIcon,
  SmartToy as RobotIcon,
  ArrowForward as ArrowIcon,
  Notifications as NotificationIcon,
  BarChart as AnalyticsIcon,
  Email as EmailIcon,
  Grade as GradeIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  backgroundSize: '400% 400%',
  animation: `${gradientShift} 15s ease infinite`,
  padding: theme.spacing(4, 2),
  overflowX: 'hidden',
}));

const WelcomeCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  marginBottom: theme.spacing(5),
  background: 'linear-gradient(45deg, #0d47a1, #1976d2, #42a5f5)',
  backgroundSize: '300% 300%',
  animation: `${gradientShift} 10s ease infinite`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
    transform: 'translateY(-5px)'
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '5px',
    background: 'linear-gradient(90deg, #00c6fb, #005bea)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '30%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)',
    zIndex: 1,
  }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  color: theme.palette.primary.main,
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
  fontSize: '3rem',
  marginBottom: theme.spacing(2),
  animation: `${float} 4s ease infinite`,
}));

const ContentContainer = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
  padding: theme.spacing(5),
  background: alpha('#fff', 0.97),
  marginBottom: theme.spacing(4),
  backdropFilter: 'blur(10px)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at bottom right, rgba(25, 118, 210, 0.1), transparent 60%)',
    zIndex: 0,
  }
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  height: '100%',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, transparent 70%, rgba(0,0,0,0.15))',
    zIndex: 1,
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },
  '&:hover::after': {
    opacity: 1,
  },
  '&::before': {
    content: '"Click to Access"',
    position: 'absolute',
    bottom: 12,
    right: 12,
    background: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    zIndex: 3,
    opacity: 0,
    transform: 'translateY(10px)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  },
  '&:hover::before': {
    opacity: 1,
    transform: 'translateY(0)',
  }
}));

const CardIconContainer = styled(Box)(({ theme, color }) => ({
  background: color,
  color: '#fff',
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.4s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)',
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },
  '&:hover::before': {
    opacity: 1,
  },
  '& svg': {
    fontSize: '3rem',
    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  '&:hover svg': {
    transform: 'scale(1.2) rotate(5deg)',
  }
}));

const CardButton = styled(Button)(({ theme, color }) => ({
  textTransform: 'none',
  borderRadius: '0 0 16px 16px',
  padding: theme.spacing(2, 3),
  margin: 0,
  justifyContent: 'space-between',
  backgroundColor: color,
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 700,
  fontSize: '1.1rem',
  boxShadow: `0 8px 20px ${alpha(color, 0.6)}`,
  position: 'relative',
  width: '100%',
  border: 'none',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: -100,
    width: '70%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'left 0.7s ease',
  },
  '&:hover': {
    backgroundColor: color,
    transform: 'translateY(-3px)',
    boxShadow: `0 12px 25px ${alpha(color, 0.8)}`,
  },
  '&:hover::before': {
    left: '200%',
  },
  '& .MuiButton-endIcon': {
    fontSize: '1.5rem',
    marginLeft: theme.spacing(2),
    transition: 'transform 0.3s ease',
  },
  '&:hover .MuiButton-endIcon': {
    transform: 'translateX(5px)',
  }
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 5,
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  fontWeight: 600,
  fontFamily: "'Poppins', sans-serif",
  textTransform: 'none',
  boxShadow: `0 8px 20px ${alpha('#f44336', 0.3)}`,
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  backgroundColor: '#f44336',
  marginTop: theme.spacing(5),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: -5,
    left: 0,
    width: '100%',
    height: '5px',
    background: 'linear-gradient(90deg, #d32f2f, #f44336)',
    transition: 'transform 0.3s ease',
    transform: 'translateY(5px)',
  },
  '&:hover': {
    backgroundColor: '#d32f2f',
    transform: 'translateY(-5px)',
    boxShadow: `0 12px 25px ${alpha('#f44336', 0.5)}`,
  },
  '&:hover::before': {
    transform: 'translateY(0)',
  }
}));

const AssistantButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  borderRadius: 50,
  backgroundColor: '#00897B',
  color: 'white',
  padding: theme.spacing(2, 4),
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.25)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  textTransform: 'none',
  zIndex: 1000,
  animation: `${pulse} 2s infinite`,
  '&:hover': {
    backgroundColor: '#00796B',
    transform: 'translateY(-7px) scale(1.05)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
  }
}));

const StatsChip = styled(Chip)(({ theme, chipcolor }) => ({
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius * 5,
  padding: theme.spacing(2.5),
  backgroundColor: alpha(chipcolor, 0.25),
  color: '#fff',
  border: `2px solid ${alpha(chipcolor, 0.7)}`,
  fontSize: '0.95rem',
  boxShadow: `0 8px 20px rgba(0, 0, 0, 0.25)`,
  transition: 'all 0.3s ease',
  '& .MuiChip-icon': {
    color: '#fff',
    marginRight: theme.spacing(1),
  },
  '& .MuiChip-label': {
    padding: theme.spacing(0, 1),
    fontWeight: 700,
    textShadow: '0 1px 3px rgba(0,0,0,0.3)',
    fontSize: '1rem',
  },
  '&:hover': {
    backgroundColor: alpha(chipcolor, 0.4),
    transform: 'translateY(-5px)',
    boxShadow: `0 10px 25px rgba(0, 0, 0, 0.35)`,
  }
}));

function FacultyDashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const facultyInfo = JSON.parse(localStorage.getItem("facultyInfo"));
  const facultyName = facultyInfo ? facultyInfo.fullName : "Faculty";
  const department = facultyInfo ? facultyInfo.department : "Not Available";

  // Simulated data for visual appeal
  const [stats, setStats] = useState({
    students: 148,
    courses: 5,
    assignments: 12,
    messages: 8
  });

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('facultyToken');
    localStorage.removeItem('facultyInfo');
    navigate("/login");
  };

  // Define card colors
  const cardColors = {
    profile: '#3949AB',
    courses: '#00ACC1',
    events: '#7B1FA2'
  };

  const chipColors = {
    students: '#3949AB',
    courses: '#00ACC1',
    assignments: '#4CAF50',
    messages: '#F9A825'
  };

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <Fade in={loaded} timeout={800}>
          <WelcomeCard>
            <CardContent sx={{ p: 5 }}>
              <Stack direction="column" alignItems="center" spacing={2} sx={{ position: 'relative', zIndex: 2 }}>
                <StyledAvatar>
                  <SchoolIcon fontSize="inherit" />
                </StyledAvatar>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  align="center"
                  sx={{ 
                    color: 'white',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 800,
                    textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    mb: 1
                  }}
                >
                  Welcome Dr. {facultyName}!
                </Typography>
                <Typography 
                  variant="h6"
                  align="center"
                  sx={{ 
                    color: alpha('#fff', 0.95),
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    textShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  }}
                >
                  Department of {department}
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Tooltip title="Your Students">
                    <StatsChip 
                      icon={<PersonIcon />} 
                      label={`${stats.students} Students`} 
                      chipcolor={theme.palette.primary.dark}
                      sx={{ background: `linear-gradient(45deg, ${chipColors.students}, ${alpha(chipColors.students, 0.7)})` }}
                    />
                  </Tooltip>
                  <Tooltip title="Active Courses">
                    <StatsChip 
                      icon={<CourseIcon />} 
                      label={`${stats.courses} Courses`} 
                      chipcolor={theme.palette.info.dark}
                      sx={{ background: `linear-gradient(45deg, ${chipColors.courses}, ${alpha(chipColors.courses, 0.7)})` }}
                    />
                  </Tooltip>
                  <Tooltip title="Pending Assignments">
                    <StatsChip 
                      icon={<GradeIcon />} 
                      label={`${stats.assignments} Assignments`} 
                      chipcolor={theme.palette.success.dark}
                      sx={{ background: `linear-gradient(45deg, ${chipColors.assignments}, ${alpha(chipColors.assignments, 0.7)})` }}
                    />
                  </Tooltip>
                  <Tooltip title="Unread Messages">
                    <StatsChip 
                      icon={<EmailIcon />} 
                      label={`${stats.messages} Messages`} 
                      chipcolor={theme.palette.warning.dark}
                      sx={{ background: `linear-gradient(45deg, ${chipColors.messages}, ${alpha(chipColors.messages, 0.7)})` }}
                    />
                  </Tooltip>
                </Stack>
              </Stack>
            </CardContent>
          </WelcomeCard>
        </Fade>

        <Zoom in={loaded} style={{ transitionDelay: loaded ? '300ms' : '0ms' }}>
          <ContentContainer>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              mb: 6,
              position: 'relative',
              zIndex: 2
            }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: '50%',
                    height: '4px',
                    background: 'linear-gradient(90deg, #3949AB, transparent)',
                    borderRadius: '2px'
                  }
                }}
              >
                Faculty Dashboard
              </Typography>
            </Box>
            
            <Typography 
              variant="h5" 
              align="center"
              sx={{ 
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                mb: 5,
                color: theme.palette.text.primary,
                position: 'relative',
                zIndex: 2
              }}
            >
              Manage your courses and interact with students
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Fade 
                  in={loaded} 
                  style={{ 
                    transitionDelay: loaded ? '500ms' : '0ms',
                    transformOrigin: 'center'
                  }}
                >
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => navigate("/faculty-profile")}
                  >
                    <FeatureCard>
                      <CardIconContainer color={cardColors.profile}>
                        <PersonIcon />
                      </CardIconContainer>
                      <CardContent sx={{ p: 4, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography 
                            variant="h5" 
                            component="h3"
                            sx={{ 
                              fontFamily: "'Montserrat', sans-serif",
                              fontWeight: 700,
                              mb: 2
                            }}
                          >
                            My Profile
                          </Typography>
                          <Typography 
                            variant="body1"
                            sx={{ 
                              fontFamily: "'Poppins', sans-serif",
                              color: theme.palette.text.secondary,
                              fontSize: '1.05rem',
                              mb: 3
                            }}
                          >
                            View and update your profile information
                          </Typography>
                        </Box>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'center', p: 0, mt: 'auto' }}>
                        <CardButton 
                          fullWidth 
                          variant="contained" 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/faculty-profile");
                          }}
                          endIcon={<ArrowIcon />}
                          color={cardColors.profile}
                          disableElevation
                        >
              View Profile
                        </CardButton>
                      </CardActions>
                    </FeatureCard>
                  </motion.div>
                </Fade>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Fade 
                  in={loaded} 
                  style={{ 
                    transitionDelay: loaded ? '700ms' : '0ms',
                    transformOrigin: 'center'
                  }}
                >
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => navigate("/faculty-my-courses")}
                  >
                    <FeatureCard>
                      <CardIconContainer color={cardColors.courses}>
                        <CourseIcon />
                      </CardIconContainer>
                      <CardContent sx={{ p: 4, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography 
                            variant="h5" 
                            component="h3"
                            sx={{ 
                              fontFamily: "'Montserrat', sans-serif",
                              fontWeight: 700,
                              mb: 2
                            }}
                          >
                            My Courses
                          </Typography>
                          <Typography 
                            variant="body1"
                            sx={{ 
                              fontFamily: "'Poppins', sans-serif",
                              color: theme.palette.text.secondary,
                              fontSize: '1.05rem',
                              mb: 3
                            }}
                          >
                            Access your course materials and resources
                          </Typography>
                        </Box>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'center', p: 0, mt: 'auto' }}>
                        <CardButton 
                          fullWidth 
                          variant="contained" 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/faculty-my-courses");
                          }}
                          endIcon={<ArrowIcon />}
                          color={cardColors.courses}
                          disableElevation
                        >
              View Courses
                        </CardButton>
                      </CardActions>
                    </FeatureCard>
                  </motion.div>
                </Fade>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Fade 
                  in={loaded} 
                  style={{ 
                    transitionDelay: loaded ? '900ms' : '0ms',
                    transformOrigin: 'center'
                  }}
                >
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => navigate("/faculty-classes-events")}
                  >
                    <FeatureCard>
                      <CardIconContainer color={cardColors.events}>
                        <EventIcon />
                      </CardIconContainer>
                      <CardContent sx={{ p: 4, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography 
                            variant="h5" 
                            component="h3"
                            sx={{ 
                              fontFamily: "'Montserrat', sans-serif",
                              fontWeight: 700,
                              mb: 2
                            }}
                          >
                            Classes & Events
                          </Typography>
                          <Typography 
                            variant="body1"
                            sx={{ 
                              fontFamily: "'Poppins', sans-serif",
                              color: theme.palette.text.secondary,
                              fontSize: '1.05rem',
                              mb: 3
                            }}
                          >
                            View your schedule and upcoming events
                          </Typography>
                        </Box>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'center', p: 0, mt: 'auto' }}>
                        <CardButton 
                          fullWidth 
                          variant="contained" 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/faculty-classes-events");
                          }}
                          endIcon={<ArrowIcon />}
                          color={cardColors.events}
                          disableElevation
                        >
              View Schedule
                        </CardButton>
                      </CardActions>
                    </FeatureCard>
                  </motion.div>
                </Fade>
              </Grid>
            </Grid>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <LogoutButton 
                variant="contained" 
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Logout
              </LogoutButton>
            </Box>
          </ContentContainer>
        </Zoom>
      </Container>
      
      {/* AI Assistant Button */}
      <Zoom in={loaded} style={{ transitionDelay: loaded ? '1000ms' : '0ms' }}>
        <AssistantButton 
          variant="contained" 
          startIcon={<RobotIcon />}
          onClick={() => navigate('/translation')}
        >
          AI Assistant
        </AssistantButton>
      </Zoom>
    </PageContainer>
  );
}

export default FacultyDashboard;
