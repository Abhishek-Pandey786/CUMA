import React, { useState, useEffect } from "react";
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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Avatar,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Divider,
  CircularProgress,
  useTheme,
  alpha,
  TableSortLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Search as SearchIcon,
  PersonOutline as PersonIcon,
  DeleteOutline as DeleteIcon,
  VisibilityOutlined as ViewIcon,
  Edit as EditIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  AdminPanelSettings as AdminIcon,
  Close as CloseIcon
} from '@mui/icons-material';

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

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 25,
    backgroundColor: alpha('#ffffff', 0.95),
    '&:hover': {
      backgroundColor: '#ffffff',
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
    }
  }
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  backgroundColor: alpha('#ffffff', 0.95),
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: "'Poppins', sans-serif",
  padding: theme.spacing(2),
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  padding: theme.spacing(2),
}));

const StyledAvatar = styled(Avatar)(({ theme, role }) => {
  let bgColor;
  
  switch(role?.toLowerCase()) {
    case 'admin':
      bgColor = theme.palette.primary.main;
      break;
    case 'student':
      bgColor = theme.palette.secondary.main;
      break;
    case 'faculty':
      bgColor = theme.palette.success.main;
      break;
    default:
      bgColor = theme.palette.grey[500];
  }
  
  return {
    backgroundColor: bgColor,
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
  };
});

