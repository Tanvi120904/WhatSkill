import React, { useState, useEffect } from 'react';
import {
  User, Mail, Briefcase, Edit2, Save, X, Target, TrendingUp, Award, Calendar, LogOut, Settings, Loader2, Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentRole: '',
    bio: '',
    skills: []
  });
  const [stats, setStats] = useState({
    completedRoadmaps: 0,
    skillsLearned: 0,
    totalProgress: 0
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await axios.get('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const userData = response.data.user;
      setUser(userData);
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        currentRole: userData.currentRole || '',
        bio: userData.bio || '',
        skills: userData.skills || []
      });
      setStats(response.data.stats || stats);
    } catch (err) {
      setError('Failed to fetch profile. Please try logging in again.');
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
        const token = localStorage.getItem('token');
        await axios.put('/api/user/profile', formData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setUser(prev => ({...prev, ...formData}));
        setEditing(false);
    } catch (err) {
        setError(err.response?.data?.message || 'Failed to save profile. Please try again.');
    } finally {
        setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map(s => s.trim()).filter(s => s.length > 0);
    setFormData(prev => ({ ...prev, skills: skillsArray }));
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600 font-medium">Loading Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl shadow-2xl shadow-purple-500/30 mb-6">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl font-black gradient-text mb-3">User Profile</h2>
          <p className="text-xl text-gray-600">Manage your account and track your achievements</p>
        </div>

        {error && (
          <div className="p-4 mb-8 text-sm text-red-700 bg-red-50 border-2 border-red-200 rounded-xl max-w-2xl mx-auto flex items-start gap-3" role="alert">
            <span className="text-red-500 text-xl">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 animate-fadeIn">
            {/* Profile Card */}
            <div className="card border-2 border-purple-100">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8 pb-6 border-b-2 border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl flex items-center justify-center text-4xl font-black text-white shadow-lg shadow-purple-500/30">
                    {user?.name?.[0].toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-gray-900">{user?.name}</h3>
                    <p className="text-purple-600 font-semibold text-lg">{user?.currentRole || 'Role Not Set'}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setEditing(!editing)}
                  className={`btn-outline px-5 py-3 text-sm ${editing ? '!border-red-500 !text-red-600 hover:!bg-red-50' : ''}`}
                  disabled={saving}
                >
                  {editing ? <X size={18} /> : <Edit2 size={18} />}
                  {editing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Email */}
                <DetailRow 
                  icon={<Mail size={22} className="text-purple-500" />} 
                  label="Email Address" 
                  value={formData.email} 
                  editing={false}
                  name="email" 
                  onChange={handleChange} 
                />
                
                {/* Current Role */}
                <DetailRow 
                  icon={<Briefcase size={22} className="text-violet-500" />} 
                  label="Current Role" 
                  value={formData.currentRole} 
                  editing={editing} 
                  name="currentRole" 
                  onChange={handleChange} 
                />
                
                {/* Bio */}
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-2 flex items-center gap-2">
                    <Sparkles size={18} className="text-purple-500" />
                    Bio/Summary
                  </label>
                  {editing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="input-field h-32 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-xl min-h-[8rem] whitespace-pre-wrap border-2 border-gray-100">
                      {user?.bio || 'No bio provided.'}
                    </p>
                  )}
                </div>

                {/* Skills */}
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-2">Key Skills</label>
                  {editing ? (
                    <textarea
                      name="skills"
                      value={formData.skills.join(', ')}
                      onChange={handleSkillsChange}
                      className="input-field h-24 resize-none"
                      placeholder="React, Node.js, AWS, etc. (comma separated)"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {user?.skills?.length > 0 ? user.skills.map((skill, index) => (
                        <span key={index} className="badge text-sm px-4 py-2">{skill}</span>
                      )) : (
                        <span className="text-gray-500 italic">No skills listed.</span>
                      )}
                    </div>
                  )}
                </div>

                {editing && (
                  <button 
                    onClick={handleSave} 
                    className="btn-primary w-full py-4 mt-6"
                    disabled={saving}
                  >
                    {saving ? (
                      <><Loader2 className="animate-spin" size={22} /> Saving Changes...</>
                    ) : (
                      <><Save size={22} /> Save Changes</>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Stats Card */}
            <div className="card border-2 border-purple-100">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 pb-4 border-b-2 border-gray-100">
                <TrendingUp size={24} className="text-purple-600" />
                Learning Statistics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <StatItem 
                  icon={<Calendar size={32} className="text-purple-600" />} 
                  value={stats.completedRoadmaps} 
                  label="Roadmaps Completed" 
                  color="from-purple-500 to-violet-600"
                />
                <StatItem 
                  icon={<Target size={32} className="text-violet-600" />} 
                  value={stats.skillsLearned} 
                  label="Skills Mastered" 
                  color="from-violet-500 to-purple-600"
                />
                <StatItem 
                  icon={<Award size={32} className="text-purple-700" />} 
                  value={`${stats.totalProgress}%`} 
                  label="Overall Progress" 
                  color="from-purple-600 to-pink-600"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 animate-fadeIn">
            {/* Badges */}
            <div className="card border-2 border-purple-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 pb-4 border-b-2 border-gray-100">
                <Award size={22} className="text-yellow-500" />
                Achievements
              </h3>
              <div className="space-y-4">
                <BadgeItem emoji="🚀" title="The Initiator" subtitle="Created learning roadmap" gradient="from-purple-100 to-violet-100" />
                <BadgeItem emoji="📚" title="Knowledge Seeker" subtitle="Completed 10 tasks" gradient="from-blue-100 to-cyan-100" />
                <BadgeItem emoji="🎯" title="50% Milestone" subtitle="Reached 50% completion" gradient="from-green-100 to-emerald-100" />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card border-2 border-purple-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 pb-4 border-b-2 border-gray-100">
                <Settings size={22} className="text-gray-600" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/analyzer')}
                  className="btn-outline w-full justify-start py-3"
                >
                  <Target size={20} />
                  New Skill Analysis
                </button>
                <button
                  onClick={() => navigate('/roadmaps')}
                  className="btn-outline w-full justify-start py-3"
                >
                  <Calendar size={20} />
                  My Roadmaps
                </button>
                <button
                  onClick={handleLogout}
                  className="btn-outline w-full justify-start py-3 mt-6 !border-red-500 !text-red-600 hover:!bg-red-50"
                >
                  <LogOut size={20} />
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const DetailRow = ({ icon, label, value, editing, name, onChange }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 w-10 mt-1">{icon}</div>
    <div className="flex-1">
      <div className="text-sm font-bold text-gray-700 mb-1">{label}</div>
      {editing && name !== 'email' ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="input-field p-3 text-sm"
        />
      ) : (
        <p className="text-gray-800 text-base font-medium">{value}</p>
      )}
    </div>
  </div>
);

const StatItem = ({ icon, value, label, color }) => (
    <div className={`p-6 bg-gradient-to-br ${color} rounded-2xl border-2 border-white shadow-lg hover:shadow-xl transition-all`}>
        <div className="mx-auto w-fit mb-3">{icon}</div>
        <div className="text-4xl font-black text-white text-center mb-1">{value}</div>
        <div className="text-sm text-white/90 text-center font-semibold">{label}</div>
    </div>
);

const BadgeItem = ({ emoji, title, subtitle, gradient }) => (
    <div className={`flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 bg-gradient-to-r ${gradient} hover:scale-105 transition-all cursor-pointer shadow-sm hover:shadow-md`}>
        <div className="text-3xl">{emoji}</div>
        <div>
            <div className="font-bold text-base text-gray-800">{title}</div>
            <div className="text-xs text-gray-600">{subtitle}</div>
        </div>
    </div>
);

export default Profile;