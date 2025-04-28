import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  IconButton,
  Divider,
  InputAdornment,
  Zoom,
  Fade,
  alpha,
  Stack,
  useTheme
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Business as BusinessIcon,
  ArrowBack as ArrowBackIcon,
  School as SchoolIcon
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

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  backgroundSize: '400% 400%',
  padding: theme.spacing(4, 2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
}));

const ProfileCard = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  padding: theme.spacing(5, 6),
  width: '100%',
  maxWidth: 600,
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
  animation: `${fadeIn} 0.5s ease-out`,
  position: 'relative',
  overflow: 'hidden',
  margin: '0 auto',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '5px',
    background: 'linear-gradient(90deg, #3949AB, #4FC3F7)',
  }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  backgroundColor: alpha(theme.palette.primary.main, 0.2),
  color: theme.palette.primary.main,
  fontSize: '3rem',
  margin: 'auto',
  marginBottom: theme.spacing(4),
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  border: `5px solid ${alpha(theme.palette.primary.main, 0.3)}`,
}));

const StyledTextField = styled(TextField)(({ theme, disabled }) => ({
  '& .MuiInputBase-root': {
    borderRadius: theme.shape.borderRadius * 2,
    background: disabled ? alpha(theme.palette.background.default, 0.5) : alpha(theme.palette.background.default, 0.8),
    transition: 'all 0.3s ease',
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.8, 1.5, 1.8, 1),
    fontFamily: "'Poppins', sans-serif",
  },
  '& .MuiInputAdornment-root': {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: disabled ? theme.palette.action.disabled : theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderWidth: 2,
    },
  },
  '& label': {
    fontFamily: "'Poppins', sans-serif",
    marginLeft: theme.spacing(1),
  },
  '& label.Mui-focused': {
    fontWeight: 500,
  },
  marginBottom: theme.spacing(3),
}));

const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(4),
  flexWrap: 'wrap',
  width: '100%',
}));

const ActionButton = styled(Button)(({ theme, buttoncolor }) => ({
  borderRadius: theme.shape.borderRadius * 5,
  padding: theme.spacing(1.2, 3),
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: `0 6px 15px ${alpha(buttoncolor, 0.4)}`,
  backgroundColor: buttoncolor,
  color: theme.palette.common.white,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: buttoncolor,
    transform: 'translateY(-3px)',
    boxShadow: `0 10px 20px ${alpha(buttoncolor, 0.5)}`,
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  minWidth: 'auto',
  borderRadius: '50%',
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
  zIndex: 10,
}));

const DisabledFieldBackground = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, rgba(0,0,0,0.03), rgba(0,0,0,0.06), rgba(0,0,0,0.03))',
    backgroundSize: '200% 100%',
    animation: `${shimmer} 1.5s infinite`,
    opacity: 0.5,
    pointerEvents: 'none',
    borderRadius: theme.shape.borderRadius * 2,
  }
}));

