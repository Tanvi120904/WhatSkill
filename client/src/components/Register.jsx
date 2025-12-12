import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  // --- STATE & HOOKS ---
  const navigate = useNavigate();
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
  const [focusedField, setFocusedField] = useState('');

  // --- LOGIC ---
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      // Connects to your Backend
      const { confirmPassword, ...dataToSend } = formData;
      await axios.post('https://whatskill.onrender.com', dataToSend);
      
      // On success, redirect to login
      navigate('/login?registrationSuccess=true');
    } catch (err) {
      setGlobalError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- UI RENDER ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 flex items-center justify-center p-4">
      {/* Floating Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl shadow-purple-500/10 p-8 backdrop-blur-sm border border-purple-100">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-600 rounded-2xl mb-4 shadow-lg shadow-purple-500/40">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Join us and start your journey today</p>
          </div>

          {/* Global Error */}
          {globalError && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-sm text-red-700">{globalError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative group">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'name' ? 'text-purple-600' : 'text-gray-400'}`} />
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  placeholder="John Doe"
                  className={`w-full pl-11 pr-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${errors.name ? 'border-red-300 focus:border-red-500' : 'border-transparent focus:border-purple-500 focus:bg-white focus:shadow-lg'}`}
                  disabled={loading}
                />
              </div>
              {errors.name && <p className="text-xs text-red-600 mt-1 ml-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative group">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-purple-600' : 'text-gray-400'}`} />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  placeholder="you@example.com"
                  className={`w-full pl-11 pr-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-transparent focus:border-purple-500 focus:bg-white focus:shadow-lg'}`}
                  disabled={loading}
                />
              </div>
              {errors.email && <p className="text-xs text-red-600 mt-1 ml-1">{errors.email}</p>}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Role</label>
              <div className="relative group">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'currentRole' ? 'text-purple-600' : 'text-gray-400'}`} />
                <input
                  name="currentRole"
                  type="text"
                  value={formData.currentRole}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('currentRole')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Software Engineer"
                  className={`w-full pl-11 pr-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${errors.currentRole ? 'border-red-300 focus:border-red-500' : 'border-transparent focus:border-purple-500 focus:bg-white focus:shadow-lg'}`}
                  disabled={loading}
                />
              </div>
              {errors.currentRole && <p className="text-xs text-red-600 mt-1 ml-1">{errors.currentRole}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative group">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-purple-600' : 'text-gray-400'}`} />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-11 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${errors.password ? 'border-red-300 focus:border-red-500' : 'border-transparent focus:border-purple-500 focus:bg-white focus:shadow-lg'}`}
                  disabled={loading}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-600 mt-1 ml-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative group">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'confirmPassword' ? 'text-purple-600' : 'text-gray-400'}`} />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField('')}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-11 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${errors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-transparent focus:border-purple-500 focus:bg-white focus:shadow-lg'}`}
                  disabled={loading}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600">
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-600 mt-1 ml-1">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500">Already have an account?</span></div>
          </div>

          {/* Navigation Button */}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full border-2 border-purple-200 hover:border-purple-300 text-purple-600 hover:text-purple-700 font-semibold py-3.5 px-6 rounded-xl hover:bg-purple-50 transition-all duration-300"
          >
            Sign In Instead
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-6">
            By creating an account, you agree to our <a href="#" className="text-purple-600 hover:underline">Terms</a> and <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;