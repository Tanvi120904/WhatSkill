import React from 'react';
import { Trophy, Target, TrendingUp, CheckCircle, Clock } from 'lucide-react';
// import "../styles/ProgressTracker.css"; // Removed custom CSS import

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

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl border-4 border-white">
      <div className="text-center mb-8">
        <Trophy className="w-12 h-12 text-purple-600 mx-auto mb-2" />
        <h3 className="text-3xl font-bold text-gray-900">Learning Progress Tracker</h3>
        <p className="text-gray-600">Overview of your 30-day roadmap</p>
      </div>

      {/* Overall Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <TrendingUp size={20} className="text-indigo-600" />
            Overall Completion
          </div>
          <span className="text-xl font-bold text-indigo-700">{completionPercentage}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 relative">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-semibold text-white">
            <span>{completedTasks} / {totalTasks} Tasks</span>
            {completionPercentage > 50 && <span>{completionPercentage}%</span>}
          </div>
        </div>
      </div>

      {/* Week-by-Week Breakdown */}
      <div className="mb-8">
        <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2 border-gray-200">
            <Clock size={20} className="text-purple-600" /> Weekly Progress
        </h4>
        <div className="space-y-4">
          {weekProgress.map((week) => (
            <div key={week.week} className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-gray-700">Week {week.week}</span>
                <span className="font-bold text-sm text-purple-700">{week.percentage}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${week.percentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {week.completed} of {week.total} tasks completed
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Message / Completion */}
      {completionPercentage < 100 ? (
        <div className="mt-6 text-center p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <p className="text-gray-700 font-medium text-lg">
            {completionPercentage === 0 && "Start your learning journey today! 🚀"}
            {completionPercentage > 0 && completionPercentage < 25 && "Great start! Keep the momentum going! 💪"}
            {completionPercentage >= 25 && completionPercentage < 50 && "You're making excellent progress! 🌟"}
            {completionPercentage >= 50 && completionPercentage < 75 && "Halfway there! You're doing amazing! 🎯"}
            {completionPercentage >= 75 && completionPercentage < 100 && "Almost there! Finish strong! 🏆"}
          </p>
        </div>
      ) : (
        <div className="mt-6 text-center p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-400 shadow-inner">
          <div className="text-5xl mb-3">🎉 🏆 🎊</div>
          <p className="text-2xl font-bold text-green-800 mb-1">
            Roadmap Completed!
          </p>
          <p className="text-green-700">
            You've successfully mastered your target skills. Time to achieve that dream job!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;