import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Loader2, Briefcase, Target, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    currentRole: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.currentRole.trim()) {
      newErrors.currentRole = 'Current role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
    setGlobalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');

    if (!validateForm()) {
      setGlobalError('Please fix the errors above.');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...dataToSend } = formData;
      const response = await axios.post('/api/auth/register', dataToSend);
      
      navigate('/login?registrationSuccess=true');

    } catch (err) {
      setGlobalError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (fieldName) => 
    `input-field pl-12 ${errors[fieldName] ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`;

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 card w-full max-w-lg border-2 border-purple-100 animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl shadow-lg shadow-purple-500/30 mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold gradient-text mb-2">Create Account</h2>
          <p className="text-gray-600">Start your journey to your dream job</p>
        </div>

        {globalError && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3" role="alert">
            <span className="text-red-500 text-xl">⚠️</span>
            <span>{globalError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={inputClass('name')}
                disabled={loading}
              />
            </div>
            {errors.name && <p className="text-xs text-red-600 mt-1.5 ml-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass('email')}
                disabled={loading}
              />
            </div>
            {errors.email && <p className="text-xs text-red-600 mt-1.5 ml-1">{errors.email}</p>}
          </div>

          {/* Current Role Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="currentRole">
              Current Role/Experience
            </label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="currentRole"
                type="text"
                name="currentRole"
                value={formData.currentRole}
                onChange={handleChange}
                placeholder="Software Engineer, Student, etc."
                className={inputClass('currentRole')}
                disabled={loading}
              />
            </div>
            {errors.currentRole && <p className="text-xs text-red-600 mt-1.5 ml-1">{errors.currentRole}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field pl-12 pr-12"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={loading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-600 mt-1.5 ml-1">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field pl-12 pr-12"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                disabled={loading}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-xs text-red-600 mt-1.5 ml-1">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary w-full py-4 text-lg group mt-6"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={22} />
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus size={22} />
                Create Account
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-white text-gray-500 font-medium text-sm">
              Already have an account?
            </span>
          </div>
        </div>

        {/* Sign In Link */}
        <Link to="/login" className="btn-outline w-full py-4">
          Sign In Instead
        </Link>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          By creating an account, you agree to our{' '}
          <Link to="/terms" className="text-purple-600 hover:text-purple-800 font-medium hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-purple-600 hover:text-purple-800 font-medium hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;