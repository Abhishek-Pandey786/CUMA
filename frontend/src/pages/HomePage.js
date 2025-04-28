import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  useTheme,
  useMediaQuery,
  Paper,
  Avatar,
  Link
} from '@mui/material';
import {
  Chat as ChatIcon,
  School as SchoolIcon,
  Translate as TranslateIcon,
  KeyboardArrowRight as ArrowIcon,
  PlayArrow as PlayIcon
} from '@mui/icons-material';
import christImage from '../assets/christ.png';
import studentImage from '../assets/student-profile.jpg';
import professorImage from '../assets/professor-profile.jpg';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
  color: 'white',
  padding: theme.spacing(12, 2, 8),
  position: 'relative',
  overflow: 'hidden',
  clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(8, 2, 6),
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
    zIndex: 1,
  }
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
}));

const FeatureIcon = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  backgroundColor: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  borderRadius: 16,
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
  },
}));

const TestimonialCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5, 4),
  textAlign: 'center',
  borderRadius: 16,
  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,240,240,0.9) 100%)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  margin: theme.spacing(2),
  position: 'relative',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255,255,255,0.2)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '4px',
    width: '100%',
    background: 'linear-gradient(90deg, #2ecc71, #3498db)',
  }
}));

const QuoteIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 15,
  left: 20,
  fontSize: '5rem',
  fontWeight: 'bold',
  opacity: 0.07,
  color: theme.palette.primary.dark,
  fontFamily: 'Georgia, serif',
  lineHeight: 1,
  transform: 'rotate(-5deg)',
}));

const CTAButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: 30,
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
  }
}));

const ChristLogo = styled('img')({
  height: 50,
  marginRight: 16,
  marginBottom: 16,
});

const PlayButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  borderRadius: 50,
  padding: theme.spacing(1, 2),
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  }
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: 'rgba(255,255,255,0.8)',
  margin: theme.spacing(0, 2),
  textDecoration: 'none',
  '&:hover': {
    color: 'white',
    textDecoration: 'none',
  }
}));

