import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  IconButton,
  Fade,
  Zoom,
  Stack,
  alpha,
  useTheme
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
  CalendarToday as CalendarIcon,
  ArrowBack as ArrowBackIcon,
  Event as EventIcon,
  School as SchoolIcon,
  Room as RoomIcon,
  AccessTime as TimeIcon,
  Groups as MeetingIcon
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
  backgroundSize: '400% 400%',
  padding: theme.spacing(4, 2),
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.spacing(5),
  position: 'relative',
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 700,
  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
  marginBottom: theme.spacing(1),
}));

const PageSubtitle = styled(Typography)(({ theme }) => ({
  color: alpha(theme.palette.common.white, 0.9),
  fontFamily: "'Poppins', sans-serif",
  textShadow: '0 2px 5px rgba(0,0,0,0.1)',
  maxWidth: '700px',
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const BackButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  borderRadius: theme.shape.borderRadius * 5,
  backgroundColor: alpha(theme.palette.common.white, 0.2),
  color: theme.palette.common.white,
  textTransform: 'none',
  padding: theme.spacing(1, 3),
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 500,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.3),
    transform: 'translateX(-5px)',
  },
  transition: 'all 0.3s ease',
}));

const EventCard = styled(Card)(({ theme, index }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  height: '100%',
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '5px',
    background: index === 0 ? 
      'linear-gradient(90deg, #3949AB, #4FC3F7)' : 
      'linear-gradient(90deg, #5E35B1, #BA68C8)',
  },
  animation: `${fadeIn} 0.5s ease-out forwards, ${float} 3s ease-in-out infinite`,
  animationDelay: `${index * 0.2}s, ${index * 0.5}s`,
}));

const IconContainer = styled(Box)(({ theme, color }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  backgroundColor: alpha(color, 0.15),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(2),
  color: color,
  border: `2px solid ${alpha(color, 0.3)}`,
  boxShadow: `0 5px 15px ${alpha(color, 0.2)}`,
  '& svg': {
    fontSize: '2rem',
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  animation: `${fadeIn} 0.8s ease-out`,
  animationDelay: '0.4s',
  animationFillMode: 'forwards',
  opacity: 0,
  '& .MuiTableHead-root': {
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiTableHead-root .MuiTableCell-head': {
    color: theme.palette.common.white,
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    fontSize: '1rem',
  },
  '& .MuiTableCell-root': {
    fontFamily: "'Poppins', sans-serif",
    padding: theme.spacing(2),
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  },
  '& .MuiTableRow-root:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  position: 'relative',
  display: 'inline-block',
  padding: theme.spacing(0, 1),
  color: theme.palette.common.white,
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -5,
    left: 0,
    width: '40%',
    height: '3px',
    background: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
  }
}));

function ClassesEvents() {
  const theme = useTheme();
  const navigate = useNavigate();

  // Sample data
  const upcomingEvents = [
    {
      title: "Upcoming Class",
      description: "Data Structures - Room 202",
      date: "April 10, 2025 - 10:00 AM",
      icon: <SchoolIcon />,
      color: theme.palette.primary.main
    },
    {
      title: "Faculty Meeting",
      description: "Annual Review Discussion",
      date: "April 6, 2025 - 3:00 PM",
      icon: <MeetingIcon />,
      color: theme.palette.secondary.main
    }
  ];

  const classSchedule = [
    { 
      course: "Data Structures", 
      room: "202", 
      date: "April 10, 2025", 
      time: "10:00 AM" 
    },
    { 
      course: "Software Engineering", 
      room: "305", 
      date: "April 12, 2025", 
      time: "2:00 PM" 
    },
    { 
      course: "Database Systems", 
      room: "101", 
      date: "April 13, 2025", 
      time: "11:30 AM" 
    }
  ];

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <HeaderContainer>
          <BackButton 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate("/faculty-dashboard")}
          >
            Back to Dashboard
          </BackButton>
          <Fade in={true} timeout={800}>
            <Box textAlign="center">
              <PageTitle variant="h3">
                Classes & Events
              </PageTitle>
              <PageSubtitle variant="h6">
                Stay updated with your scheduled classes and upcoming events
              </PageSubtitle>
            </Box>
          </Fade>
        </HeaderContainer>

        {/* Event Cards */}
        <Fade in={true} timeout={1000}>
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {upcomingEvents.map((event, index) => (
              <Grid item xs={12} md={6} key={index}>
                <EventCard elevation={4} index={index}>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <IconContainer color={event.color}>
                      {event.icon}
                    </IconContainer>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      gutterBottom
                      fontFamily="'Montserrat', sans-serif"
                      fontWeight={600}
                      color="text.primary"
                    >
                      {event.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ mb: 2 }}
                      fontFamily="'Poppins', sans-serif"
                      color="text.secondary"
                    >
                      {event.description}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      borderRadius: 2,
                      p: 1.5
                    }}>
                      <CalendarIcon color="primary" sx={{ mr: 1 }} />
                      <Typography
                        variant="body2"
                        fontFamily="'Poppins', sans-serif"
                        fontWeight={500}
                        color="primary"
                      >
                        {event.date}
                      </Typography>
                    </Box>
                  </CardContent>
                </EventCard>
              </Grid>
            ))}
          </Grid>
        </Fade>

        {/* Schedule Table */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <SectionTitle variant="h4">
              Class Schedule
            </SectionTitle>
          </Box>
          
          <StyledTableContainer component={Paper}>
            <Table aria-label="class schedule table">
              <TableHead>
                <TableRow>
                  <TableCell>Course</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classSchedule.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SchoolIcon 
                          color="primary" 
                          sx={{ mr: 1, opacity: 0.7 }} 
                        />
                        {row.course}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <RoomIcon 
                          color="error" 
                          fontSize="small" 
                          sx={{ mr: 1, opacity: 0.7 }} 
                        />
                        {row.room}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarIcon 
                          color="action" 
                          fontSize="small" 
                          sx={{ mr: 1, opacity: 0.7 }} 
                        />
                        {row.date}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TimeIcon 
                          color="secondary" 
                          fontSize="small" 
                          sx={{ mr: 1, opacity: 0.7 }} 
                        />
                        {row.time}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Box>
      </Container>
    </PageContainer>
  );
}

export default ClassesEvents;
