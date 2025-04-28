import React from "react";
import { styled } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  useTheme,
  Paper,
  Stack
} from '@mui/material';
import {
  Lightbulb as VisionIcon,
  Language as MissionIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

// Import profile images
import abhishekPandeyImg from "../pages/M1.jpg";
import abhishekRoyImg from "../pages/M2.jpg";

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #3498db 0%, #1abc9c 100%)',
  color: 'white',
  padding: theme.spacing(14, 2, 10),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%)',
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)',
    zIndex: 0,
  }
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-30px',
    left: '-100px',
    width: '200px',
    height: '200px',
    border: '3px solid rgba(255,255,255,0.1)',
    borderRadius: '50%',
    zIndex: -1,
    opacity: 0.5,
  }
}));

const ValueCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: 16,
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  background: 'white',
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.14)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '150px',
    height: '150px',
    background: 'radial-gradient(circle, rgba(52, 152, 219, 0.05) 0%, rgba(52, 152, 219, 0) 70%)',
    borderRadius: '50%',
    top: '-30px',
    right: '-30px',
    zIndex: 0,
  }
}));

const CardIcon = styled(Avatar)(({ theme, bgcolor }) => ({
  width: 80,
  height: 80,
  backgroundColor: bgcolor || theme.palette.primary.main,
  margin: '0 auto 20px auto',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
  position: 'relative',
  zIndex: 1,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: '50%',
    background: 'linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0))',
    zIndex: -1,
  }
}));

const TeamCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.05) 100%)',
    pointerEvents: 'none',
  }
}));

const ProfileImage = styled('img')({
  width: '100%',
  height: 320,
  objectFit: 'cover',
  borderBottom: '5px solid #3498db',
  transition: 'transform 0.5s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  }
});

const ContactCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(4),
  borderRadius: 16,
  textAlign: 'center',
  backgroundColor: 'white',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100px',
    height: '100px',
    background: 'radial-gradient(circle, rgba(52, 152, 219, 0.05) 0%, rgba(52, 152, 219, 0) 70%)',
    borderRadius: '50%',
    bottom: '-20px',
    right: '-20px',
  }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  marginBottom: theme.spacing(7),
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '100px',
    height: '4px',
    background: 'linear-gradient(90deg, #3498db, #1abc9c)',
    bottom: '-20px',
    left: 'calc(50% - 50px)',
    borderRadius: '4px'
  }
}));

const DecorativeShape = styled(Box)(({ theme, top, right, bottom, left, size, color, opacity }) => ({
  position: 'absolute',
  width: size || '120px',
  height: size || '120px',
  borderRadius: '50%',
  background: color || 'rgba(52, 152, 219, 0.08)',
  top: top,
  right: right,
  bottom: bottom,
  left: left,
  opacity: opacity || 0.4,
  zIndex: 0,
}));

