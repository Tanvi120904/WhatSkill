// src/App.jsx (Full modified code)

import React, { useState } from 'react';
import { Rocket } from 'lucide-react';
import { Routes, Route, Link, useLocation } from "react-router-dom"; // REACT ROUTER IMPORTS

// CORRECTED IMPORT: Assuming the file is named Hero.jsx and is inside the components folder
import Hero from './components/FeatureSection'; 

import SkillAnalyzer from './components/SkillAnalyzer';
import ResultsDashboard from './components/ResultsDashboard';
import LearningRoadmap from './components/LearningRoadmap';
// Assuming you have Login, Register, Profile components in the components folder
import Login from './components/Login'; 
import Register from './components/Register'; 
import Profile from './components/Profile'; 
import { generateRoadmap, updateRoadmapProgress } from './services/api';


// Helper component to house the main state machine logic
const MainAnalyzerFlow = ({ analysisState, handlers }) => {
  const { step, analysis, roadmap, progress, loading } = analysisState;
  const { handleAnalysisComplete, handleGenerateRoadmap, handleToggleProgress, handleReset } = handlers;

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Dynamic Header Button based on current step (Moved to App component for clarity) */}

      {/* Main Content Render */}
      <main>
        {step === 'home' && (
          <>
            {/* Using the correctly imported component: Hero */}
            <Hero />
            <SkillAnalyzer onAnalysisComplete={handleAnalysisComplete} />
          </>
        )}

        {step === 'results' && analysis && (
          <ResultsDashboard
            analysis={analysis}
            onGenerateRoadmap={handleGenerateRoadmap}
            loading={loading}
          />
        )}

        {step === 'roadmap' && roadmap && (
          <LearningRoadmap
            roadmap={roadmap}
            progress={progress}
            onToggleProgress={handleToggleProgress}
          />
        )}
      </main>
    </div>
  );
};


function App() {
  const [step, setStep] = useState('home'); 
  const [analysisId, setAnalysisId] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(false);
  
  // Use useLocation hook to detect if we are on a clean route like /login
  const location = useLocation(); 

  // Handlers (using your provided implementation)
  const handleAnalysisComplete = (result) => {
    setAnalysisId(result.analysisId);
    setAnalysis(result.analysis);
    setStep('results');
  };

  const handleGenerateRoadmap = async () => {
    if (!analysisId) return;

    setLoading(true);
    try {
      const result = await generateRoadmap(analysisId);
      setRoadmap(result.roadmap);
      setStep('roadmap');
    } catch (error) {
      console.error('Roadmap generation error:', error);
      alert('Failed to generate roadmap: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleProgress = async (taskKey) => {
    const newStatus = !progress[taskKey];
    
    // Optimistically update UI
    setProgress(prev => ({
      ...prev,
      [taskKey]: newStatus
    }));

    // Update backend
    try {
      await updateRoadmapProgress(analysisId, { [taskKey]: newStatus });
    } catch (error) {
      console.error('Progress update error:', error);
      // Revert on error
      setProgress(prev => ({
        ...prev,
        [taskKey]: !newStatus
      }));
    }
  };

  const handleReset = () => {
    setStep('home');
    setAnalysisId(null);
    setAnalysis(null);
    setRoadmap(null);
    setProgress({});
    setLoading(false);
  };
  
  // Conditionally show main app header/footer logic
  // Check if the current route is one of the separate pages
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/profile';

  const analysisState = { step, analysis, roadmap, progress, loading };
  const handlers = { handleAnalysisComplete, handleGenerateRoadmap, handleToggleProgress, handleReset };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      
      {/* Header (Only show if not on Auth route) */}
      {!isAuthRoute && (
        <header className="bg-white/80 backdrop-blur-sm border-b border-indigo-100 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            {/* Link to go to the home/analysis flow */}
            <Link to="/" onClick={handleReset} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  WhatSkill
                </h1>
                <p className="text-xs text-gray-600">
                  AI-Powered Career Gap Analyzer
                </p>
              </div>
            </Link>
            
            {/* Authentication/Profile links */}
            <div className="flex items-center gap-4">
               {/* This button should only appear if on the main flow but not on the 'home' step */}
               {location.pathname === '/' && step !== 'home' && (
                 <button
                   onClick={handleReset}
                   className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium"
                 >
                   New Analysis
                 </button>
               )}
              <Link to="/login" className="px-4 py-2 text-sm text-indigo-600 font-medium hover:text-purple-700 transition">
                Sign In
              </Link>
              <Link to="/register" className="ml-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">
                Sign Up
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-purple-700 transition">
                Profile
              </Link>
            </div>
          </div>
        </header>
      )}

      {/* REACT ROUTER ROUTES */}
      <Routes>
        {/* Main Application Flow Route (The path is '/' and renders the state machine) */}
        <Route path="/" element={<MainAnalyzerFlow analysisState={analysisState} handlers={handlers} />} />

        {/* Separate Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add utility routes from Login/Register components */}
        <Route path="/terms" element={<div>Terms of Service Page</div>} />
        <Route path="/privacy" element={<div>Privacy Policy Page</div>} />
      </Routes>
      
      {/* Footer (Only show if not on Auth route) */}
      {!isAuthRoute && (
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                Built with ❤️ for the Hackathon
              </p>
              <p className="text-sm text-gray-500">
                Powered by Claude AI • React • Node.js • MongoDB
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;