import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Target, Plus, ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RoadmapsList = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const navigate = useNavigate();

  // Mock data - replace with API call
  useEffect(() => {
    const mockRoadmaps = [
      {
        id: 1,
        title: "Full Stack Development",
        targetRole: "Full Stack Developer",
        progress: 45,
        createdAt: new Date('2024-01-10'),
        totalWeeks: 4,
        completedWeeks: 2
      },
      {
        id: 2,
        title: "AWS Cloud Mastery",
        targetRole: "Cloud Engineer",
        progress: 20,
        createdAt: new Date('2024-01-15'),
        totalWeeks: 4,
        completedWeeks: 1
      }
    ];
    setRoadmaps(mockRoadmaps);
  }, []);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl shadow-2xl shadow-purple-500/30 mb-6 animate-float">
            <Calendar className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-black gradient-text mb-4">My Learning Roadmaps</h1>
          <p className="text-xl text-gray-600">Track your progress and continue your learning journey</p>
        </div>

        {/* Create New Button */}
        <div className="mb-8 animate-fadeIn">
          <button
            onClick={() => navigate('/analyzer')}
            className="btn-primary px-6 py-4 text-lg group"
          >
            <Plus size={24} />
            Create New Roadmap
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Roadmaps Grid */}
        {roadmaps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {roadmaps.map((roadmap) => (
              <div
                key={roadmap.id}
                className="card border-2 border-purple-100 hover:border-purple-300 hover:shadow-2xl transition-all cursor-pointer"
                onClick={() => navigate(`/roadmap/${roadmap.id}`)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{roadmap.title}</h3>
                    <p className="text-purple-600 font-semibold">{roadmap.targetRole}</p>
                  </div>
                  <div className="badge text-sm">
                    <Clock size={14} />
                    {roadmap.totalWeeks} Weeks
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
                    <span className="text-lg font-black gradient-text">{roadmap.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-violet-600 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${roadmap.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{roadmap.completedWeeks}</div>
                    <div className="text-xs text-gray-500">Weeks Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-violet-600">
                      {roadmap.totalWeeks - roadmap.completedWeeks}
                    </div>
                    <div className="text-xs text-gray-500">Weeks Remaining</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                  Started {roadmap.createdAt.toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-16 border-2 border-purple-100">
            <Calendar className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Roadmaps Yet</h3>
            <p className="text-gray-600 mb-6">Create your first learning roadmap to get started</p>
            <button
              onClick={() => navigate('/analyzer')}
              className="btn-primary px-6 py-3 inline-flex"
            >
              <Plus size={20} />
              Create First Roadmap
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapsList;