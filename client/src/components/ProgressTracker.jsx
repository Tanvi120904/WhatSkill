import React from 'react';
import { Trophy, Target, TrendingUp, CheckCircle, Clock, Zap } from 'lucide-react';

const ProgressTracker = ({ progress, roadmap }) => {
  // Calculate total tasks
  const totalTasks = Object.keys(roadmap).reduce((total, week) => {
    return total + (roadmap[week].dailyTasks?.length || 0);
  }, 0);

  // Calculate completed tasks
  const completedTasks = Object.values(progress).filter(Boolean).length;

  // Calculate percentage
  const completionPercentage = totalTasks > 0
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  // Calculate per week progress
  const weekProgress = Object.keys(roadmap).map((week, idx) => {
    const weekTasks = roadmap[week].dailyTasks?.length || 0;
    const weekCompleted = Object.keys(progress).filter(
      key => key.startsWith(week) && progress[key]
    ).length;
    return {
      week: idx + 1,
      completed: weekCompleted,
      total: weekTasks,
      percentage: weekTasks > 0 ? Math.round((weekCompleted / weekTasks) * 100) : 0
    };
  });

  // Get motivational message
  const getMotivationalMessage = () => {
    if (completionPercentage === 0) return { emoji: "🚀", text: "Start your learning journey today!", color: "purple" };
    if (completionPercentage < 25) return { emoji: "💪", text: "Great start! Keep the momentum going!", color: "blue" };
    if (completionPercentage < 50) return { emoji: "🌟", text: "You're making excellent progress!", color: "violet" };
    if (completionPercentage < 75) return { emoji: "🎯", text: "Halfway there! You're doing amazing!", color: "purple" };
    if (completionPercentage < 100) return { emoji: "🏆", text: "Almost there! Finish strong!", color: "pink" };
    return null;
  };

  const motivation = getMotivationalMessage();

  return (
    <div className="card border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-violet-50 to-pink-50 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl shadow-lg shadow-purple-500/30 mb-4">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-4xl font-black gradient-text mb-2">Learning Progress Tracker</h3>
        <p className="text-gray-600 text-lg">Overview of your 30-day roadmap</p>
      </div>

      {/* Overall Progress */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-xl">
              <TrendingUp size={24} className="text-purple-600" />
            </div>
            Overall Completion
          </div>
          <span className="text-3xl font-black gradient-text">{completionPercentage}%</span>
        </div>

        {/* Main Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-6 shadow-inner overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 h-6 rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden"
              style={{ width: `${completionPercentage}%` }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 px-1">
            <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              {completedTasks} / {totalTasks} Tasks
            </span>
            {completionPercentage > 0 && (
              <span className="text-sm font-bold text-purple-700 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                {completionPercentage}% Complete
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Week-by-Week Breakdown */}
      <div className="mb-10">
        <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3 pb-3 border-b-2 border-purple-200">
          <div className="p-2 bg-violet-100 rounded-xl">
            <Clock size={22} className="text-violet-600" />
          </div>
          Weekly Progress
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {weekProgress.map((week) => {
            const weekColors = [
              { gradient: 'from-purple-500 to-violet-600', bg: 'bg-purple-50', border: 'border-purple-200' },
              { gradient: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', border: 'border-violet-200' },
              { gradient: 'from-purple-600 to-pink-600', bg: 'bg-pink-50', border: 'border-pink-200' },
              { gradient: 'from-violet-600 to-purple-700', bg: 'bg-purple-50', border: 'border-purple-300' }
            ];
            const color = weekColors[week.week - 1];

            return (
              <div key={week.week} className={`p-5 ${color.bg} rounded-2xl border-2 ${color.border} hover:shadow-lg transition-all`}>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-black text-gray-800 text-lg">Week {week.week}</span>
                  <span className="font-black text-sm text-purple-700 bg-white px-3 py-1 rounded-full">
                    {week.percentage}%
                  </span>
                </div>
                <div className="w-full bg-white rounded-full h-3 shadow-inner overflow-hidden mb-3">
                  <div
                    className={`bg-gradient-to-r ${color.gradient} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${week.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 font-semibold flex items-center justify-between">
                  <span>{week.completed} of {week.total}</span>
                  <span className="text-gray-500">tasks</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational Message / Completion */}
      {completionPercentage < 100 ? (
        <div className={`p-6 bg-gradient-to-r from-${motivation.color}-100 to-${motivation.color}-50 rounded-2xl border-2 border-${motivation.color}-200 text-center`}>
          <div className="text-5xl mb-3">{motivation.emoji}</div>
          <p className="text-xl font-bold text-gray-800">
            {motivation.text}
          </p>
        </div>
      ) : (
        <div className="p-8 bg-gradient-to-br from-green-100 via-emerald-100 to-green-50 rounded-2xl border-2 border-green-300 text-center shadow-xl">
          <div className="text-6xl mb-4">🎉 🏆 🎊</div>
          <p className="text-3xl font-black text-green-800 mb-3">
            Roadmap Completed!
          </p>
          <p className="text-lg text-green-700 font-medium">
            You've successfully mastered your target skills. Time to achieve that dream job!
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="badge !bg-green-100 !text-green-700 !border-green-300 text-sm px-4 py-2">
              <CheckCircle className="w-4 h-4" />
              All Tasks Complete
            </div>
            <div className="badge !bg-yellow-100 !text-yellow-700 !border-yellow-300 text-sm px-4 py-2">
              <Trophy className="w-4 h-4" />
              Achievement Unlocked
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;