import React, { useState, useEffect } from 'react';
import {
  User, Mail, Briefcase, Edit2, Save, X, Target, TrendingUp, Award, Calendar, LogOut, Settings, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import "../styles/Profile.css"; // Removed custom CSS import

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
      // Optional: Log out on error
      // handleLogout(); 
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
        setUser(prev => ({...prev, ...formData})); // Update local state
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
    // Split by comma and trim whitespace
    const skillsArray = e.target.value.split(',').map(s => s.trim()).filter(s => s.length > 0);
    setFormData(prev => ({ ...prev, skills: skillsArray }));
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        <p className="ml-3 text-lg text-gray-600">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-2 text-gray-900">User Profile</h2>
        <p className="text-gray-600 text-lg">Manage your account and track your achievements</p>
      </div>

      {error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg max-w-lg mx-auto" role="alert">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (Profile Details & Stats) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Card */}
          <div className="card">
            <div className="flex justify-between items-start mb-6 border-b pb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl font-bold text-purple-600">
                  {user?.name?.[0].toUpperCase() || 'U'}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{user?.name}</h3>
                  <p className="text-indigo-600 font-medium">{user?.currentRole || 'Role Not Set'}</p>
                </div>
              </div>
              
              <button
                onClick={() => setEditing(!editing)}
                className={`btn-outline px-4 py-2 text-sm ${editing ? 'border-red-500 text-red-600 hover:bg-red-50' : ''}`}
                disabled={saving}
              >
                {editing ? <X size={18} /> : <Edit2 size={18} />}
                {editing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Name & Email */}
              <DetailRow icon={<Mail size={20} />} label="Email" value={formData.email} editing={editing} name="email" onChange={handleChange} />
              <DetailRow icon={<Briefcase size={20} />} label="Current Role" value={formData.currentRole} editing={editing} name="currentRole" onChange={handleChange} />
              
              {/* Bio */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Bio/Summary</label>
                {editing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="input-field h-24 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg min-h-[5rem] whitespace-pre-wrap">{user?.bio || 'No bio provided.'}</p>
                )}
              </div>

              {/* Skills */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Key Skills (Comma Separated)</label>
                {editing ? (
                  <textarea
                    name="skills"
                    value={formData.skills.join(', ')}
                    onChange={handleSkillsChange}
                    className="input-field h-20 resize-none"
                    placeholder="React, Node.js, AWS, etc."
                  />
                ) : (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {user?.skills?.length > 0 ? user.skills.map((skill, index) => (
                      <span key={index} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">{skill}</span>
                    )) : (
                      <span className="text-gray-500 italic">No skills listed.</span>
                    )}
                  </div>
                )}
              </div>

              {editing && (
                <button 
                  onClick={handleSave} 
                  className="btn-primary w-full py-3 mt-4"
                  disabled={saving}
                >
                  {saving ? (
                    <><Loader2 className="animate-spin" size={20} /> Saving...</>
                  ) : (
                    <><Save size={20} /> Save Changes</>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* User Stats Card */}
          <div className="card">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2">
              <TrendingUp size={20} className="text-purple-600" />
              Learning Statistics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <StatItem icon={<Calendar size={28} className="text-indigo-600" />} value={stats.completedRoadmaps} label="Roadmaps Completed" />
              <StatItem icon={<Target size={28} className="text-purple-600" />} value={stats.skillsLearned} label="Skills Mastered" />
              <StatItem icon={<Award size={28} className="text-pink-600" />} value={`${stats.totalProgress}%`} label="Overall Progress" />
            </div>
          </div>
        </div>

        {/* Sidebar (Badges & Actions) */}
        <div className="space-y-8">
          {/* Badges */}
          <div className="card">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2">
              <Award size={20} className="text-yellow-500" />
              Achievements / Badges
            </h3>
            <div className="space-y-3">
              <BadgeItem emoji="🚀" title="The Initiator" subtitle="Created learning roadmap" color="bg-indigo-50" />
              <BadgeItem emoji="📚" title="Knowledge Seeker" subtitle="Completed 10 tasks" color="bg-blue-50" />
              <BadgeItem emoji="🎯" title="50% Milestone" subtitle="Reached 50% overall completion" color="bg-green-50" />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2">
              <Settings size={20} className="text-gray-600" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/analyzer')}
                className="btn-outline w-full justify-start"
              >
                <Target size={18} />
                New Skill Analysis
              </button>
              <button
                onClick={() => navigate('/roadmaps')}
                className="btn-outline w-full justify-start"
              >
                <Calendar size={18} />
                My Roadmaps
              </button>
              <button
                onClick={handleLogout}
                className="btn-outline w-full justify-start !border-red-500 !text-red-600 hover:bg-red-50 mt-4"
              >
                <LogOut size={18} />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const DetailRow = ({ icon, label, value, editing, name, onChange }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 w-8 text-gray-400 mt-1">{icon}</div>
    <div className="flex-1">
      <div className="text-sm font-semibold text-gray-700">{label}</div>
      {editing ? (
        <input
          type={name === 'email' ? 'email' : 'text'}
          name={name}
          value={value}
          onChange={onChange}
          className="input-field p-2 text-sm mt-1"
          disabled={name === 'email'} // Email usually non-editable
        />
      ) : (
        <p className="text-gray-800">{value}</p>
      )}
    </div>
  </div>
);

const StatItem = ({ icon, value, label }) => (
    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
        <div className="mx-auto w-fit mb-2">{icon}</div>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
    </div>
);

const BadgeItem = ({ emoji, title, subtitle, color }) => (
    <div className={`flex items-center gap-3 p-3 rounded-lg border border-gray-100 shadow-sm ${color}`}>
        <div className="text-2xl">{emoji}</div>
        <div>
            <div className="font-semibold text-sm">{title}</div>
            <div className="text-xs text-gray-600">{subtitle}</div>
        </div>
    </div>
);

export default Profile;