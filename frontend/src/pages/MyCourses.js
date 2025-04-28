import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Fade,
  Zoom,
  Collapse,
  Stack,
  alpha,
  useTheme
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
  Language as LanguageIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Book as BookIcon,
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  TranslateOutlined as TranslateIcon
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
  50% { transform: translateY(-10px); }
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
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(5),
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  }
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 700,
  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
  position: 'relative',
  paddingBottom: theme.spacing(1),
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '40%',
    height: '3px',
    background: 'white',
    borderRadius: theme.shape.borderRadius,
  }
}));

const BackButton = styled(Button)(({ theme }) => ({
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

const AddButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 5,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textTransform: 'none',
  padding: theme.spacing(1, 3),
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 500,
  boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.4)}`,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-3px)',
    boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.6)}`,
  },
  transition: 'all 0.3s ease',
}));

const CourseCard = styled(Card)(({ theme, isnew }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
  },
  animation: isnew === 'true' ? `${fadeIn} 0.5s ease-out` : 'none',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const CourseHeader = styled(Box)(({ theme, color }) => ({
  background: color || theme.palette.primary.main,
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  color: theme.palette.common.white,
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at top right, rgba(255,255,255,0.3), transparent 70%)',
    pointerEvents: 'none',
  }
}));

const CourseIconWrapper = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  borderRadius: '50%',
  background: alpha('#fff', 0.2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: theme.typography.h4.fontSize,
}));

const SubjectChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 500,
  borderRadius: theme.shape.borderRadius * 4,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
  }
}));

const LanguageChip = styled(Chip)(({ theme, type }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: type === 'faculty' 
    ? alpha(theme.palette.primary.main, 0.15) 
    : alpha(theme.palette.success.main, 0.15),
  color: type === 'faculty' ? theme.palette.primary.main : theme.palette.success.main,
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 500,
  border: `1px solid ${type === 'faculty' 
    ? alpha(theme.palette.primary.main, 0.3) 
    : alpha(theme.palette.success.main, 0.3)}`,
  borderRadius: theme.shape.borderRadius * 4,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
    backgroundColor: type === 'faculty' 
      ? alpha(theme.palette.primary.main, 0.25) 
      : alpha(theme.palette.success.main, 0.25),
  }
}));

const ActionButton = styled(Button)(({ theme, buttoncolor }) => ({
  borderRadius: theme.shape.borderRadius * 5,
  padding: theme.spacing(1, 2),
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 500,
  textTransform: 'none',
  boxShadow: `0 4px 15px ${alpha(buttoncolor, 0.3)}`,
  backgroundColor: buttoncolor,
  color: theme.palette.common.white,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: buttoncolor,
    transform: 'translateY(-3px)',
    boxShadow: `0 7px 20px ${alpha(buttoncolor, 0.4)}`,
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: theme.shape.borderRadius * 1.5,
    backgroundColor: alpha(theme.palette.background.paper, 0.9),
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderWidth: 2,
      borderColor: theme.palette.primary.main,
    },
  },
  '& label': {
    fontFamily: "'Poppins', sans-serif",
  },
  '& label.Mui-focused': {
    fontWeight: 500,
  },
  marginBottom: theme.spacing(2),
}));

