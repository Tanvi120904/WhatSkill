import React from 'react';
import { Award, Trophy, Star, Zap, Target as TargetIcon } from 'lucide-react';

const AchievementsPage = () => {
  const badges = [
    { name: "The Initiator", emoji: "🚀", description: "Created your first roadmap", earned: true, date: "Jan 10, 2024" },
    { name: "Knowledge Seeker", emoji: "📚", description: "Completed 10 tasks", earned: true, date: "Jan 12, 2024" },
    { name: "Quiz Master", emoji: "🎯", description: "Scored 90%+ on a quiz", earned: false },
    { name: "50% Milestone", emoji: "⭐", description: "Reached 50% overall completion", earned: false },
    { name: "Week Warrior", emoji: "🔥", description: "Completed full week of tasks", earned: true, date: "Jan 15, 2024" },
    { name: "Early Bird", emoji: "🌅", description: "Studied 7 days in a row", earned: false },
    { name: "Perfectionist", emoji: "💎", description: "100% score on 3 quizzes", earned: false },
    { name: "Road Complete", emoji: "🏆", description: "Finished entire roadmap", earned: false }
  ];

  const stats = {
    totalBadges: badges.length,
    earnedBadges: badges.filter(b => b.earned).length,
    studyStreak: 5,
    totalProgress: 45
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-3xl shadow-2xl shadow-yellow-500/30 mb-6 animate-float">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-black gradient-text mb-4">Achievements & Badges</h1>
          <p className="text-xl text-gray-600">Celebrate your learning milestones</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fadeIn">
          <div className="card text-center border-2 border-purple-100">
            <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-3xl font-black gradient-text">{stats.earnedBadges}/{stats.totalBadges}</div>
            <div className="text-sm text-gray-600">Badges Earned</div>
          </div>
          <div className="card text-center border-2 border-purple-100">
            <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-3xl font-black text-orange-600">{stats.studyStreak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
          <div className="card text-center border-2 border-purple-100">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-3xl font-black text-yellow-600">{stats.totalProgress}%</div>
            <div className="text-sm text-gray-600">Total Progress</div>
          </div>
          <div className="card text-center border-2 border-purple-100">
            <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-3xl font-black gradient-text">0</div>
            <div className="text-sm text-gray-600">Roadmaps Done</div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className={`card border-2 text-center transition-all ${
                badge.earned
                  ? 'border-purple-300 hover:shadow-2xl hover:scale-105 cursor-pointer'
                  : 'border-gray-200 opacity-50 grayscale'
              }`}
            >
              <div className="text-6xl mb-3">{badge.emoji}</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{badge.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
              {badge.earned && (
                <div className="text-xs text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full inline-block">
                  Earned {badge.date}
                </div>
              )}
              {!badge.earned && (
                <div className="text-xs text-gray-500 font-semibold">
                  Locked
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;
