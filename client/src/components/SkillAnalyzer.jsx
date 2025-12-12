import React, { useState } from 'react';
import { Target, Loader2, Briefcase, User, Sparkles, Zap } from 'lucide-react';
import { analyzeSkills } from '../services/api';
import Navbar from './Navbar';

const SkillAnalyzer = ({ onAnalysisComplete }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [userSkills, setUserSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }
    
    if (!userSkills.trim()) {
      setError('Please enter your skills');
      return;
    }

    if (jobDescription.length < 50) {
      setError('Job description is too short. Please provide more details.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Mock result for demonstration
      const result = {
        currentSkills: ['React', 'JavaScript', 'Tailwind CSS'],
        missingSkills: ['Node.js', 'Express', 'MongoDB'],
        partialSkills: ['AWS', 'CI/CD']
      };
      onAnalysisComplete(result);
    } catch (err) {
      setError(err.message || 'Failed to analyze. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleLoad = () => {
    setJobDescription(`Senior Full Stack Developer
We are looking for a highly skilled Senior Full Stack Developer to join our team. 
Required Skills: Node.js, Express, MongoDB, React, Redux, JavaScript (ES6+), AWS services (S3, Lambda), CI/CD pipelines, and strong testing practices.
Experience: 5+ years in a professional setting.`);
    setUserSkills(`I have 3 years of experience as a Frontend Developer. My skills include: React, JavaScript, HTML, CSS, and Tailwind CSS. I've built several personal projects and contributed to an open-source project.`);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl shadow-2xl shadow-purple-500/30 mb-6 animate-float">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black gradient-text mb-4">
            Skill Gap Analyzer
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare your profile against your target job and discover what you need to learn
          </p>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <div className="badge">
              <Sparkles className="w-3 h-3" />
              AI-Powered
            </div>
            <div className="badge">
              <Zap className="w-3 h-3" />
              Instant Analysis
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="card border-2 border-purple-100 space-y-8 animate-fadeIn">
          {error && (
            <div className="p-4 text-sm text-red-700 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3" role="alert">
              <span className="text-red-500 text-xl">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Job Description Input */}
          <div>
            <label htmlFor="jobDescription" className="block text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Briefcase size={20} className="text-purple-600"/>
              </div>
              Target Job Description (JD)
            </label>
            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here (Role, Requirements, Responsibilities...)"
              className="input-field h-52 resize-none text-base"
              disabled={loading}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">
                Minimum 50 characters required
              </p>
              <p className={`text-xs font-semibold ${jobDescription.length >= 50 ? 'text-green-600' : 'text-gray-400'}`}>
                {jobDescription.length} characters
              </p>
            </div>
          </div>

          {/* User Skills Input */}
          <div>
            <label htmlFor="userSkills" className="block text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <div className="p-2 bg-violet-100 rounded-lg">
                <User size={20} className="text-violet-600"/>
              </div>
              Your Current Skills & Experience
            </label>
            <textarea
              id="userSkills"
              value={userSkills}
              onChange={(e) => setUserSkills(e.target.value)}
              placeholder="List your skills, technologies, experience, education, certifications, projects, etc..."
              className="input-field h-52 resize-none text-base"
              disabled={loading}
            />
            <div className="flex justify-end mt-2">
              <p className="text-xs text-gray-500 font-semibold">
                {userSkills.length} characters
              </p>
            </div>
          </div>
          
          {/* Example Load Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleExampleLoad}
              className="text-sm text-purple-600 hover:text-purple-800 font-semibold hover:underline transition"
              disabled={loading}
            >
              ✨ Load Example Data
            </button>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="btn-primary w-full py-5 text-xl group"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Target className="w-6 h-6" />
                Analyze Skill Gap
                <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-500">
            Powered by Advanced AI • Results in seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillAnalyzer;