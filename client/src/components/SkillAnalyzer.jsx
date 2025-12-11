import React, { useState } from 'react';
import { Target, Loader2, Briefcase, User } from 'lucide-react';
import { analyzeSkills } from '../services/api'; // Assuming this is defined
// import "../styles/SkillsAnalyzer.css"; // Removed custom CSS import

const SkillAnalyzer = ({ onAnalysisComplete }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [userSkills, setUserSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    // Validation
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
      // Assuming analyzeSkills handles the API call and returns a results object
      // const result = await analyzeSkills(jobDescription, userSkills);
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-2 text-gray-900">
          <Target className="w-8 h-8 inline-block text-indigo-600 mr-2 -mt-1" />
          Skill Gap Analyzer
        </h2>
        <p className="text-gray-600 text-lg">Compare your profile against your target job</p>
      </div>

      <div className="card space-y-8">
        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {error}
          </div>
        )}

        {/* Job Description Input */}
        <div>
          <label htmlFor="jobDescription" className="block text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
            <Briefcase size={20} className="text-purple-600"/>
            Target Job Description (JD)
          </label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here (Role, Requirements, Responsibilities...)"
            className="input-field h-48 resize-none"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1 flex justify-between">
            <span>Minimum 50 characters for analysis</span>
            <span>{jobDescription.length} characters</span>
          </p>
        </div>

        {/* User Skills Input */}
        <div>
          <label htmlFor="userSkills" className="block text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
            <User size={20} className="text-indigo-600"/>
            Your Current Skills & Experience
          </label>
          <textarea
            id="userSkills"
            value={userSkills}
            onChange={(e) => setUserSkills(e.target.value)}
            placeholder="List your skills, technologies, experience, education, certifications, projects, etc..."
            className="input-field h-48 resize-none"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1 text-right">
            {userSkills.length} characters
          </p>
        </div>
        
        {/* Example Load Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleExampleLoad}
            className="text-sm text-purple-600 hover:text-purple-800 hover:underline transition"
            disabled={loading}
          >
            Load Example Data
          </button>
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="btn-primary w-full py-4 text-xl"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Target className="w-5 h-5" />
              Analyze Skill Gap
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-500 mt-3">
          Powered by Generative AI. Accuracy is approximate.
        </p>
      </div>
    </div>
  );
};

export default SkillAnalyzer;