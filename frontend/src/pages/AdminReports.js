import React, { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Menu,
  useTheme,
  FormControl,
  InputLabel,
  alpha,
  Stack,
  Switch,
  FormControlLabel,
  Divider,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Search as SearchIcon,
  FilterList as FilterListIcon,
  ShowChart as ShowChartIcon,
  QueryStats as QueryStatsIcon,
  AccessTime as AccessTimeIcon,
  People as PeopleIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  School as SchoolIcon,
  Work as WorkIcon
} from '@mui/icons-material';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  backgroundSize: '200% 200%',
  animation: 'gradientFlow 15s ease infinite',
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

const StatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
  }
}));

const IconContainer = styled(Box)(({ theme, color }) => ({
  backgroundColor: color || theme.palette.primary.main,
  borderRadius: '50%',
  width: 60,
  height: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
  color: '#fff',
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  backgroundColor: alpha('#ffffff', 0.95),
  transition: 'all 0.3s ease',
  marginBottom: theme.spacing(4)
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  backgroundColor: 'transparent',
  overflow: 'hidden',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: "'Poppins', sans-serif",
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
}));

function AdminReports() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [activityStats, setActivityStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsResponse, usersResponse] = await Promise.all([
        fetch('http://localhost:5000/api/activity-stats'),
        fetch('http://localhost:5000/api/active-users')
      ]);

      const stats = await statsResponse.json();
      const users = await usersResponse.json();

      setActivityStats(stats);
      setActiveUsers(users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleOpenFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (role) => {
    setFilterRole(role);
    handleCloseFilter();
  };

  const filteredUsers = activeUsers.filter(user => {
    const nameMatch = user.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const roleMatch = filterRole === "all" || user.user_role === filterRole;
    return nameMatch && roleMatch;
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: "'Poppins', sans-serif",
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Daily Usage Pattern',
        font: {
          family: "'Montserrat', sans-serif",
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Hour of Day',
          font: {
            family: "'Poppins', sans-serif"
          }
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Sessions',
          font: {
            family: "'Poppins', sans-serif"
          }
        }
      }
    }
  };

  const chartData = {
    labels: activityStats?.peakHours?.map(hour => hour.hour) || [],
    datasets: [
      {
        label: 'User Sessions',
        data: activityStats?.peakHours?.map(hour => hour.count) || [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: alpha('rgb(75, 192, 192)', 0.5),
        tension: 0.3
      }
    ]
  };

  // Stats card colors
  const cardColors = {
    session: '#3498db',
    totalSessions: '#f39c12',
    peakTime: '#9b59b6'
  };

  const getRoleIcon = (role) => {
    switch(role.toLowerCase()) {
      case 'student':
        return <SchoolIcon />;
      case 'faculty':
        return <WorkIcon />;
      default:
        return <PeopleIcon />;
    }
  };
  
  const getRoleColor = (role) => {
    switch(role.toLowerCase()) {
      case 'student':
        return 'secondary';
      case 'faculty':
        return 'success';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="100vh"
          flexDirection="column"
          gap={2}
        >
          <CircularProgress size={60} sx={{ color: 'white' }} />
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'white', 
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400
            }}
          >
            Loading analytics data...
          </Typography>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          pt: 2
        }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              color: 'white', 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <QueryStatsIcon sx={{ fontSize: 36 }} /> User Activity Analytics
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <StatsCard>
              <CardContent sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                py: 3
              }}>
                <IconContainer color={cardColors.session}>
                  <AccessTimeIcon sx={{ fontSize: 30 }} />
                </IconContainer>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontWeight: 500,
                    color: '#555',
                    mb: 1
                  }}
                >
                  Average Session
                </Typography>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontFamily: "'Montserrat', sans-serif", 
                    fontWeight: 700,
                    color: 'primary.main',
                  }}
                >
                  {activityStats?.averageSession || 0}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    color: 'text.secondary',
                    mt: 1
                  }}
                >
                  minutes per user
                </Typography>
              </CardContent>
            </StatsCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <StatsCard>
              <CardContent sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                py: 3
              }}>
                <IconContainer color={cardColors.totalSessions}>
                  <PeopleIcon sx={{ fontSize: 30 }} />
                </IconContainer>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontWeight: 500,
                    color: '#555',
                    mb: 1
                  }}
                >
                  Total Sessions
                </Typography>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontFamily: "'Montserrat', sans-serif", 
                    fontWeight: 700,
                    color: 'primary.main',
                  }}
                >
                  {activityStats?.totalSessions || 0}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    color: 'text.secondary',
                    mt: 1
                  }}
                >
                  total logins recorded
                </Typography>
              </CardContent>
            </StatsCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <StatsCard>
              <CardContent sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                py: 3
              }}>
                <IconContainer color={cardColors.peakTime}>
                  <ShowChartIcon sx={{ fontSize: 30 }} />
                </IconContainer>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontWeight: 500,
                    color: '#555',
                    mb: 1
                  }}
                >
                  Peak Usage Time
                </Typography>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontFamily: "'Montserrat', sans-serif", 
                    fontWeight: 700,
                    color: 'primary.main',
                  }}
                >
                  {activityStats?.peakHours?.[0]?.hour || 'N/A'}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    color: 'text.secondary',
                    mt: 1
                  }}
                >
                  highest activity hour
                </Typography>
              </CardContent>
            </StatsCard>
          </Grid>
        </Grid>

        {/* Chart Section */}
        <ContentPaper sx={{ height: 400 }}>
          <Line options={chartOptions} data={chartData} />
        </ContentPaper>

        {/* Active Users Section */}
        <ContentPaper>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: { xs: 'flex-start', md: 'center' },
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            mb: 3
          }}>
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <PeopleIcon /> Most Active Users
            </Typography>
            
            <Box sx={{ 
              display: 'flex',
              gap: 2,
              width: { xs: '100%', md: 'auto' }
            }}>
              <TextField
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ 
                  minWidth: { xs: '100%', md: 220 },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: alpha('#fff', 0.9),
                    '&:hover': {
                      backgroundColor: '#fff',
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              
              <FormControl 
                variant="outlined" 
                size="small"
                sx={{ 
                  minWidth: 150,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: alpha('#fff', 0.9),
                    '&:hover': {
                      backgroundColor: '#fff',
                    }
                  }
                }}
              >
                <InputLabel>Filter Role</InputLabel>
                <Select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  label="Filter Role"
                  startAdornment={
                    <InputAdornment position="start">
                      <FilterListIcon />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="all">All Roles</MenuItem>
                  <MenuItem value="Student">Students</MenuItem>
                  <MenuItem value="Faculty">Faculty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          
          <StyledTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableHeadCell>Name</StyledTableHeadCell>
                  <StyledTableHeadCell>Role</StyledTableHeadCell>
                  <StyledTableHeadCell>Total Sessions</StyledTableHeadCell>
                  <StyledTableHeadCell>Avg. Duration (min)</StyledTableHeadCell>
                  <StyledTableHeadCell>Last Active</StyledTableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <TableRow 
                      key={index}
                      hover
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: alpha(theme.palette.primary.light, 0.08) 
                        } 
                      }}
                    >
                      <StyledTableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Chip
                            icon={getRoleIcon(user.user_role)}
                            label={user.name}
                            variant="outlined"
                            sx={{ 
                              fontFamily: "'Poppins', sans-serif",
                              backgroundColor: alpha(theme.palette.background.paper, 0.8)
                            }}
                          />
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Chip
                          label={user.user_role}
                          color={getRoleColor(user.user_role)}
                          size="small"
                          sx={{ 
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 500
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 600
                          }}
                        >
                          {user.total_sessions}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 600
                          }}
                        >
                          {Math.round(user.avg_duration)}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          {user.last_active 
                            ? new Date(user.last_active).toLocaleDateString(undefined, { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : 'Never'
                          }
                        </Typography>
                      </StyledTableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <StyledTableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: theme.palette.text.secondary,
                          fontFamily: "'Poppins', sans-serif",
                          mb: 1
                        }}
                      >
                        No user activity found
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: theme.palette.text.disabled,
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        {searchQuery || filterRole !== 'all' 
                          ? 'Try adjusting your search or filter criteria' 
                          : 'User activity data will appear here once users start using the platform'}
                      </Typography>
                    </StyledTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </ContentPaper>
      </Container>
    </PageContainer>
  );
}

export default AdminReports;