const SectionWrapper = styled(Box)(({ theme, bgColor }) => ({
  position: 'relative',
  backgroundColor: bgColor || 'transparent',
  overflow: 'hidden',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));

function AboutUsPage() {
  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <Typography 
            variant="h2" 
            component="h1" 
            fontWeight="800" 
            sx={{ 
              mb: 2, 
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              fontSize: { xs: '2.5rem', md: '3.2rem' }
            }}
          >
            About Us
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              opacity: 0.9, 
              maxWidth: 700, 
              mx: 'auto', 
              fontWeight: 300,
              lineHeight: 1.6,
              fontSize: { xs: '1.1rem', md: '1.3rem' }
            }}
          >
            Welcome to the Christ University Multilingual Assistant (CUMA)
          </Typography>
          
          {/* Decorative elements */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: '20%', 
              left: '10%',
              width: '10px',
              height: '10px',
              background: 'white',
              borderRadius: '50%',
              boxShadow: '0 0 20px 5px rgba(255,255,255,0.3)',
              animation: 'pulse 4s infinite',
              '@keyframes pulse': {
                '0%': { opacity: 0.4 },
                '50%': { opacity: 0.8 },
                '100%': { opacity: 0.4 },
              }
            }} 
          />
          <Box 
            sx={{ 
              position: 'absolute', 
              top: '60%', 
              right: '15%',
              width: '15px',
              height: '15px',
              background: 'white',
              borderRadius: '50%',
              boxShadow: '0 0 20px 5px rgba(255,255,255,0.3)',
              animation: 'pulse 6s infinite',
              animationDelay: '2s',
              '@keyframes pulse': {
                '0%': { opacity: 0.4 },
                '50%': { opacity: 0.8 },
                '100%': { opacity: 0.4 },
              }
            }} 
          />
        </HeroContent>
      </HeroSection>

      {/* Mission & Vision Section */}
      <SectionWrapper>
        <DecorativeShape top="-50px" left="-30px" size="150px" />
        <DecorativeShape bottom="-30px" right="-20px" size="100px" color="rgba(46, 204, 113, 0.08)" />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box textAlign="center" mb={4}>
            <SectionTitle
              variant="h3"
              component="h2"
              fontWeight="700"
            >
              Our Mission & Vision
            </SectionTitle>
          </Box>
          
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <ValueCard elevation={3}>
                <CardIcon>
                  <MissionIcon fontSize="large" />
                </CardIcon>
                <Typography variant="h4" component="h3" fontWeight="600" sx={{ mb: 2 }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                  To enable seamless communication across diverse languages, fostering a global learning environment at Christ University.
                </Typography>
              </ValueCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <ValueCard elevation={3}>
                <CardIcon bgcolor="#2ecc71">
                  <VisionIcon fontSize="large" />
                </CardIcon>
                <Typography variant="h4" component="h3" fontWeight="600" sx={{ mb: 2 }}>
                  Our Vision
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                  <Box component="span" fontWeight="bold" display="block" mb={1}>
                    Excellence & Service
                  </Box>
                  To become the leading multilingual assistant for academic and cultural exchange worldwide.
                </Typography>
              </ValueCard>
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>

      {/* Team Section */}
      <SectionWrapper bgColor="rgba(245, 247, 250, 0.8)">
        <DecorativeShape top="50px" right="10%" size="180px" color="rgba(52, 152, 219, 0.06)" />
        <DecorativeShape bottom="100px" left="5%" size="120px" color="rgba(46, 204, 113, 0.06)" />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box textAlign="center" mb={6}>
            <SectionTitle
              variant="h3"
              component="h2"
              fontWeight="700"
            >
              Development Team
            </SectionTitle>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ maxWidth: 700, mx: 'auto', fontSize: '1.1rem' }}
            >
              Meet the talented developers behind the Christ University Multilingual Assistant
            </Typography>
          </Box>

          <Grid container spacing={5} justifyContent="center">
            <Grid item xs={12} sm={6} md={5} lg={4}>
              <TeamCard elevation={4}>
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <ProfileImage
                    src={abhishekPandeyImg}
                    alt="Abhishek Pandey"
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 40%)',
                      zIndex: 1,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      '.MuiCard-root:hover &': {
                        opacity: 1
                      }
                    }}
                  />
                </Box>
                <CardContent sx={{ textAlign: 'center', p: 3, position: 'relative' }}>
                  <Typography variant="h5" component="h3" fontWeight="700" gutterBottom>
                    Abhishek Pandey
                  </Typography>
                  <Typography variant="body1" color="primary.main" sx={{ mb: 2, fontWeight: 500 }}>
                    Backend and Material UI Developer
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Responsible for server-side architecture, database design, and API development
                  </Typography>
                </CardContent>
              </TeamCard>
            </Grid>

            <Grid item xs={12} sm={6} md={5} lg={4}>
              <TeamCard elevation={4}>
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <ProfileImage
                    src={abhishekRoyImg}
                    alt="Abhishek Roy"
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 40%)',
                      zIndex: 1,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      '.MuiCard-root:hover &': {
                        opacity: 1
                      }
                    }}
                  />
                </Box>
                <CardContent sx={{ textAlign: 'center', p: 3, position: 'relative' }}>
                  <Typography variant="h5" component="h3" fontWeight="700" gutterBottom>
                    Abhishek Roy
                  </Typography>
                  <Typography variant="body1" color="primary.main" sx={{ mb: 2, fontWeight: 500 }}>
                    Frontend Developer
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Focused on creating intuitive user interfaces and engaging experiences across all platforms
                  </Typography>
                </CardContent>
              </TeamCard>
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>

      {/* Contact Section */}
      <SectionWrapper>
        <DecorativeShape top="10%" right="5%" size="150px" color="rgba(52, 152, 219, 0.05)" />
        <DecorativeShape bottom="20%" left="8%" size="120px" color="rgba(231, 76, 60, 0.05)" />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box textAlign="center" mb={6}>
            <SectionTitle
              variant="h3"
              component="h2"
              fontWeight="700"
            >
              Contact Us
            </SectionTitle>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ maxWidth: 700, mx: 'auto', fontSize: '1.1rem' }}
            >
              Get in touch with our team for inquiries, support, or collaboration opportunities
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <ContactCard elevation={2}>
                <Avatar
                  sx={{
                    width: 70,
                    height: 70,
                    bgcolor: '#3498db',
                    mx: 'auto',
                    mb: 3,
                    boxShadow: '0 8px 16px rgba(52, 152, 219, 0.25)',
                  }}
                >
                  <EmailIcon fontSize="large" />
                </Avatar>
                <Typography variant="h5" component="h3" fontWeight="600" gutterBottom>
                  Email
                </Typography>
                <Divider sx={{ my: 2, width: '40%', mx: 'auto' }} />
                <Stack spacing={1.5}>
                  <Typography variant="body1" color="text.secondary">
                    abhishek.pandey@mca.christuniversity.in
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    abhishek.roy@mca.christuniversity.in
                  </Typography>
                </Stack>
              </ContactCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <ContactCard elevation={2}>
                <Avatar
                  sx={{
                    width: 70,
                    height: 70,
                    bgcolor: '#2ecc71',
                    mx: 'auto',
                    mb: 3,
                    boxShadow: '0 8px 16px rgba(46, 204, 113, 0.25)',
                  }}
                >
                  <PhoneIcon fontSize="large" />
                </Avatar>
                <Typography variant="h5" component="h3" fontWeight="600" gutterBottom>
                  Phone
                </Typography>
                <Divider sx={{ my: 2, width: '40%', mx: 'auto' }} />
                <Stack spacing={1.5}>
                  <Typography variant="body1" color="text.secondary">
                    +91 9566094719
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    +91 7003352805
                  </Typography>
                </Stack>
              </ContactCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <ContactCard elevation={2}>
                <Avatar
                  sx={{
                    width: 70,
                    height: 70,
                    bgcolor: '#e74c3c',
                    mx: 'auto',
                    mb: 3,
                    boxShadow: '0 8px 16px rgba(231, 76, 60, 0.25)',
                  }}
                >
                  <LocationIcon fontSize="large" />
                </Avatar>
                <Typography variant="h5" component="h3" fontWeight="600" gutterBottom>
                  Address
                </Typography>
                <Divider sx={{ my: 2, width: '40%', mx: 'auto' }} />
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  Christ University, Hosur Road
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Bengaluru - 560029
                </Typography>
              </ContactCard>
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>
    </Box>
  );
}

export default AboutUsPage;