function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <HeroSection>
        <StyledContainer maxWidth="md">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box display="flex" alignItems="center">
                <ChristLogo src={christImage} alt="Christ University Logo" />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.15)', 
                    px: 1.5, 
                    py: 0.5, 
                    borderRadius: 5,
                    fontSize: '0.7rem'
                  }}
                >
                  CHRIST UNIVERSITY
                </Typography>
              </Box>
              
              <Typography 
                variant="h2" 
                component="h1" 
                fontWeight="700" 
                sx={{ 
                  mb: 2, 
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  lineHeight: 1.2,
                }}
              >
                Multilingual AI Assistant for Every Student
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  opacity: 0.85, 
                  mb: 4,
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  maxWidth: '90%'
                }}
              >
                Breaking language barriers in education with our innovative AI assistant that understands and communicates in multiple languages.
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <CTAButton 
                  variant="contained" 
                  color="secondary" 
                  component={RouterLink} 
                  to="/signup"
                  endIcon={<ArrowIcon />}
                >
            Get Started
                </CTAButton>
                <PlayButton
                  variant="outlined"
                  color="inherit"
                  startIcon={<PlayIcon />}
                  component={RouterLink}
                  to="/about"
                >
                  Learn more
                </PlayButton>
              </Box>
            </Grid>
            
            {!isMobile && (
              <Grid item md={5}>
                <Box 
                  sx={{ 
                    position: 'relative', 
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: 200,
                      height: 200,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(5px)',
                      zIndex: -1,
                      bottom: -30,
                      right: -30,
                    }
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    alt="Students using AI assistant"
                    sx={{
                      width: '100%',
                      borderRadius: 3,
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                      transform: 'perspective(800px) rotateY(-5deg)',
                    }}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </StyledContainer>
      </HeroSection>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={8}>
          <Typography 
            variant="overline" 
            component="div" 
            color="primary" 
            fontWeight="600"
            sx={{ mb: 1 }}
          >
            WHAT WE OFFER
          </Typography>
          <Typography 
            variant="h3" 
            component="h2" 
            fontWeight="700" 
            sx={{ mb: 2 }}
          >
            Key Features
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Our multilingual assistant is designed to make communication and learning seamless for students and faculty from diverse linguistic backgrounds.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flexGrow: 1 }}>
                <FeatureIcon>
                  <ChatIcon fontSize="large" />
                </FeatureIcon>
                <Typography variant="h5" component="h3" fontWeight="600" sx={{ mb: 2 }}>
                  Multilingual Chat
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Communicate seamlessly in multiple languages with our intelligent AI assistant that translates in real-time.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flexGrow: 1 }}>
                <FeatureIcon sx={{ bgcolor: theme.palette.secondary.main }}>
                  <TranslateIcon fontSize="large" />
                </FeatureIcon>
                <Typography variant="h5" component="h3" fontWeight="600" sx={{ mb: 2 }}>
                  Smart Translation
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Translate documents, conversations, and lectures between multiple languages instantly with high accuracy.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flexGrow: 1 }}>
                <FeatureIcon sx={{ bgcolor: '#e74c3c' }}>
                  <SchoolIcon fontSize="large" />
                </FeatureIcon>
                <Typography variant="h5" component="h3" fontWeight="600" sx={{ mb: 2 }}>
                  Academic Support
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Get intelligent academic assistance for research, assignments, and learning resources across languages.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #2980b9 0%, #3498db 100%)',
          py: 10, 
          color: 'white', 
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
            backgroundRepeat: 'no-repeat',
          }
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography 
              variant="overline" 
              component="div" 
              sx={{ 
                color: 'rgba(255,255,255,0.9)', 
                mb: 1,
                fontWeight: 600,
                letterSpacing: 2,
                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              TESTIMONIALS
            </Typography>
            <Typography 
              variant="h3" 
              component="h2" 
              fontWeight="700" 
              sx={{ 
                mb: 2,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '80px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #fff, rgba(255,255,255,0.5))',
                  bottom: '-10px',
                  left: 'calc(50% - 40px)',
                  borderRadius: '2px'
                }
              }}
            >
              What Our Users Say
            </Typography>
            <Typography 
              variant="subtitle1"
              sx={{ 
                mt: 4, 
                opacity: 0.9, 
                maxWidth: 700, 
                mx: 'auto',
                fontWeight: 300
              }}
            >
              Discover how our multilingual AI assistant is transforming education for students and faculty alike
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <TestimonialCard elevation={0}>
                <QuoteIcon>"</QuoteIcon>
                <Avatar
                  alt="Kishan Kumar"
                  src={studentImage}
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mx: 'auto', 
                    mb: 3,
                    border: '4px solid white',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                />
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: '1.1rem', 
                    mb: 3, 
                    color: 'text.secondary', 
                    fontStyle: 'italic', 
                    position: 'relative',
                    lineHeight: 1.7
                  }}
                >
                  The multilingual assistant has transformed how various students interact with course materials. It's so much easier to understand complex topics in our native languages.
                </Typography>
                <Divider 
                  sx={{ 
                    mb: 2,
                    '&::before, &::after': {
                      borderColor: 'rgba(0,0,0,0.1)',
                    }
                  }} 
                />
                <Typography variant="subtitle1" fontWeight="700" color="primary.main">
                  Kishan Kumar
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    MCA Student
                  </Typography>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                    • 2nd Year
                  </Typography>
                </Box>
              </TestimonialCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <TestimonialCard elevation={0}>
                <QuoteIcon>"</QuoteIcon>
                <Avatar
                  alt="Dr. Deepa V. Jose"
                  src={professorImage}
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mx: 'auto', 
                    mb: 3,
                    border: '4px solid white',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                />
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: '1.1rem', 
                    mb: 3, 
                    color: 'text.secondary', 
                    fontStyle: 'italic', 
                    position: 'relative',
                    lineHeight: 1.7
                  }}
                >
                  As a professor, I find the AI assistant invaluable for communicating effectively with international students. It helps bridge language gaps that previously hindered learning.
                </Typography>
                <Divider 
                  sx={{ 
                    mb: 2,
                    '&::before, &::after': {
                      borderColor: 'rgba(0,0,0,0.1)',
                    }
                  }} 
                />
                <Typography variant="subtitle1" fontWeight="700" color="primary.main">
                  Dr. Deepa V. Jose
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    Professor
                  </Typography>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                    • Computer Science
                  </Typography>
                </Box>
              </TestimonialCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography 
            variant="h3" 
            component="h2" 
            fontWeight="700" 
            sx={{ mb: 3 }}
          >
            Ready to Break Language Barriers?
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
          >
            Join thousands of students and faculty who are already using our multilingual AI assistant to communicate across languages.
          </Typography>
          <CTAButton 
            variant="contained" 
            color="secondary" 
            size="large" 
            component={RouterLink} 
            to="/signup"
          >
            Sign Up Today
          </CTAButton>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#2c3e50', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center" mb={2}>
                <ChristLogo src={christImage} alt="Christ University Logo" />
                <Typography variant="h6" fontWeight="700">
                  CUMA
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
                Christ University Multilingual Assistant
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                © 2025 Christ University. All rights reserved.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Quick Links
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                <Box component="li" mb={1}>
                  <FooterLink component={RouterLink} to="/about">About Us</FooterLink>
                </Box>
                <Box component="li" mb={1}>
                  <FooterLink component={RouterLink} to="/login">Login</FooterLink>
                </Box>
                <Box component="li" mb={1}>
                  <FooterLink component={RouterLink} to="/signup">Sign Up</FooterLink>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Legal
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                <Box component="li" mb={1}>
                  <FooterLink component={RouterLink} to="/terms">Terms of Service</FooterLink>
                </Box>
                <Box component="li" mb={1}>
                  <FooterLink component={RouterLink} to="/privacy">Privacy Policy</FooterLink>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
