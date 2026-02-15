import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import NewPatient from './pages/NewPatient';
import PatientProfile from './pages/PatientProfile';
import Consultations from './pages/Consultations';
import Resources from './pages/Resources';
import DashboardLayout from './layouts/DashboardLayout';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/patients"
            element={
              <DashboardLayout>
                <Patients />
              </DashboardLayout>
            }
          />
          <Route
            path="/patients/new"
            element={
              <DashboardLayout>
                <NewPatient />
              </DashboardLayout>
            }
          />
          <Route
            path="/patients/:id"
            element={
              <DashboardLayout>
                <PatientProfile />
              </DashboardLayout>
            }
          />
          <Route
            path="/consultations"
            element={
              <DashboardLayout>
                <Consultations />
              </DashboardLayout>
            }
          />
          <Route
            path="/resources"
            element={
              <DashboardLayout>
                <Resources />
              </DashboardLayout>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
