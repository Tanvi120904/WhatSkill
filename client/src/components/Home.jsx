import React from 'react';
import { LogIn, UserPlus, User, Target, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
const Home = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeIn">
          {/* Floating Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl shadow-2xl shadow-purple-500/30 animate-float">
            <Target className="w-10 h-10 text-white" />
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="gradient-text">Bridge Your</span>
            <br />
            <span className="gradient-text">Skill Gap</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-4 leading-relaxed">
            AI-powered analysis to identify your missing skills and generate a personalized 
            <span className="font-semibold text-purple-700"> 30-day learning roadmap </span>
            to land your dream job.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <div className="badge text-sm">
              <Sparkles className="w-3 h-3" />
              AI-Powered
            </div>
            <div className="badge text-sm">
              <Target className="w-3 h-3" />
              Personalized
            </div>
            <div className="badge text-sm">
              100% Free Resources
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fadeIn">
          <Link to="/analyzer" className="btn-primary py-5 px-10 text-xl group">
            <Target size={26} />
            Start Free Analysis
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Account Actions */}
        <div className="max-w-md mx-auto animate-fadeIn">
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-6 bg-gradient-to-br from-purple-50 via-white to-violet-50 text-gray-500 font-medium">
                Account Access
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <Link to="/login" className="btn-outline py-4 flex-col text-sm hover:scale-105 transition-transform">
              <LogIn size={22} />
              <span className="mt-1">Login</span>
            </Link>
            <Link to="/register" className="btn-outline py-4 flex-col text-sm hover:scale-105 transition-transform">
              <UserPlus size={22} />
              <span className="mt-1">Register</span>
            </Link>
            <Link to="/profile" className="btn-outline py-4 flex-col text-sm hover:scale-105 transition-transform">
              <User size={22} />
              <span className="mt-1">Profile</span>
            </Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16 animate-fadeIn">
          <p className="text-sm text-gray-500 mb-4">Trusted by aspiring professionals worldwide</p>
          <div className="flex items-center justify-center gap-8 text-gray-400">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">10K+</div>
              <div className="text-xs">Analyses</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">95%</div>
              <div className="text-xs">Success Rate</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">Free</div>
              <div className="text-xs">Forever</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;