import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  alpha,
  useTheme,
  Fade,
  Zoom
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Shield as ShieldIcon,
  Security as SecurityIcon,
  Storage as DatabaseIcon,
  Cookie as CookieIcon,
  Check as CheckIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f5f7fa, #e8ecf3)',
  padding: theme.spacing(4),
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const HeaderPaper = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  padding: theme.spacing(8, 4),
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 70%)',
  },
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
  background: alpha(theme.palette.background.paper, 0.95),
}));

const SectionCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
  overflow: 'visible',
  position: 'relative',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
  },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 3, 2, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const IconContainer = styled(Box)(({ theme, color }) => ({
  width: 50,
  height: 50,
  borderRadius: '50%',
  backgroundColor: alpha(color || theme.palette.primary.main, 0.1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  color: color || theme.palette.primary.main,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  color: theme.palette.text.primary,
  flexGrow: 1,
}));

const ContactCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  boxShadow: 'none',
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1, 0),
}));

function PrivacyPolicyPage() {
  const theme = useTheme();
  
  return (
    <PageContainer>
      <Container maxWidth="lg">
        <Fade in={true} timeout={800}>
          <HeaderPaper elevation={3}>
            <Zoom in={true} timeout={1000}>
              <ShieldIcon sx={{ fontSize: 70, mb: 3, opacity: 0.9 }} />
            </Zoom>
            <Typography variant="h2" gutterBottom 
              sx={{ fontWeight: 700, fontFamily: "'Montserrat', sans-serif", textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
              Privacy Policy
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, fontFamily: "'Poppins', sans-serif" }}>
              Last updated: {new Date().toLocaleDateString()}
            </Typography>
          </HeaderPaper>
        </Fade>

        <ContentPaper elevation={2}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Fade in={true} timeout={1000} style={{ transitionDelay: '200ms' }}>
                <SectionCard>
                  <SectionHeader>
                    <IconContainer color={theme.palette.primary.main}>
                      <SecurityIcon />
                    </IconContainer>
                    <SectionTitle variant="h5">Information We Collect</SectionTitle>
                  </SectionHeader>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600} color="primary.main">
                      Personal Information
                    </Typography>
                    <List>
                      {['Name and contact details', 'Student/Faculty ID', 'Email address', 'Department and course information', 'Language preferences'].map((item, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <CheckIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={item} primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif" }} />
                        </ListItem>
                      ))}
                    </List>

                    <Typography variant="h6" gutterBottom fontWeight={600} color="primary.main" sx={{ mt: 3 }}>
                      Usage Information
                    </Typography>
                    <List>
                      {['Login and activity timestamps', 'Communication history', 'Language translation requests', 'System interaction patterns'].map((item, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <CheckIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={item} primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif" }} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </SectionCard>
              </Fade>
            </Grid>

            <Grid item xs={12}>
              <Fade in={true} timeout={1000} style={{ transitionDelay: '400ms' }}>
                <SectionCard>
                  <SectionHeader>
                    <IconContainer color={theme.palette.secondary.main}>
                      <DatabaseIcon />
                    </IconContainer>
                    <SectionTitle variant="h5">How We Use Your Information</SectionTitle>
                  </SectionHeader>
                  <CardContent>
                    <List>
                      {[
                        'To provide multilingual communication services', 
                        'To improve our translation accuracy', 
                        'To enhance user experience', 
                        'To maintain system security', 
                        'To generate anonymous usage statistics'
                      ].map((item, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <CheckIcon color="secondary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={item} primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif" }} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </SectionCard>
              </Fade>
            </Grid>

            <Grid item xs={12}>
              <Fade in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
                <SectionCard>
                  <SectionHeader>
                    <IconContainer color={theme.palette.info.main}>
                      <CookieIcon />
                    </IconContainer>
                    <SectionTitle variant="h5">Data Protection</SectionTitle>
                  </SectionHeader>
                  <CardContent>
                    <Typography variant="body1" paragraph fontFamily="'Poppins', sans-serif">
                      We implement various security measures to protect your information:
                    </Typography>
                    <List>
                      {[
                        'End-to-end encryption for all communications', 
                        'Regular security audits', 
                        'Secure data storage practices', 
                        'Limited access to personal information', 
                        'Regular data backup and recovery procedures'
                      ].map((item, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <CheckIcon color="info" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={item} primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif" }} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </SectionCard>
              </Fade>
            </Grid>

            <Grid item xs={12}>
              <Fade in={true} timeout={1000} style={{ transitionDelay: '800ms' }}>
                <SectionCard>
                  <SectionHeader>
                    <SectionTitle variant="h5">Contact Us</SectionTitle>
                  </SectionHeader>
                  <CardContent>
                    <Typography variant="body1" paragraph fontFamily="'Poppins', sans-serif">
                      If you have any questions about our Privacy Policy, please contact us at:
                    </Typography>
                    <ContactCard>
                      <CardContent>
                        <ContactItem>
                          <EmailIcon color="primary" sx={{ mr: 2 }} />
                          <Typography variant="body1" fontFamily="'Poppins', sans-serif">
                            Email: abhishek.pandey@mca.christuniversity.in
                          </Typography>
                        </ContactItem>
                        <ContactItem>
                          <PhoneIcon color="primary" sx={{ mr: 2 }} />
                          <Typography variant="body1" fontFamily="'Poppins', sans-serif">
                            Phone: +91 9566064719
                          </Typography>
                        </ContactItem>
                        <ContactItem>
                          <LocationIcon color="primary" sx={{ mr: 2 }} />
                          <Typography variant="body1" fontFamily="'Poppins', sans-serif">
                            Address: Christ University, Bangalore
                          </Typography>
                        </ContactItem>
                      </CardContent>
                    </ContactCard>
                  </CardContent>
                </SectionCard>
              </Fade>
            </Grid>
          </Grid>
        </ContentPaper>
      </Container>
    </PageContainer>
  );
}

export default PrivacyPolicyPage; 