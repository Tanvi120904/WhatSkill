import React from 'react';
import { LogIn, UserPlus, User, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
      {/* Hero Text */}
      <div className="text-center mb-12">
        <Target className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
        <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
          Bridge Your Skill Gap
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          AI-powered analysis to identify your missing skills and generate a personalized 30-day learning roadmap to land your dream job.
        </p>
      </div>

      {/* Primary Actions */}
      <div className="flex flex-col sm:flex-row gap-6">
        <Link to="/analyzer" className="btn-primary py-4 px-8 text-xl">
          <Target size={24} />
          Start Analysis
        </Link>
      </div>

      {/* Authentication/Profile Actions */}
      <div className="mt-12 w-full max-w-sm">
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gray-50 text-gray-500">
              Account Access
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <Link to="/login" className="btn-outline">
            <LogIn size={18} /> Login
          </Link>
          <Link to="/register" className="btn-outline">
            <UserPlus size={18} /> Register
          </Link>
          <Link to="/profile" className="btn-outline">
            <User size={18} /> Profile
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;