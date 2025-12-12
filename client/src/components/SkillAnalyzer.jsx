import React, { useState } from 'react';
import { Target, Loader2, Briefcase, User, Sparkles, Zap } from 'lucide-react';
import axios from 'axios';

const SkillAnalyzer = ({ onAnalysisComplete }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [userSkills, setUserSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
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
      const token = localStorage.getItem('token'); 
      const response = await axios.post(
        'https://whatskill.onrender.com/api/analysis/skills', 
        { jobDescription, userSkills },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onAnalysisComplete(response.data.analysis);
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
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
      {/* ... UI unchanged ... */}
    </div>
  );
};

export default SkillAnalyzer;
