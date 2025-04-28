import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent,
  Grid,
  Paper,
  Avatar,
  Button,
  Divider,
  alpha,
  useTheme,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Person as PersonIcon,
  School as SchoolIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Translate as TranslateIcon,
  Chat as ChatIcon,
  MenuBook as MenuBookIcon,
  EmojiObjects as EmojiObjectsIcon,
  SmartToy as RobotIcon,
  LooksOne as OneIcon,
  LooksTwo as TwoIcon,
  Looks3 as ThreeIcon,
  PictureAsPdf as PdfIcon
} from '@mui/icons-material';

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  backgroundSize: '200% 200%',
  animation: 'gradientFlow 15s ease infinite',
  padding: theme.spacing(4, 2),
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

const WelcomeCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(90deg, #1a237e, #283593)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '5px',
    background: 'linear-gradient(90deg, #3498db, #1abc9c)',
  }
}));

const InfoCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
  }
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  height: '100%',
  padding: theme.spacing(3),
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
    background: alpha(theme.palette.primary.main, 0.05)
  }
}));

const StepCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
  marginBottom: theme.spacing(2),
  background: alpha(theme.palette.background.paper, 0.9)
}));

const FeatureIcon = styled(Box)(({ theme, color }) => ({
  width: 70,
  height: 70,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  backgroundColor: color || theme.palette.primary.main,
  color: '#fff',
  boxShadow: `0 6px 15px ${alpha(color || theme.palette.primary.main, 0.4)}`,
}));

const StepNumber = styled(Avatar)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor || theme.palette.secondary.main,
  color: '#fff',
  width: 35,
  height: 35,
  marginRight: theme.spacing(2),
  boxShadow: `0 4px 10px ${alpha(bgcolor || theme.palette.secondary.main, 0.3)}`,
}));

const AssistantButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  borderRadius: 50,
  backgroundColor: '#00897B',
  color: 'white',
  padding: theme.spacing(1.5, 3),
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#00796B',
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
  }
}));

function StudentPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [joinDate, setJoinDate] = useState("Not Available");
  
  // Get student info from localStorage
  const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));
  const studentName = studentInfo ? studentInfo.fullName : "Student";
  const studentId = studentInfo ? studentInfo.studentId : "Not Available";
  const studentEmail = studentInfo ? studentInfo.email : "Not Available";
  
  // Fetch user data from admin dashboard API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/dashboard-stats');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        
        // Find the current user in the users array
        const currentUser = data.users.find(user => user.email === studentEmail);
        
        if (currentUser && currentUser.joinDate) {
          setJoinDate(currentUser.joinDate);
        } else if (studentInfo && studentInfo.created_at) {
          // Fallback to created_at if available
          setJoinDate(new Date(studentInfo.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Fallback to created_at if available
        if (studentInfo && studentInfo.created_at) {
          setJoinDate(new Date(studentInfo.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }));
        }
      }
    };
    
    fetchUserData();
  }, [studentEmail, studentInfo]);

  // Feature card colors
  const featureColors = {
    language: '#3F51B5',
    translation: '#E91E63',
    academic: '#00BCD4',
    learning: '#4CAF50',
    pdf: '#FF5722'
  };

  // Step number colors
  const stepColors = {
    one: '#FF9800',
    two: '#9C27B0',
    three: '#2196F3'
  };

  const handleAssistantClick = () => {
    navigate('/translation');
  };

  const handlePdfTranslatorClick = () => {
    // Show loading state
    console.log('Launching PDF Translator...');
    
    // Call the API to launch the PDF translator app
    fetch('http://localhost:5001/launch-pdf-translator')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          console.log('PDF Translator app launched successfully');
          alert('PDF Translator app is launching in a new window. Please wait a moment.');
        } else {
          console.error('Failed to launch PDF Translator app:', data.message);
          alert('Failed to launch PDF Translator. Please make sure the server is running on port 5001.');
        }
      })
      .catch(error => {
        console.error('Error launching PDF Translator app:', error);
        alert('Could not connect to the server. Please make sure the Flask server is running on port 5001.');
      });
  };

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <WelcomeCard>
          <CardContent sx={{ p: 4 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              align="center"
              sx={{ 
                color: 'white',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                mb: 1
              }}
            >
              Welcome, {studentName}!
            </Typography>
          </CardContent>
        </WelcomeCard>

        {/* Personal Overview Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            borderRadius: 4, 
            mb: 4, 
            p: 3, 
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
            background: alpha('#fff', 0.95)
          }}
        >
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: theme.palette.text.primary
            }}
          >
            <PersonIcon /> Personal Overview
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <InfoCard>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: alpha(theme.palette.primary.main, 0.1), 
                        color: theme.palette.primary.main,
                        marginRight: 2 
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 600
                      }}
                    >
                      Full Name
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      ml: 7
                    }}
                  >
                    {studentName}
                  </Typography>
                </CardContent>
              </InfoCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <InfoCard>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: alpha(theme.palette.secondary.main, 0.1), 
                        color: theme.palette.secondary.main,
                        marginRight: 2 
                      }}
                    >
                      <SchoolIcon />
                    </Avatar>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 600
                      }}
                    >
                      Student ID
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      ml: 7
                    }}
                  >
                    {studentId}
                  </Typography>
                </CardContent>
              </InfoCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <InfoCard>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: alpha('#00BCD4', 0.1), 
                        color: '#00BCD4',
                        marginRight: 2 
                      }}
                    >
                      <EmailIcon />
                    </Avatar>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 600
                      }}
                    >
                      Email
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      ml: 7,
                      wordBreak: 'break-word'
                    }}
                  >
                    {studentEmail}
                  </Typography>
                </CardContent>
              </InfoCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <InfoCard>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: alpha('#4CAF50', 0.1), 
                        color: '#4CAF50',
                        marginRight: 2 
                      }}
                    >
                      <CalendarIcon />
                    </Avatar>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 600
                      }}
                    >
                      Joined On
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      ml: 7
                    }}
                  >
                    {joinDate}
                  </Typography>
                </CardContent>
              </InfoCard>
            </Grid>
          </Grid>
        </Paper>

        {/* AI Features Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            borderRadius: 4, 
            mb: 4, 
            p: 3, 
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
            background: alpha('#fff', 0.95)
          }}
        >
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: theme.palette.text.primary
            }}
          >
            <RobotIcon /> AI Assistant Features
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard>
                <FeatureIcon color={featureColors.language}>
                  <TranslateIcon sx={{ fontSize: 35 }} />
                </FeatureIcon>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    mb: 1
                  }}
                >
                  Multilingual Support
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    color: theme.palette.text.secondary
                  }}
                >
                  Translate and communicate in multiple languages seamlessly
                </Typography>
              </FeatureCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard>
                <FeatureIcon color={featureColors.translation}>
                  <ChatIcon sx={{ fontSize: 35 }} />
                </FeatureIcon>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    mb: 1
                  }}
                >
                  Real-time Translation
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    color: theme.palette.text.secondary
                  }}
                >
                  Get instant translations for effective communication
                </Typography>
              </FeatureCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard>
                <FeatureIcon color={featureColors.academic}>
                  <MenuBookIcon sx={{ fontSize: 35 }} />
                </FeatureIcon>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    mb: 1
                  }}
                >
                  Academic Support
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    color: theme.palette.text.secondary
                  }}
                >
                  Get assistance with academic terms and concepts
                </Typography>
              </FeatureCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard>
                <FeatureIcon color={featureColors.learning}>
                  <EmojiObjectsIcon sx={{ fontSize: 35 }} />
                </FeatureIcon>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    mb: 1
                  }}
                >
                  Learning Tools
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    color: theme.palette.text.secondary
                  }}
                >
                  Access educational resources in multiple languages
                </Typography>
              </FeatureCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard>
                <FeatureIcon color={featureColors.pdf}>
                  <PdfIcon sx={{ fontSize: 35 }} />
                </FeatureIcon>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    mb: 1
                  }}
                >
                  PDF Translation
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    color: theme.palette.text.secondary,
                    mb: 2
                  }}
                >
                  Translate your study materials from PDF files
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<TranslateIcon />}
                  onClick={handlePdfTranslatorClick}
                  sx={{
                    mt: 1,
                    background: `linear-gradient(90deg, ${featureColors.pdf}, ${alpha(featureColors.pdf, 0.8)})`,
                    '&:hover': {
                      background: `linear-gradient(90deg, ${alpha(featureColors.pdf, 0.8)}, ${featureColors.pdf})`,
                    }
                  }}
                >
                  Translate Notes
                </Button>
              </FeatureCard>
            </Grid>
          </Grid>

        {/* Quick Start Guide */}
          <Box sx={{ mt: 4 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              Quick Start Guide
            </Typography>
            
            <Stack spacing={2}>
              <StepCard>
                <StepNumber bgcolor={stepColors.one}>
                  <OneIcon />
                </StepNumber>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500
                  }}
                >
                  Click the AI Assistant button in the bottom right
                </Typography>
              </StepCard>
              
              <StepCard>
                <StepNumber bgcolor={stepColors.two}>
                  <TwoIcon />
                </StepNumber>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500
                  }}
                >
                  Choose your preferred language pair
                </Typography>
              </StepCard>
              
              <StepCard>
                <StepNumber bgcolor={stepColors.three}>
                  <ThreeIcon />
                </StepNumber>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500
                  }}
                >
                  Start typing or upload text for translation
                </Typography>
              </StepCard>
            </Stack>
          </Box>
        </Paper>
      </Container>

      {/* AI Assistant Button */}
      <AssistantButton 
        variant="contained" 
        startIcon={<RobotIcon />}
        onClick={handleAssistantClick}
      >
        AI Assistant
      </AssistantButton>
    </PageContainer>
  );
}

export default StudentPage;