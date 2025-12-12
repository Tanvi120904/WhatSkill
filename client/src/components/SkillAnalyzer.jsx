import React, { useState } from 'react';
import { Target, Loader2, Briefcase, User, Sparkles, Zap } from 'lucide-react';
import axios from 'axios';

const SkillAnalyzer = ({ onAnalysisComplete }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [userSkills, setUserSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // --- 1. HANDLE ANALYZE (Connects to Backend) ---
  const handleAnalyze = async () => {
    // Validation
    if (!jobDescription.trim() || !userSkills.trim()) {
      setError('Please fill in both fields');
      return;
    }

    if (jobDescription.length < 50) {
      setError('Job description is too short. Please provide more details.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get token for authentication
      const token = localStorage.getItem('token'); 

      // API Call to your Node.js Backend
      const response = await axios.post(
        'https://whatskill.onrender.com', 
        {
          jobDescription,
          userSkills
        },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
      );

      // Pass the analysis data to the parent component to show results
      onAnalysisComplete(response.data.analysis);

    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. LOAD EXAMPLE DATA ---
  const handleExampleLoad = () => {
    setJobDescription(`Senior Full Stack Developer
We are looking for a highly skilled Senior Full Stack Developer to join our team. 
Required Skills: Node.js, Express, MongoDB, React, Redux, JavaScript (ES6+), AWS services (S3, Lambda), CI/CD pipelines, and strong testing practices.
Experience: 5+ years in a professional setting.`);
    setUserSkills(`I have 3 years of experience as a Frontend Developer. My skills include: React, JavaScript, HTML, CSS, and Tailwind CSS. I've built several personal projects and contributed to an open-source project.`);
  };

  // --- 3. UI RENDER ---
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl shadow-2xl shadow-purple-500/30 mb-6 animate-float">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black gradient-text mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600">
            Skill Gap Analyzer
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare your profile against your target job and discover what you need to learn
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              AI-Powered
            </div>
            <div className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold flex items-center gap-2">
              <Zap className="w-3 h-3" />
              Instant Analysis
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-purple-50 space-y-8 animate-fadeIn">
          
          {/* Error Message */}
          {error && (
            <div className="p-4 text-sm text-red-700 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
              <span className="text-red-500 text-xl">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* INPUT 1: Job Description */}
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
              className="w-full p-4 h-52 resize-none text-base border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
              disabled={loading}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">Minimum 50 characters required</p>
              <p className={`text-xs font-semibold ${jobDescription.length >= 50 ? 'text-green-600' : 'text-gray-400'}`}>
                {jobDescription.length} characters
              </p>
            </div>
          </div>

          {/* INPUT 2: User Skills */}
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
              className="w-full p-4 h-52 resize-none text-base border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
              disabled={loading}
            />
            <div className="flex justify-end mt-2">
              <p className="text-xs text-gray-500 font-semibold">{userSkills.length} characters</p>
            </div>
          </div>
          
          {/* Load Example Button */}
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
            className="w-full py-5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold text-xl rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
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
                <Sparkles className="w-5 h-5" />
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