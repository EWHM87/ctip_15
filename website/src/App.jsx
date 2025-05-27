import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthService from './auth';
import ProtectedRoute from './ProtectedRoute';
import Sidebar from './Sidebar';

import Login from './Login';
import Dashboard from './Dashboard';
import ParkInfo from './ParkInfo';
import Training from './Training';
import ManageGuides from './ManageGuides';
import Forbidden from './Forbidden';
import Register from './register';
import RegisterGuide from './registerguide';
import Qualifications from './qualifications';
import ScheduleTraining from './scheduletraining';
import CertificationReminders from './certificationreminders';
import Notifications from './notification';
import MyCertifications from './mycertifications';
import Home from './Home';
import About from './about';
import Parks from './parks';
import Wildlife from './wildlife';
import Activities from './activites';
import Contact from './contact';
import SendNotification from './SendNotification';
import GuideActivityLog from './GuideActivityLog';
import IoTSpeciesMonitor from './IoTSpeciesMonitor';
import MyTrainingHistory from './MyTrainingHistory';
import BiodiversityUpload from './BiodiversityUpload';

import FeedbackReview from './FeedbackReview';
import AITrainingRecommendations from './AITrainingRecommendations';
import TrainingQuizBuilder from './TrainingQuizBuilder'; // ✅ Make sure this import is correct
import BiodiversityCamera from './BiodiversityCamera';
import SpeciesDatabase from './SpeciesDatabase';

import FeedbackForm from './FeedbackForm';
import GuideSelfAssessment from './GuideSelfAssessment';
import GuidePerformance from './GuidePerformance';

// Interactive Guidebook Module
import Guidebook from './Guidebook';
import InteractiveMap from './InteractiveMap';
import Destinations from './Destinations';

import Accommodation from './Accommodation';
import History from './History';
import Updates from './Updates';

function MainLayout({ user, onLogout, children }) {
  return (
    <div className="app-container">
      {user && <Sidebar role={user.role} onLogout={onLogout} />}
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(AuthService.getCurrentUser());

  const handleLogin = () => setUser(AuthService.getCurrentUser());
  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/parks" element={<Parks />} />
      <Route path="/wildlife" element={<Wildlife />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />

      {/* Digital Guidebook (Public Access) */}
      <Route path="/guidebook" element={<Guidebook />} />
      <Route path="/guidebook/map" element={<InteractiveMap />} />
      <Route path="/guidebook/wildlife" element={<Wildlife />} />
      <Route path="/guidebook/destinations" element={<Destinations />} />
      <Route path="/guidebook/accommodation" element={<Accommodation />} />
      <Route path="/guidebook/activities" element={<Activities />} />
      <Route path="/guidebook/history" element={<History />} />
      <Route path="/guidebook/updates" element={<Updates />} />

      {/* Protected Pages */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={['admin', 'guide', 'visitor']}>
          {user?.role === 'visitor' ? (
            <Navigate to="/home" replace />
          ) : (
            <MainLayout user={user} onLogout={handleLogout}>
              <Dashboard />
            </MainLayout>
          )}
        </ProtectedRoute>
      } />

      <Route path="/admin-notify" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <SendNotification />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/guide-activity-log" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <GuideActivityLog />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/iot-species-monitor" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <IoTSpeciesMonitor />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/park-info" element={
        <ProtectedRoute allowedRoles={['admin', 'guide', 'visitor']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <ParkInfo />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/training" element={
        <ProtectedRoute allowedRoles={['admin', 'guide']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <Training />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/manage-guides" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <ManageGuides />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/register-guide" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <RegisterGuide />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/qualifications" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <Qualifications />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/schedule-training" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <ScheduleTraining />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/certification-reminders" element={
        <ProtectedRoute allowedRoles={['admin', 'guide']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <CertificationReminders />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/notifications" element={
        <ProtectedRoute allowedRoles={['guide']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <Notifications />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/my-certifications" element={
        <ProtectedRoute allowedRoles={['guide']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <MyCertifications />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/my-training-history" element={
        <ProtectedRoute allowedRoles={['guide']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <MyTrainingHistory />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* 🟢 Training Quiz Page for guides and admins */}
      <Route path="/quiz/:scheduleId" element={
        <ProtectedRoute allowedRoles={['guide', 'admin']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <TrainingQuizBuilder />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/biodiversity-upload" element={
        <ProtectedRoute allowedRoles={['guide']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <BiodiversityUpload />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/feedback-review" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <FeedbackReview />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* ✅ Corrected Path Here */}
      <Route path="/ai-training-recommendations" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <AITrainingRecommendations />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/training-quiz-builder" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <TrainingQuizBuilder />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/biodiversity-camera" element={
        <ProtectedRoute allowedRoles={['admin', 'guide']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <BiodiversityCamera />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/species-database" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <SpeciesDatabase />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/feedback" element={
        <ProtectedRoute allowedRoles={['visitor']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <FeedbackForm />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/guide-assessment" element={
        <ProtectedRoute allowedRoles={['guide']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <GuideSelfAssessment />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/guide-performance" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout user={user} onLogout={handleLogout}>
            <GuidePerformance />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Forbidden and Fallback */}
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;