const UsersPage = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    setUsers([...users].sort((a, b) => (
      newOrder === "asc" ? 
        a.name.localeCompare(b.name) : 
        b.name.localeCompare(a.name)
    )));
  };

  const handleDelete = async (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${user.role}/${user.id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          // Refresh the users list after successful deletion
          fetchUsers();
        } else {
          const data = await response.json();
          alert(data.message || 'Error deleting user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleSave = () => {
    setUsers(users.map(user => (user.id === selectedUser.id ? selectedUser : user)));
    setIsModalOpen(false);
  };

  const getRoleIcon = (role) => {
    switch(role?.toLowerCase()) {
      case 'admin':
        return <AdminIcon />;
      case 'student':
        return <SchoolIcon />;
      case 'faculty':
        return <WorkIcon />;
      default:
        return <PersonIcon />;
    }
  };
  
  const getRoleColor = (role) => {
    switch(role?.toLowerCase()) {
      case 'admin':
        return 'primary';
      case 'student':
        return 'secondary';
      case 'faculty':
        return 'success';
      default:
        return 'default';
    }
  };
  
  return (
    <PageContainer>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, pt: 3 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              color: 'white', 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              letterSpacing: 1,
            }}
          >
            Registered Users
          </Typography>
          
          <SearchField
            placeholder="Search students and faculty..." 
            value={searchQuery} 
            onChange={handleSearch} 
            variant="outlined"
            sx={{ width: { xs: '100%', md: 350 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: theme.palette.primary.main }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {loading ? (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: 300,
              flexDirection: 'column',
              gap: 2
            }}
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
              Loading users...
            </Typography>
          </Box>
        ) : (
          <StyledTableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <StyledTableHeadCell>
                    <TableSortLabel
                      active={true}
                      direction={sortOrder}
                      onClick={handleSort}
                    >
                      Name
                    </TableSortLabel>
                  </StyledTableHeadCell>
                  <StyledTableHeadCell>Email</StyledTableHeadCell>
                  <StyledTableHeadCell>Role</StyledTableHeadCell>
                  <StyledTableHeadCell>Joined</StyledTableHeadCell>
                  <StyledTableHeadCell align="center">Actions</StyledTableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
            {users
              .filter(user => 
                (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase()))
              )
              .map(user => (
                    <TableRow 
                      key={`${user.role}-${user.id}`}
                      hover
                      sx={{ '&:hover': { backgroundColor: alpha(theme.palette.primary.light, 0.08) } }}
                    >
                      <StyledTableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <StyledAvatar role={user.role}>
                            {user.name.charAt(0)}
                          </StyledAvatar>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontFamily: "'Poppins', sans-serif",
                              fontWeight: 500,
                            }}
                          >
                            {user.name}
                          </Typography>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>
                        {user.email}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Chip
                          icon={getRoleIcon(user.role)}
                          label={user.role}
                          color={getRoleColor(user.role)}
                          sx={{ 
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 500,
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>
                        {user.joined}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          <Tooltip title="View Details">
                            <IconButton 
                              color="info" 
                              onClick={() => handleView(user)}
                              sx={{ 
                                backgroundColor: alpha(theme.palette.info.main, 0.1),
                                '&:hover': {
                                  backgroundColor: alpha(theme.palette.info.main, 0.2),
                                }
                              }}
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete User">
                            <IconButton 
                              color="error" 
                              onClick={() => handleDelete(user)}
                              sx={{ 
                                backgroundColor: alpha(theme.palette.error.main, 0.1),
                                '&:hover': {
                                  backgroundColor: alpha(theme.palette.error.main, 0.2),
                                }
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                {users.filter(user => 
                  (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchQuery.toLowerCase()))
                ).length === 0 && (
                  <TableRow>
                    <StyledTableCell colSpan={5} align="center" sx={{ py: 8 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: theme.palette.text.secondary,
                          fontFamily: "'Poppins', sans-serif",
                          mb: 2
                        }}
                      >
                        No users found matching your search
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: theme.palette.text.secondary,
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        Try adjusting your search criteria
                      </Typography>
                    </StyledTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}

        {/* View User Dialog */}
        <Dialog
          open={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: 3,
              padding: 2,
              maxWidth: 'sm',
              width: '100%'
            }
          }}
        >
          <DialogTitle sx={{ 
            fontFamily: "'Montserrat', sans-serif", 
            fontWeight: 700,
            textAlign: 'center',
            pb: 1
          }}>
            User Details
          </DialogTitle>
          
          {selectedUser && (
            <DialogContent>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                mb: 3
              }}>
                <StyledAvatar 
                  role={selectedUser.role}
                  sx={{ width: 80, height: 80, mb: 2, fontSize: '2rem' }}
                >
                  {selectedUser.name.charAt(0)}
                </StyledAvatar>
                <Chip
                  icon={getRoleIcon(selectedUser.role)}
                  label={selectedUser.role}
                  color={getRoleColor(selectedUser.role)}
                  sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    mb: 1
                  }}
                />
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography 
                    variant="h5" 
                    align="center"
                    sx={{ 
                      fontFamily: "'Montserrat', sans-serif", 
                      fontWeight: 700,
                      mb: 3
                    }}
                  >
                    {selectedUser.name}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ mb: 2 }} />
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Typography 
                    variant="subtitle2" 
                    color="textSecondary"
                    sx={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Email
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography 
                    variant="body1"
                    sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500
                    }}
                  >
                    {selectedUser.email}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Typography 
                    variant="subtitle2" 
                    color="textSecondary"
                    sx={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Joined
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography 
                    variant="body1"
                    sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500
                    }}
                  >
                    {selectedUser.joined}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
          )}
          
          <DialogActions sx={{ padding: 3, justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => setIsViewModalOpen(false)}
              startIcon={<CloseIcon />}
              sx={{ 
                borderRadius: 2,
                px: 3,
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                textTransform: 'none'
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit User Dialog - keeping this for functionality */}
        {isModalOpen && (
          <Dialog
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            PaperProps={{
              sx: {
                borderRadius: 3,
                padding: 2,
                maxWidth: 'sm',
                width: '100%'
              }
            }}
          >
            <DialogTitle sx={{ 
              fontFamily: "'Montserrat', sans-serif", 
              fontWeight: 700,
              textAlign: 'center',
              pb: 1
            }}>
              Edit User
            </DialogTitle>
            
            {selectedUser && (
              <DialogContent>
                <TextField
                  label="Name"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  label="Email"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                
                <FormControl fullWidth margin="normal" variant="outlined" sx={{ mb: 2 }}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={selectedUser.role}
                    onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                    label="Role"
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Faculty">Faculty</MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>
            )}
            
            <DialogActions sx={{ padding: 3, justifyContent: 'space-between' }}>
              <Button 
                variant="outlined" 
                color="error"
                onClick={() => setIsModalOpen(false)}
                sx={{ 
                  borderRadius: 2,
                  px: 3,
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  textTransform: 'none'
                }}
              >
                Cancel
              </Button>
              
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleSave}
                sx={{ 
                  borderRadius: 2,
                  px: 3,
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  textTransform: 'none'
                }}
              >
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Container>
    </PageContainer>
  );
};

export default UsersPage;
