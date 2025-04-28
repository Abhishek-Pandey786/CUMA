import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import Navbar from "./components/Navbar";
import AdminLoginPage from "./pages/AdminLoginPage";
import FacultyLoginPage from "./pages/FacultyLoginPage";
import StudentLoginPage from "./pages/StudentLoginPage";
import TermsPage from "./pages/TermsPage";
import StudentSignUpPage from "./pages/StudentSignUpPage";
import FacultySignUpPage from "./pages/FacultySignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminPage from "./pages/AdminPage";
import UsersPage from "./pages/UsersPage";
import AdminReports from "./pages/AdminReports";
import FacultyDashboard from "./pages/FacultyDashboard";
import FacultyProfile from "./pages/FacultyProfile";
import MyCourses from "./pages/MyCourses";
import StudentPage from "./pages/StudentPage";
import AdminHomePage from "./pages/AdminHomePage";
import ClassesEvents from "./pages/ClassesEvents";
import { UserProvider } from './context/UserContext';
import TranslationPage from './pages/TranslationPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import { Toaster } from 'react-hot-toast';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Create a theme to ensure consistency
const theme = createTheme({
  palette: {
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#2ecc71',
    },
  },
});

// Layout component to provide consistent spacing
const MainLayout = ({ children }) => {
  return (
    <Box sx={{ 
      paddingTop: { xs: '64px', sm: '70px' }, // Match navbar height
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {children}
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Router>
          <Toaster position="top-right" />
          <Navbar />
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signup/student" element={<StudentSignUpPage />} />
              <Route path="/signup/faculty" element={<FacultySignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/admin-login" element={<AdminLoginPage />} />
              <Route path="/admin/home" element={<AdminHomePage />} />
              <Route path="/admin-dashboard" element={<AdminPage />} />
              <Route path="/faculty-login" element={<FacultyLoginPage />} />
              <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
              <Route path="/faculty-profile" element={<FacultyProfile />} />
              <Route path="/faculty-my-courses" element={<MyCourses />} />
              <Route path="/student-login" element={<StudentLoginPage />} />
              <Route path="/student-page" element={<StudentPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/admin-users" element={<UsersPage />} />
              <Route path="/admin-reports" element={<AdminReports />} />
              <Route path="/faculty-classes-events" element={<ClassesEvents />} />
              <Route path="/translation" element={<TranslationPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
            </Routes>
          </MainLayout>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