function MyCourses() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    id: '',
    name: '',
    subjects: [],
    facultyLanguage: '',
    studentLanguages: []
  });

  const facultyInfo = JSON.parse(localStorage.getItem("facultyInfo"));

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/faculty/courses/${facultyInfo.id}`);
      const data = await response.json();
      setCourses(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to fetch courses');
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    const newCourses = [...courses];
    newCourses[index].isEditing = true;
    setCourses(newCourses);
  };

  const handleSave = async (index) => {
    try {
      const course = courses[index];
      const response = await fetch(`http://localhost:5000/api/faculty/courses/${course.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseName: course.name,
          subjects: course.subjects,
          facultyLanguage: course.facultyLanguage,
          studentLanguages: course.studentLanguages
        }),
      });

      if (response.ok) {
        const newCourses = [...courses];
        newCourses[index].isEditing = false;
        setCourses(newCourses);
        toast.success('Course updated successfully!');
      } else {
        throw new Error('Failed to update course');
      }
    } catch (error) {
      console.error('Error updating course:', error);
      toast.error('Failed to update course');
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/faculty/courses/${courseId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setCourses(courses.filter(course => course.id !== courseId));
          toast.success('Course deleted successfully!');
        } else {
          throw new Error('Failed to delete course');
        }
      } catch (error) {
        console.error('Error deleting course:', error);
        toast.error('Failed to delete course');
      }
    }
  };

  const handleAddCourse = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/faculty/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          facultyId: facultyInfo.id,
          courseCode: newCourse.id,
          courseName: newCourse.name,
          subjects: newCourse.subjects,
          facultyLanguage: newCourse.facultyLanguage,
          studentLanguages: newCourse.studentLanguages
        }),
      });

      if (response.ok) {
        await fetchCourses();
        setShowAddForm(false);
        setNewCourse({
          id: '',
          name: '',
          subjects: [],
          facultyLanguage: '',
          studentLanguages: []
        });
        toast.success('Course added successfully!');
      } else {
        throw new Error('Failed to add course');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      toast.error('Failed to add course');
    }
  };

  const handleInputChange = (index, field, value) => {
    const newCourses = [...courses];
    if (field === 'subjects' || field === 'studentLanguages') {
      newCourses[index][field] = value.split(',').map(item => item.trim());
    } else {
      newCourses[index][field] = value;
    }
    setCourses(newCourses);
  };

  const getRandomColor = (index) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.info.main,
      '#5E35B1', // deep purple
      '#00897B', // teal
      '#039BE5', // light blue
      '#C0CA33', // lime
      '#546E7A', // blue grey
    ];
    return colors[index % colors.length];
  };

  return (
    <PageContainer>
      <ToastContainer position="top-center" theme="colored" />
      <Container maxWidth="xl">
        <HeaderContainer>
          <BackButton 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate(-1)}
          >
            Back to Dashboard
          </BackButton>
          <PageTitle variant="h3">My Courses</PageTitle>
          <AddButton 
            startIcon={<AddIcon />} 
            onClick={() => setShowAddForm(true)}
          >
            Add New Course
          </AddButton>
        </HeaderContainer>

        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh' 
          }}>
            <CircularProgress size={60} sx={{ color: 'white' }} />
            <Typography 
              variant="h6" 
              sx={{ 
                ml: 2, 
                color: 'white',
                fontFamily: "'Poppins', sans-serif", 
              }}
            >
              Loading courses...
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {showAddForm && (
              <Grid item xs={12} md={6} lg={4}>
                <Zoom in={true}>
                  <CourseCard elevation={4} isnew="true">
                    <CourseHeader color={theme.palette.success.main}>
                      <CourseIconWrapper>
                        <MenuBookIcon fontSize="inherit" />
                      </CourseIconWrapper>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontFamily="'Montserrat', sans-serif" fontWeight={600}>
                          New Course
                        </Typography>
                      </Box>
                    </CourseHeader>
                    
                    <CardContent sx={{ flex: 1, p: 3 }}>
                      <Stack spacing={2}>
                        <StyledTextField
                          label="Course Code"
                          fullWidth
                          placeholder="e.g., CSE101"
                          value={newCourse.id}
                          onChange={(e) => setNewCourse({...newCourse, id: e.target.value})}
                          variant="outlined"
                        />
                        
                        <StyledTextField
                          label="Course Name"
                          fullWidth
                          placeholder="e.g., Introduction to Programming"
                          value={newCourse.name}
                          onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                          variant="outlined"
                        />
                        
                        <StyledTextField
                          label="Subjects"
                          fullWidth
                          placeholder="Enter subjects separated by commas"
                          value={newCourse.subjects.join(', ')}
                          onChange={(e) => setNewCourse({
                            ...newCourse,
                            subjects: e.target.value.split(',').map(s => s.trim())
                          })}
                          variant="outlined"
                          helperText="E.g., Programming, Algorithms, Data Structures"
                        />
                        
                        <StyledTextField
                          label="Faculty Language"
                          fullWidth
                          placeholder="e.g., English"
                          value={newCourse.facultyLanguage}
                          onChange={(e) => setNewCourse({
                            ...newCourse,
                            facultyLanguage: e.target.value
                          })}
                          variant="outlined"
                        />
                        
                        <StyledTextField
                          label="Student Languages"
                          fullWidth
                          placeholder="Enter languages separated by commas"
                          value={newCourse.studentLanguages.join(', ')}
                          onChange={(e) => setNewCourse({
                            ...newCourse,
                            studentLanguages: e.target.value.split(',').map(s => s.trim())
                          })}
                          variant="outlined"
                          helperText="E.g., Spanish, French, German"
                        />
                      </Stack>
                    </CardContent>
                    
                    <CardActions sx={{ p: 3, pt: 0, justifyContent: 'space-between' }}>
                      <ActionButton 
                        buttoncolor={theme.palette.error.main}
                        startIcon={<CloseIcon />} 
                        onClick={() => {
                          setShowAddForm(false);
                          setNewCourse({
                            id: '',
                            name: '',
                            subjects: [],
                            facultyLanguage: '',
                            studentLanguages: []
                          });
                        }}
                      >
                        Cancel
                      </ActionButton>
                      <ActionButton 
                        buttoncolor={theme.palette.success.main}
                        startIcon={<SaveIcon />} 
                        onClick={handleAddCourse}
                      >
                        Save Course
                      </ActionButton>
                    </CardActions>
                  </CourseCard>
                </Zoom>
              </Grid>
            )}
            
            {courses.map((course, index) => (
              <Grid item xs={12} md={6} lg={4} key={course.id}>
                <Fade in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                  <CourseCard elevation={4}>
                    <CourseHeader color={getRandomColor(index)}>
                      <CourseIconWrapper>
                        <BookIcon fontSize="inherit" />
                      </CourseIconWrapper>
                      <Box sx={{ flex: 1 }}>
                        {course.isEditing ? (
                          <Stack spacing={1.5}>
                            <StyledTextField
                              label="Course Code"
                              size="small"
                              fullWidth
                              variant="outlined"
                              value={course.id}
                              onChange={(e) => handleInputChange(index, 'id', e.target.value)}
                              sx={{ 
                                '& .MuiInputBase-root': { 
                                  backgroundColor: alpha('#fff', 0.9), 
                                  borderRadius: 1.5,
                                },
                                mb: 0
                              }}
                            />
                            <StyledTextField
                              label="Course Name"
                              size="small"
                              fullWidth
                              variant="outlined"
                              value={course.name}
                              onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                              sx={{ 
                                '& .MuiInputBase-root': { 
                                  backgroundColor: alpha('#fff', 0.9), 
                                  borderRadius: 1.5,
                                },
                                mb: 0
                              }}
                            />
                          </Stack>
                        ) : (
                          <>
                            <Typography 
                              variant="h6" 
                              fontFamily="'Montserrat', sans-serif" 
                              fontWeight={600}
                            >
                              {course.id}
                            </Typography>
                            <Typography 
                              variant="body1" 
                              sx={{ opacity: 0.8 }}
                              fontFamily="'Poppins', sans-serif"
                            >
                              {course.name}
                            </Typography>
                          </>
                        )}
                      </Box>
                    </CourseHeader>
                    
                    <CardContent sx={{ flex: 1, p: 3 }}>
                      <Box sx={{ mb: 3 }}>
                        <Typography 
                          variant="subtitle1" 
                          fontWeight={600} 
                          sx={{ mb: 1.5 }}
                          fontFamily="'Montserrat', sans-serif"
                        >
                          Subjects
                        </Typography>
                        {course.isEditing ? (
                          <StyledTextField
                            label="Subjects"
                            fullWidth
                            placeholder="Enter subjects separated by commas"
                            value={course.subjects.join(', ')}
                            onChange={(e) => handleInputChange(index, 'subjects', e.target.value)}
                            variant="outlined"
                            size="small"
                          />
                        ) : (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {course.subjects.map((subject, i) => (
                              <SubjectChip 
                                key={i} 
                                label={subject} 
                                size="medium"
                                variant="outlined"
                                icon={<SchoolIcon />}
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                      
                      <Divider sx={{ mb: 3 }} />
                      
                      <Box sx={{ mb: 3 }}>
                        <Typography 
                          variant="subtitle1" 
                          fontWeight={600} 
                          sx={{ mb: 1.5 }}
                          fontFamily="'Montserrat', sans-serif"
                        >
                          Faculty Language
                        </Typography>
                        {course.isEditing ? (
                          <StyledTextField
                            label="Faculty Language"
                            fullWidth
                            value={course.facultyLanguage}
                            onChange={(e) => handleInputChange(index, 'facultyLanguage', e.target.value)}
                            variant="outlined"
                            size="small"
                          />
                        ) : (
                          <LanguageChip 
                            label={course.facultyLanguage} 
                            type="faculty"
                            icon={<TranslateIcon />}
                          />
                        )}
                      </Box>
                      
                      <Box>
                        <Typography 
                          variant="subtitle1" 
                          fontWeight={600} 
                          sx={{ mb: 1.5 }}
                          fontFamily="'Montserrat', sans-serif"
                        >
                          Student Languages
                        </Typography>
                        {course.isEditing ? (
                          <StyledTextField
                            label="Student Languages"
                            fullWidth
                            placeholder="Enter languages separated by commas"
                            value={course.studentLanguages.join(', ')}
                            onChange={(e) => handleInputChange(index, 'studentLanguages', e.target.value)}
                            variant="outlined"
                            size="small"
                          />
                        ) : (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {course.studentLanguages.map((lang, i) => (
                              <LanguageChip 
                                key={i} 
                                label={lang} 
                                type="student"
                                icon={<TranslateIcon />}
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                    </CardContent>
                    
                    <CardActions sx={{ p: 3, pt: 0, justifyContent: 'space-between' }}>
                      {course.isEditing ? (
                        <>
                          <ActionButton 
                            buttoncolor={theme.palette.error.main} 
                            startIcon={<CloseIcon />}
                            onClick={() => {
                              // Reset to original state and exit editing mode
                              fetchCourses();
                            }}
                          >
                            Cancel
                          </ActionButton>
                          <ActionButton 
                            buttoncolor={theme.palette.success.main} 
                            startIcon={<SaveIcon />}
                            onClick={() => handleSave(index)}
                          >
                            Save
                          </ActionButton>
                        </>
                      ) : (
                        <>
                          <ActionButton 
                            buttoncolor={theme.palette.primary.main} 
                            startIcon={<EditIcon />}
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </ActionButton>
                          <ActionButton 
                            buttoncolor={theme.palette.error.main} 
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(course.id)}
                          >
                            Delete
                          </ActionButton>
                        </>
                      )}
                    </CardActions>
                  </CourseCard>
                </Fade>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </PageContainer>
  );
}

export default MyCourses;
