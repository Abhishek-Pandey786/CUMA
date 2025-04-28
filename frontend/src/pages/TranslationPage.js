import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  useTheme,
  Card,
  CardContent,
  Avatar,
  Divider
} from '@mui/material';
import {
  Translate as TranslateIcon,
  Chat as ChatIcon,
  School as SchoolIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { toast } from 'react-hot-toast';

// Styled components
const PageWrapper = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f5f7fa 0%, #e2e8f0 100%)',
  minHeight: '100vh',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  padding: theme.spacing(8, 3),
  marginBottom: theme.spacing(6),
  borderRadius: theme.shape.borderRadius * 2,
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  color: 'white',
  textAlign: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%)',
    zIndex: 1,
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 5,
  padding: theme.spacing(1.5, 4),
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  fontSize: '1.1rem',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
  }
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  overflow: 'hidden',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
  }
}));

const AssistantCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.1)',
  background: 'white',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  marginBottom: theme.spacing(4),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '5px',
    background: 'linear-gradient(90deg, #3498db, #1abc9c)',
  }
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  }
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  padding: theme.spacing(2),
  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
  color: 'white',
  textAlign: 'left',
}));

// At the top of the file, create a global variable outside of the component
let streamlitWindowInstance = null;

function TranslationPage() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const handleLaunchFullAssistant = () => {
    // Disable button temporarily to prevent multiple clicks
    setIsLoading(true);
    
    // Call the API to launch the main AI assistant app
    fetch('http://localhost:5001/launch-translator')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          console.log('AI Assistant app launched successfully');
          toast.success("AI Assistant launched");
          
          // Open Streamlit directly after successful launch
          window.open('http://localhost:8501', '_blank');
        } else {
          console.error('Failed to launch AI Assistant app:', data.message);
          toast.error(`Failed to launch AI Assistant: ${data.message}`);
        }
      })
      .catch(error => {
        console.error('Error launching AI Assistant app:', error);
        toast.error(`Failed to launch AI Assistant: ${error.message}`);
      })
      .finally(() => {
        // Re-enable button after 3 seconds
        setTimeout(() => setIsLoading(false), 3000);
      });
  };

  return (
    <PageWrapper>
      <Container maxWidth="lg">
        <HeroSection>
          <Box position="relative" zIndex={2}>
            <Typography 
              variant="h2" 
              component="h1" 
              fontWeight="800" 
              gutterBottom
              sx={{ 
                mb: 3, 
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } 
              }}
            >
              <TranslateIcon sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, mr: 1, verticalAlign: 'bottom' }} />
              Multilingual AI Assistant
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                maxWidth: 700, 
                mx: 'auto', 
                mb: 5, 
                opacity: 0.9,
                fontWeight: 300,
                lineHeight: 1.6,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
              }}
            >
              Break language barriers with our powerful AI assistant that can translate, interpret, and help with academic needs in multiple languages
            </Typography>
          </Box>
        </HeroSection>

        <AssistantCard>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h4" component="h2" fontWeight="700" gutterBottom>
                Advanced Multilingual Assistant
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: '1.1rem' }}>
                Our Streamlit-powered application provides real-time translation, academic assistance, 
                and multilingual support for the Christ University community.
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexWrap: 'wrap', 
                  justifyContent: { xs: 'center', md: 'flex-start' } 
                }}
              >
                <Box 
                  sx={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    bg: 'rgba(52, 152, 219, 0.1)', 
                    py: 1, 
                    px: 2, 
                    borderRadius: 2,
                    color: 'primary.main'
                  }}
                >
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'inline-block', 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.main', 
                      mr: 1 
                    }} 
                  />
                  Powered by Gemini AI
                </Box>
                <Box 
                  sx={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    bg: 'rgba(46, 204, 113, 0.1)', 
                    py: 1, 
                    px: 2, 
                    borderRadius: 2,
                    color: 'success.main'
                  }}
                >
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'inline-block', 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      bgcolor: 'success.main', 
                      mr: 1 
                    }} 
                  />
                  10+ Languages
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                component="img"
                src="https://static.streamlit.io/badges/streamlit_badge_black_white.svg"
                alt="Streamlit App"
                sx={{ 
                  maxWidth: '90%', 
                  maxHeight: '200px',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  }
                }}
              />
            </Grid>
          </Grid>
        </AssistantCard>

        {/* Image Gallery Section */}
        <Box mt={8} mb={10}>
          <Typography 
            variant="h4" 
            component="h2" 
            fontWeight="700" 
            textAlign="center" 
            gutterBottom
            sx={{ mb: 6, position: 'relative', display: 'inline-block', left: '50%', transform: 'translateX(-50%)' }}
          >
            AI Assistant in Action
            <Box 
              sx={{ 
                position: 'absolute', 
                width: '60%', 
                height: '4px', 
                background: 'linear-gradient(90deg, #3498db, #1abc9c)', 
                bottom: '-10px', 
                left: '20%', 
                borderRadius: '2px' 
              }} 
            />
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <ImageContainer sx={{ cursor: 'default' }}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                  alt="AI Chat Interface"
                  sx={{ width: '100%', height: 240, objectFit: 'cover' }}
                />
                <ImageOverlay>
                  <Typography variant="subtitle1" fontWeight="bold">Chat Interface</Typography>
                  <Typography variant="body2">Natural conversation in multiple languages</Typography>
                </ImageOverlay>
              </ImageContainer>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <ImageContainer sx={{ cursor: 'default' }}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1580894912989-0bc892f4efd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                  alt="Translation Feature"
                  sx={{ width: '100%', height: 240, objectFit: 'cover' }}
                />
                <ImageOverlay>
                  <Typography variant="subtitle1" fontWeight="bold">Translation</Typography>
                  <Typography variant="body2">Accurate text and document translation</Typography>
                </ImageOverlay>
              </ImageContainer>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <ImageContainer sx={{ cursor: 'default' }}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                  alt="Academic Help"
                  sx={{ width: '100%', height: 240, objectFit: 'cover' }}
                />
                <ImageOverlay>
                  <Typography variant="subtitle1" fontWeight="bold">Academic Support</Typography>
                  <Typography variant="body2">Research assistance and explanations</Typography>
                </ImageOverlay>
              </ImageContainer>
            </Grid>
          </Grid>
        </Box>

        <Box mt={8}>
          <Typography 
            variant="h4" 
            component="h2" 
            fontWeight="700" 
            textAlign="center" 
            gutterBottom
            sx={{ mb: 6, position: 'relative', display: 'inline-block', left: '50%', transform: 'translateX(-50%)' }}
          >
            Key Features
            <Box 
              sx={{ 
                position: 'absolute', 
                width: '60%', 
                height: '4px', 
                background: 'linear-gradient(90deg, #3498db, #1abc9c)', 
                bottom: '-10px', 
                left: '20%', 
                borderRadius: '2px' 
              }} 
            />
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <FeatureCard>
                <CardContent sx={{ p: 4 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <TranslateIcon />
                    </Avatar>
                    <Typography variant="h5" component="h3" fontWeight="600">
                      Real-time Translation
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    Translate text and speech between multiple languages with high accuracy, understanding context and academic terminology.
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                    <Typography variant="body2" component="span" fontWeight="600" color="primary.main">
                      Languages:
                    </Typography> English, Hindi, Kannada, Tamil, Malayalam, and many more
                  </Box>
                </CardContent>
              </FeatureCard>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FeatureCard>
                <CardContent sx={{ p: 4 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                      <ChatIcon />
                    </Avatar>
                    <Typography variant="h5" component="h3" fontWeight="600">
                      Interactive Chat
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    Communicate with our AI assistant in your preferred language for academic inquiries, research assistance, and more.
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                    <Typography variant="body2" component="span" fontWeight="600" color="secondary.main">
                      Features:
                    </Typography> Voice input, real-time responses, conversation memory
                  </Box>
                </CardContent>
              </FeatureCard>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FeatureCard>
                <CardContent sx={{ p: 4 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: '#e74c3c', mr: 2 }}>
                      <SchoolIcon />
                    </Avatar>
                    <Typography variant="h5" component="h3" fontWeight="600">
                      Academic Support
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    Get assistance with research, questions about your studies, and help understanding complex concepts in your preferred language.
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                    <Typography variant="body2" component="span" fontWeight="600" color="error.main">
                      Support for:
                    </Typography> Research questions, concept explanations, resource recommendations
                  </Box>
                </CardContent>
              </FeatureCard>
            </Grid>
          </Grid>
        </Box>

        <Box 
          mt={10} 
          mb={4}
          sx={{ 
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            borderRadius: theme.shape.borderRadius * 2,
            padding: theme.spacing(6),
            textAlign: 'center',
            color: 'white',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
              zIndex: 1,
            }
          }}
        >
          <Box position="relative" zIndex={2}>
            <Typography variant="h4" component="h2" fontWeight="700" gutterBottom sx={{ mb: 3 }}>
              Experience AI Translation Now
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', mb: 4, opacity: 0.9 }}>
              Our multilingual AI assistant is ready to help you communicate across languages and assist with your academic needs
            </Typography>
            <ActionButton 
              variant="contained" 
              color="secondary"
              size="large"
              onClick={handleLaunchFullAssistant}
              startIcon={<TranslateIcon />}
              disabled={isLoading}
              sx={{ py: 1.5, px: 4 }}
            >
              {isLoading ? 'Launching...' : 'Try it Now'}
            </ActionButton>
          </Box>
        </Box>
      </Container>
    </PageWrapper>
  );
}

export default TranslationPage; 