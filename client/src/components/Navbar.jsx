import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Target,
  Menu,
  X,
  Home,
  User,
  LogOut,
  Settings,
  Award,
  BookOpen,
  BarChart3,
  Sparkles,
  ChevronDown,
  LogIn,
  UserPlus
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Analyzer', path: '/analyzer', icon: Target },
    { name: 'Roadmaps', path: '/roadmaps', icon: BookOpen },
    { name: 'Quizzes', path: '/quizzes', icon: BarChart3 },
    { name: 'Features', path: '/features', icon: Sparkles }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b-2 border-purple-100'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-black gradient-text">WhatSkill</h1>
              <p className="text-xs text-gray-500 font-medium">AI Career Analyzer</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/30'
                      : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all duration-200 bg-white"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="text-left hidden xl:block">
                    <p className="text-sm font-bold text-gray-800">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.currentRole}</p>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    
                    {/* Menu */}
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border-2 border-purple-100 py-2 z-50 animate-fadeIn">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-bold text-gray-800">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors"
                      >
                        <User size={18} className="text-purple-600" />
                        <span className="font-medium text-gray-700">My Profile</span>
                      </Link>

                      <Link
                        to="/roadmaps"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors"
                      >
                        <BookOpen size={18} className="text-violet-600" />
                        <span className="font-medium text-gray-700">My Roadmaps</span>
                      </Link>

                      <Link
                        to="/achievements"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors"
                      >
                        <Award size={18} className="text-purple-600" />
                        <span className="font-medium text-gray-700">Achievements</span>
                      </Link>

                      <Link
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors border-t border-gray-100"
                      >
                        <Settings size={18} className="text-gray-600" />
                        <span className="font-medium text-gray-700">Settings</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left border-t border-gray-100"
                      >
                        <LogOut size={18} className="text-red-600" />
                        <span className="font-medium text-red-600">Log Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="btn-outline px-5 py-2.5 text-sm"
                >
                  <LogIn size={18} />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary px-5 py-2.5 text-sm"
                >
                  <UserPlus size={18} />
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-purple-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={28} className="text-purple-600" />
            ) : (
              <Menu size={28} className="text-purple-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t-2 border-purple-100 shadow-xl animate-fadeIn">
          <div className="px-4 py-6 space-y-1">
            {/* User Info (Mobile) */}
            {isAuthenticated && user && (
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl mb-4 border-2 border-purple-100">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{user?.name}</p>
                  <p className="text-sm text-gray-600">{user?.currentRole}</p>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-purple-50'
                  }`}
                >
                  <Icon size={20} />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            {/* Auth Actions (Mobile) */}
            {isAuthenticated ? (
              <>
                <div className="border-t-2 border-gray-100 my-4"></div>
                
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 font-medium"
                >
                  <User size={20} />
                  <span>My Profile</span>
                </Link>

                <Link
                  to="/roadmaps"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 font-medium"
                >
                  <BookOpen size={20} />
                  <span>My Roadmaps</span>
                </Link>

                <Link
                  to="/achievements"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 font-medium"
                >
                  <Award size={20} />
                  <span>Achievements</span>
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 font-medium"
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-medium w-full text-left mt-2"
                >
                  <LogOut size={20} />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <>
                <div className="border-t-2 border-gray-100 my-4"></div>
                
                <Link
                  to="/login"
                  className="btn-outline w-full justify-center py-3 mb-2"
                >
                  <LogIn size={20} />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary w-full justify-center py-3"
                >
                  <UserPlus size={20} />
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;