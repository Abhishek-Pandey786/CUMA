import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Modal,
  Fade,
  Backdrop,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Card,
  CardContent,
  alpha,
  useTheme,
  Zoom
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
  Gavel as TermsIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

// Animations
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

const TermsCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.15)',
  padding: theme.spacing(6),
  maxWidth: 700,
  width: '100%',
  textAlign: 'center',
  position: 'relative',
  overflow: 'visible',
  margin: '0 auto',
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: 70,
  height: 70,
  borderRadius: '50%',
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  boxShadow: `0 5px 15px ${alpha(theme.palette.primary.main, 0.2)}`,
  animation: `${float} 3s ease-in-out infinite`,
  '& svg': {
    fontSize: '2.5rem',
  },
}));

const TermsTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
}));

const TermsText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Poppins', sans-serif",
  marginBottom: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

const ViewTermsButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.2, 3),
  borderRadius: theme.shape.borderRadius * 1.5,
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  background: theme.palette.primary.main,
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
    background: theme.palette.primary.dark,
  },
}));

const ModalPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 550,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
  padding: theme.spacing(4),
  '&:focus': {
    outline: 'none',
  },
}));

const ModalTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  textAlign: 'center',
}));

const ModalText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Poppins', sans-serif",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  color: theme.palette.error.light,
  '&:hover': {
    color: theme.palette.error.main,
    backgroundColor: alpha(theme.palette.error.main, 0.1),
  },
}));

const AcceptButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  borderRadius: theme.shape.borderRadius * 1.5,
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  background: theme.palette.success.main,
  marginTop: theme.spacing(2),
  '&:hover': {
    background: theme.palette.success.dark,
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
  },
}));

function TermsPage() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <PageContainer>
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Fade in={true} timeout={800}>
          <TermsCard elevation={3}>
            <Zoom in={true} timeout={1000}>
              <IconContainer>
                <TermsIcon />
              </IconContainer>
            </Zoom>
            
            <TermsTitle variant="h3">
              Terms and Conditions
            </TermsTitle>
            
            <TermsText variant="body1">
              Welcome to Christ University Multilingual Assistant. Please read the
              following terms and conditions carefully.
            </TermsText>
            
            <ViewTermsButton 
              variant="contained" 
              onClick={handleOpen}
              endIcon={<ArrowForwardIcon />}
            >
              View Full Terms & Conditions
            </ViewTermsButton>
          </TermsCard>
        </Fade>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <ModalPaper>
            <CloseButton onClick={handleClose}>
              <CloseIcon />
            </CloseButton>
            
            <ModalTitle variant="h4">
              Full Terms & Conditions
            </ModalTitle>
            
            <ModalText variant="body1">
              By using this service, you agree to the following terms and conditions:
            </ModalText>
            
            <List>
              {[
                'Use of the service is at your own risk.',
                'We are not responsible for any content provided by users.',
                'Your personal information will be kept confidential.',
                'Any misuse of the platform will result in termination of your account.',
                'We reserve the right to modify these terms at any time.'
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 0.8 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={item} primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif" }} />
                </ListItem>
              ))}
            </List>
            
            <Box textAlign="center">
              <AcceptButton
                variant="contained"
                color="success"
                startIcon={<CheckCircleIcon />}
                onClick={handleClose}
              >
                Accept
              </AcceptButton>
            </Box>
          </ModalPaper>
        </Fade>
      </Modal>
    </PageContainer>
  );
}

export default TermsPage;
