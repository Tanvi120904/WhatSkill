import React from 'react';
import { ExternalLink, Youtube, BookOpen, Code, FileText, Sparkles, Calendar } from 'lucide-react';
import ProgressTracker from './ProgressTracker';

const LearningRoadmap = ({ roadmap, progress, onToggleProgress }) => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl shadow-2xl shadow-purple-500/30 mb-6 animate-float">
            <Calendar className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl font-black gradient-text mb-4">Your 30-Day Learning Roadmap</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Follow this structured plan to master your target skills
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="badge">
              <Sparkles className="w-3 h-3" />
              AI-Generated
            </div>
            <div className="badge">
              Free Resources
            </div>
          </div>
        </div>

        {/* Week Cards */}
        <div className="space-y-8 mb-12 animate-fadeIn">
          {Object.entries(roadmap).map(([week, data], idx) => {
            const weekColors = [
              { gradient: 'from-purple-600 to-violet-600', light: 'bg-purple-50', border: 'border-purple-200' },
              { gradient: 'from-violet-600 to-purple-600', light: 'bg-violet-50', border: 'border-violet-200' },
              { gradient: 'from-purple-700 to-pink-600', light: 'bg-pink-50', border: 'border-pink-200' },
              { gradient: 'from-violet-700 to-purple-700', light: 'bg-purple-50', border: 'border-purple-200' }
            ];
            const color = weekColors[idx % weekColors.length];

            return (
              <div key={week} className={`card border-2 ${color.border} overflow-hidden hover:shadow-2xl transition-all`}>
                {/* Week Header */}
                <div className={`bg-gradient-to-r ${color.gradient} text-white p-8 -m-8 mb-8`}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center font-black text-2xl">
                          {idx + 1}
                        </div>
                        <h3 className="text-3xl font-black">Week {idx + 1}</h3>
                      </div>
                      <p className="text-xl opacity-95 font-medium">Focus: {data.focus}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-black opacity-75">
                        {idx + 1}/4
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Weekly Goals */}
                  <div>
                    <h4 className="font-black text-xl mb-4 flex items-center gap-3">
                      <span className="text-3xl">🎯</span>
                      Weekly Goals
                    </h4>
                    <ul className="space-y-3">
                      {data.goals.map((goal, i) => (
                        <li key={i} className={`flex items-start gap-4 p-4 ${color.light} rounded-2xl border-2 ${color.border} hover:shadow-md transition-all`}>
                          <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-xl flex items-center justify-center font-bold shadow-md">
                            {i + 1}
                          </span>
                          <span className="text-gray-800 font-medium leading-relaxed">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Daily Tasks */}
                  <div>
                    <h4 className="font-black text-xl mb-4 flex items-center gap-3">
                      <span className="text-3xl">📅</span>
                      Daily Learning Tasks
                    </h4>
                    <div className="space-y-3">
                      {data.dailyTasks.map((task, i) => {
                        const taskKey = `${week}-task-${i}`;
                        const isCompleted = progress[taskKey] || false;

                        return (
                          <button
                            key={i}
                            onClick={() => onToggleProgress(taskKey)}
                            className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all flex items-start gap-4 group hover:scale-[1.02] ${
                              isCompleted
                                ? 'bg-green-50 border-green-300 hover:bg-green-100'
                                : 'bg-white border-gray-200 hover:border-purple-400 hover:shadow-lg'
                            }`}
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              {isCompleted ? (
                                <div className="w-7 h-7 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
                                  <span className="text-white text-sm font-bold">✓</span>
                                </div>
                              ) : (
                                <div className="w-7 h-7 border-3 border-gray-300 rounded-xl group-hover:border-purple-500 transition-colors" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                                  Day {i + 1}
                                </span>
                              </div>
                              <span
                                className={`text-base font-medium ${
                                  isCompleted
                                    ? 'line-through text-gray-500'
                                    : 'text-gray-800'
                                }`}
                              >
                                {task}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Learning Resources */}
                  {data.resources && (
                    <div>
                      <h4 className="font-black text-xl mb-4 flex items-center gap-3">
                        <span className="text-3xl">🎓</span>
                        Free Learning Resources
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ResourceCard
                          href={data.resources.youtube}
                          icon={<Youtube className="w-7 h-7 text-red-600" />}
                          title="YouTube Tutorials"
                          description="Video learning & walkthroughs"
                          color="red"
                        />
                        <ResourceCard
                          href={data.resources.coursera}
                          icon={<BookOpen className="w-7 h-7 text-blue-600" />}
                          title="Coursera"
                          description="Structured online courses"
                          color="blue"
                        />
                        <ResourceCard
                          href={data.resources.practice}
                          icon={<Code className="w-7 h-7 text-green-600" />}
                          title="Practice Exercises"
                          description="Hands-on coding challenges"
                          color="green"
                        />
                        <ResourceCard
                          href={data.resources.docs}
                          icon={<FileText className="w-7 h-7 text-purple-600" />}
                          title="Documentation"
                          description="Official docs & guides"
                          color="purple"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <ProgressTracker progress={progress} roadmap={roadmap} />
      </div>
    </div>
  );
};

// Resource Card Component
const ResourceCard = ({ href, icon, title, description, color }) => {
  const colors = {
    red: { bg: 'bg-red-50', border: 'border-red-200', hover: 'hover:border-red-400' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', hover: 'hover:border-blue-400' },
    green: { bg: 'bg-green-50', border: 'border-green-200', hover: 'hover:border-green-400' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', hover: 'hover:border-purple-400' }
  };
  const c = colors[color];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-4 p-5 ${c.bg} border-2 ${c.border} ${c.hover} rounded-2xl hover:shadow-lg transition-all group`}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-base text-gray-800 mb-1">
          {title}
        </div>
        <div className="text-xs text-gray-600">
          {description}
        </div>
      </div>
      <ExternalLink className={`w-5 h-5 text-gray-400 group-hover:text-${color}-600 transition-colors flex-shrink-0`} />
    </a>
  );
};

export default LearningRoadmap;