function FacultyProfile() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [facultyData, setFacultyData] = useState({
    id: "",
    fullName: "",
    email: "",
    password: "",
    department: ""
  });
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    const storedFaculty = JSON.parse(localStorage.getItem('facultyInfo'));
    if (storedFaculty) {
      setFacultyData({
        id: storedFaculty.id,
        fullName: storedFaculty.fullName,
        email: storedFaculty.email,
        password: "********",
        department: storedFaculty.department
      });
      setOriginalData(storedFaculty);
    }
  }, []);

  const validateFields = () => {
    if (!facultyData.fullName.trim()) {
      toast.error("Name cannot be empty!");
      return false;
    }
    if (!facultyData.department.trim()) {
      toast.error("Department cannot be empty!");
      return false;
    }
    if (facultyData.password !== "********" && facultyData.password.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    try {
      const updateData = {
        id: facultyData.id,
        fullName: facultyData.fullName,
        department: facultyData.department,
        // Only include password if it was changed
        ...(facultyData.password !== "********" && { password: facultyData.password })
      };

      const response = await fetch('http://localhost:5000/api/faculty/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('facultyToken')}`
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (response.ok) {
        // Update localStorage with new data
        const updatedFacultyInfo = {
          ...originalData,
          fullName: facultyData.fullName,
          department: facultyData.department
        };
        localStorage.setItem('facultyInfo', JSON.stringify(updatedFacultyInfo));
        setOriginalData(updatedFacultyInfo);
        
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        
        // Reset password field to asterisks
        setFacultyData(prev => ({
          ...prev,
          password: "********"
        }));
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (err) {
      toast.error("Connection error. Please try again.");
    }
  };

  const handleCancel = () => {
    setFacultyData({
      ...originalData,
      password: "********"
    });
    setIsEditing(false);
  };

  return (
    <PageContainer>
      <ToastContainer position="top-center" theme="colored" />
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Fade in={true} timeout={800}>
          <ProfileCard elevation={6}>
            <BackButton 
              startIcon={<ArrowBackIcon />} 
              onClick={() => navigate("/faculty-dashboard")}
              aria-label="back to dashboard"
            />
          
            <Fade in={true} timeout={1000}>
              <Box sx={{ textAlign: 'center', mb: 4, px: 2 }}>
                <StyledAvatar>
                  <PersonIcon fontSize="inherit" />
                </StyledAvatar>
                <Typography 
                  variant="h4" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    mt: 2
                  }}
                >
                  Faculty Profile
                </Typography>
                <Typography 
                  variant="body1" 
                  color="textSecondary"
                  sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    mb: 3,
                    maxWidth: '90%',
                    mx: 'auto'
                  }}
                >
                  View and manage your personal information
                </Typography>
                <Divider sx={{ mb: 4, width: '80%', mx: 'auto' }} />
              </Box>
            </Fade>

            <Zoom in={true} style={{ transitionDelay: '200ms' }}>
              <Stack spacing={3} sx={{ width: '100%', mx: 'auto' }}>
                <StyledTextField
                  label="Full Name"
                  fullWidth
                  value={facultyData.fullName}
                  onChange={(e) => setFacultyData({ ...facultyData, fullName: e.target.value })}
                  disabled={!isEditing}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />

                <DisabledFieldBackground>
                  <StyledTextField
                    label="Email Address"
                    fullWidth
                    value={facultyData.email}
                    disabled={true}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </DisabledFieldBackground>

                <StyledTextField
                  label="Password"
                  type="password"
                  fullWidth
                  value={facultyData.password}
                  onChange={(e) => setFacultyData({ ...facultyData, password: e.target.value })}
                  disabled={!isEditing}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText={isEditing ? "Leave as is to keep current password" : ""}
                />

                <StyledTextField
                  label="Department"
                  fullWidth
                  value={facultyData.department}
                  onChange={(e) => setFacultyData({ ...facultyData, department: e.target.value })}
                  disabled={!isEditing}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </Zoom>

            <ButtonsContainer>
              {!isEditing ? (
                <Zoom in={true} style={{ transitionDelay: '400ms' }}>
                  <ActionButton 
                    buttoncolor={theme.palette.primary.main}
                    startIcon={<EditIcon />} 
                    onClick={() => setIsEditing(true)}
                    variant="contained"
                  >
                    Edit Profile
                  </ActionButton>
                </Zoom>
              ) : (
                <>
                  <Zoom in={true} style={{ transitionDelay: '200ms' }}>
                    <ActionButton 
                      buttoncolor={theme.palette.success.main}
                      startIcon={<SaveIcon />} 
                      onClick={handleSave}
                      variant="contained"
                    >
                      Save Changes
                    </ActionButton>
                  </Zoom>
                  <Zoom in={true} style={{ transitionDelay: '300ms' }}>
                    <ActionButton 
                      buttoncolor={theme.palette.error.main}
                      startIcon={<CloseIcon />} 
                      onClick={handleCancel}
                      variant="contained"
                    >
                      Cancel
                    </ActionButton>
                  </Zoom>
                </>
              )}
            </ButtonsContainer>
          </ProfileCard>
        </Fade>
      </Container>
    </PageContainer>
  );
}

export default FacultyProfile;
