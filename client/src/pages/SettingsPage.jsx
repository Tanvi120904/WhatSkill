import React, { useState } from 'react';
import { Settings, User, Bell, Shield, Palette, Save } from 'lucide-react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    learningStyle: 'visual',
    difficulty: 'intermediate',
    emailNotifications: true,
    progressUpdates: true,
    theme: 'light'
  });

  const handleSave = () => {
    // Save settings logic
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl shadow-2xl shadow-purple-500/30 mb-6">
            <Settings className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-black gradient-text mb-4">Settings</h1>
          <p className="text-xl text-gray-600">Customize your learning experience</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6 animate-fadeIn">
          {/* Learning Preferences */}
          <div className="card border-2 border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <User className="text-purple-600" />
              Learning Preferences
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Learning Style
                </label>
                <select
                  value={settings.learningStyle}
                  onChange={(e) => setSettings({...settings, learningStyle: e.target.value})}
                  className="input-field"
                >
                  <option value="visual">Visual (Videos & Diagrams)</option>
                  <option value="auditory">Auditory (Podcasts & Lectures)</option>
                  <option value="kinesthetic">Kinesthetic (Hands-on Practice)</option>
                  <option value="mixed">Mixed Approach</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={settings.difficulty}
                  onChange={(e) => setSettings({...settings, difficulty: e.target.value})}
                  className="input-field"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="card border-2 border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Bell className="text-purple-600" />
              Notifications
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-700 font-medium">Email Notifications</span>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                  className="w-5 h-5"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-700 font-medium">Progress Updates</span>
                <input
                  type="checkbox"
                  checked={settings.progressUpdates}
                  onChange={(e) => setSettings({...settings, progressUpdates: e.target.checked})}
                  className="w-5 h-5"
                />
              </label>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="btn-primary w-full py-4 text-lg"
          >
            <Save size={22} />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;