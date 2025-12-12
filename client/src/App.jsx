import React, { useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { Rocket, LogOut } from "lucide-react";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/FeatureSection";
import SkillAnalyzer from "./components/SkillAnalyzer";
import ResultsDashboard from "./components/ResultsDashboard";
import LearningRoadmap from "./components/LearningRoadmap";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

import { generateRoadmap, updateRoadmapProgress } from "./services/api";

function App() {
  const [step, setStep] = useState("home");
  const [analysis, setAnalysis] = useState(null);
  const [analysisId, setAnalysisId] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = !!localStorage.getItem("token");

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // When skill analysis completes
  const handleAnalysisComplete = (result) => {
    setAnalysisId(result.analysisId);
    setAnalysis(result.analysis);
    setStep("results");
  };

  const handleGenerateRoadmap = async () => {
    if (!analysisId) return;
    setLoading(true);

    try {
      const response = await generateRoadmap(analysisId);
      setRoadmap(response.roadmap);
      setStep("roadmap");
    } catch (err) {
      console.error(err);
      alert("Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleProgress = async (task) => {
    const newValue = !progress[task];

    setProgress((prev) => ({
      ...prev,
      [task]: newValue,
    }));

    try {
      await updateRoadmapProgress(analysisId, { [task]: newValue });
    } catch (err) {
      console.error("Error updating progress:", err);
      setProgress((prev) => ({
        ...prev,
        [task]: !newValue,
      }));
    }
  };

  const handleReset = () => {
    setStep("home");
    setAnalysis(null);
    setRoadmap(null);
    setAnalysisId(null);
    setProgress({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      {/* 🔥 Navbar ALWAYS visible */}
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} onReset={handleReset} />

      {/* ROUTES */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="max-w-7xl mx-auto px-4">
              {step === "home" && (
                <>
                  <Hero />
                  <SkillAnalyzer onAnalysisComplete={handleAnalysisComplete} />
                </>
              )}

              {step === "results" && analysis && (
                <ResultsDashboard
                  analysis={analysis}
                  onGenerateRoadmap={handleGenerateRoadmap}
                  loading={loading}
                />
              )}

              {step === "roadmap" && roadmap && (
                <LearningRoadmap
                  roadmap={roadmap}
                  progress={progress}
                  onToggleProgress={handleToggleProgress}
                />
              )}
            </div>
          }
        />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
      </Routes>

      {/* FOOTER AVAILABLE ON ALL PAGES */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-600 mb-1">Built for TATVA'25 Hackathon</p>
          <p className="text-sm text-gray-500">© 2024 WhatSkill — All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
