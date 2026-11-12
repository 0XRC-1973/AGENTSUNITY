import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import SkillAssessment from './pages/SkillAssessment';
import MockInterview from './pages/MockInterview';
import JobMarketplace from './pages/JobMarketplace';
import CareerRoadmapView from './pages/CareerRoadmapView';
import RecruiterDashboard from './pages/RecruiterDashboard';

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/resume" element={<ResumeAnalyzer />} />
          <Route path="/assessments" element={<SkillAssessment />} />
          <Route path="/interview" element={<MockInterview />} />
          <Route path="/jobs" element={<JobMarketplace />} />
          <Route path="/learning" element={<CareerRoadmapView />} />
          <Route path="/recruiter" element={<RecruiterDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
