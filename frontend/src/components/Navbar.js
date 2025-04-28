import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
  Tooltip,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Home as HomeIcon,
  Info as InfoIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  Translate as TranslateIcon
} from '@mui/icons-material';
import christLogo from '../assets/christ.png';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2c3e50, #3498db)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

const LogoImg = styled('img')({
  height: 45,
  marginRight: 12,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const NavButton = styled(Button)(({ theme }) => ({
  margin: '0 8px',
  color: 'white',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '0%',
    height: '2px',
    bottom: 0,
    left: '50%',
    backgroundColor: 'white',
    transition: 'width 0.3s ease, left 0.3s ease',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    '&:after': {
      width: '80%',
      left: '10%',
    },
  },
}));

const SignupButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#2ecc71',
  color: 'white',
  borderRadius: '20px',
  padding: '6px 16px',
  marginLeft: '10px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  '&:hover': {
    backgroundColor: '#27ae60',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '20px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
  },
}));

const Navbar = () => {
  const { userInfo, setUserInfo } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const checkUserLogin = useCallback(() => {
    // Check all possible user types
    const admin = JSON.parse(localStorage.getItem('adminInfo'));
    const student = JSON.parse(localStorage.getItem('studentInfo'));
    const faculty = JSON.parse(localStorage.getItem('facultyInfo'));

    if (admin) {
      setUserInfo({ name: 'Admin', role: 'admin' });
    } else if (student) {
      setUserInfo({ name: student.fullName, role: 'student' });
    } else if (faculty) {
      setUserInfo({ name: faculty.fullName, role: 'faculty' });
    }
  }, [setUserInfo]);

  useEffect(() => {
    checkUserLogin();
  }, [checkUserLogin]);

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('studentInfo');
    localStorage.removeItem('studentToken');
    localStorage.removeItem('facultyInfo');
    localStorage.removeItem('facultyToken');
    setUserInfo(null);
    handleCloseUserMenu();
    navigate('/');
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const getDashboardUrl = () => {
    if (!userInfo) return '/';
    
    switch(userInfo.role) {
      case 'admin': return '/admin/home';
      case 'faculty': return '/faculty-dashboard';
      case 'student': return '/student-page';
      default: return '/';
    }
  };

  return (
    <>
      <StyledAppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo & Brand - Desktop */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2 }}>
              <LogoImg src={christLogo} alt="Christ University Logo" />
              <Typography
                variant="h5"
                noWrap
                component={Link}
                to="/"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                CUMA
              </Typography>
            </Box>

            {/* Mobile Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/'); }}>
                  <HomeIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/about'); }}>
                  <InfoIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography textAlign="center">About</Typography>
                </MenuItem>
                <MenuItem onClick={() => { 
                  handleCloseNavMenu(); 
                  if (userInfo) {
                    navigate('/translation');
                  }
                }}>
                  <TranslateIcon fontSize="small" sx={{ mr: 1, color: userInfo ? 'inherit' : 'text.disabled' }} />
                  <Typography textAlign="center" color={userInfo ? 'inherit' : 'text.disabled'}>
                    Translation {!userInfo && '(Login required)'}
                  </Typography>
                </MenuItem>
                {userInfo && (
                  <MenuItem onClick={() => { handleCloseNavMenu(); navigate(getDashboardUrl()); }}>
                    <DashboardIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>

            {/* Logo & Brand - Mobile */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', flexGrow: 1 }}>
              <LogoImg src={christLogo} alt="Christ University Logo" style={{ height: 40 }} />
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                CUMA
              </Typography>
            </Box>

            {/* Desktop Nav Links */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <NavButton
                component={Link}
                to="/"
                startIcon={<HomeIcon />}
                sx={location.pathname === '/' ? { borderBottom: '2px solid white' } : {}}
              >
                Home
              </NavButton>
              <NavButton
                component={Link}
                to="/about"
                startIcon={<InfoIcon />}
                sx={location.pathname === '/about' ? { borderBottom: '2px solid white' } : {}}
              >
                About
              </NavButton>
              <Tooltip title={userInfo ? "" : "Please login to use this feature"} arrow>
                <span>
                  <NavButton
                    component={userInfo ? Link : 'button'}
                    to={userInfo ? "/translation" : undefined}
                    onClick={userInfo ? undefined : (e) => e.preventDefault()}
                    startIcon={<TranslateIcon />}
                    sx={{
                      ...(!userInfo && {
                        color: 'rgba(255, 255, 255, 0.5)',
                        cursor: 'not-allowed',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          '&:after': {
                            width: '0%',
                          },
                        },
                        '&:after': {
                          backgroundColor: 'transparent',
                        }
                      }),
                      ...(location.pathname === '/translation' ? { borderBottom: '2px solid white' } : {})
                    }}
                    disabled={!userInfo}
                  >
                    Translation
                  </NavButton>
                </span>
              </Tooltip>
              {userInfo && (
                <NavButton
                  component={Link}
                  to={getDashboardUrl()}
                  startIcon={<DashboardIcon />}
                  sx={location.pathname.includes('dashboard') || 
                     location.pathname.includes('/admin/home') || 
                     location.pathname.includes('/student-page') 
                    ? { borderBottom: '2px solid white' } : {}}
                >
                  Dashboard
                </NavButton>
              )}
            </Box>

            {/* User Menu or Auth Buttons */}
            <Box sx={{ flexGrow: 0 }}>
              {userInfo ? (
                <>
                  <Tooltip title="Account settings">
                    <Button 
                      onClick={handleOpenUserMenu} 
                      color="inherit"
                      sx={{
                        textTransform: 'none',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '20px',
                        padding: '6px 15px'
                      }}
                      startIcon={<AccountCircle />}
                    >
                      {!isMobile && `Welcome, ${userInfo.name}`}
                    </Button>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={() => { handleCloseUserMenu(); navigate(getDashboardUrl()); }}>
                      <DashboardIcon fontSize="small" sx={{ mr: 1 }} />
                      <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon fontSize="small" sx={{ mr: 1, color: '#e74c3c' }} />
                      <Typography textAlign="center" color="#e74c3c">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LoginButton 
                    component={Link} 
                    to="/login"
                    variant="outlined"
                    startIcon={<AccountCircle />}
                  >
                    Login
                  </LoginButton>
                  <SignupButton 
                    component={Link} 
                    to="/signup"
                    variant="contained"
                  >
                    Sign Up
                  </SignupButton>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
    </>
  );
};

export default Navbar;
