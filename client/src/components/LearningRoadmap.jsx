import React from 'react';
import { ExternalLink, Youtube, BookOpen, Code, FileText } from 'lucide-react';
import ProgressTracker from './ProgressTracker';

const LearningRoadmap = ({ roadmap, progress, onToggleProgress }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Your 30-Day Learning Roadmap</h2>
        <p className="text-gray-600">
          Follow this structured plan to master your target skills
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {Object.entries(roadmap).map(([week, data], idx) => (
          <div key={week} className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Week Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Week {idx + 1}</h3>
                  <p className="text-lg opacity-90">Focus: {data.focus}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold opacity-75">
                    {idx + 1}/4
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Weekly Goals */}
              <div>
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  🎯 Weekly Goals
                </h4>
                <ul className="space-y-2">
                  {data.goals.map((goal, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-indigo-600 font-bold flex-shrink-0">
                        {i + 1}.
                      </span>
                      <span className="text-gray-700">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Daily Tasks */}
              <div>
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  📅 Daily Learning Tasks
                </h4>
                <div className="space-y-2">
                  {data.dailyTasks.map((task, i) => {
                    const taskKey = `${week}-task-${i}`;
                    const isCompleted = progress[taskKey] || false;

                    return (
                      <button
                        key={i}
                        onClick={() => onToggleProgress(taskKey)}
                        className={`w-full text-left px-4 py-3 rounded-lg border-2 transition flex items-start gap-3 hover:shadow-md ${
                          isCompleted
                            ? 'bg-green-50 border-green-300'
                            : 'bg-gray-50 border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {isCompleted ? (
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-400 rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-gray-500">
                              Day {i + 1}
                            </span>
                          </div>
                          <span
                            className={`${
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
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    🎓 Free Learning Resources
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <a
                      href={data.resources.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg hover:shadow-md transition group"
                    >
                      <Youtube className="w-6 h-6 text-red-600 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-800">
                          YouTube Tutorials
                        </div>
                        <div className="text-xs text-gray-600">
                          Video learning & walkthroughs
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                    </a>

                    <a
                      href={data.resources.coursera}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:shadow-md transition group"
                    >
                      <BookOpen className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-800">
                          Coursera
                        </div>
                        <div className="text-xs text-gray-600">
                          Structured online courses
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                    </a>

                    <a
                      href={data.resources.practice}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:shadow-md transition group"
                    >
                      <Code className="w-6 h-6 text-green-600 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-800">
                          Practice Exercises
                        </div>
                        <div className="text-xs text-gray-600">
                          Hands-on coding challenges
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                    </a>

                    <a
                      href={data.resources.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg hover:shadow-md transition group"
                    >
                      <FileText className="w-6 h-6 text-purple-600 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-800">
                          Documentation
                        </div>
                        <div className="text-xs text-gray-600">
                          Official docs & guides
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Summary */}
      <ProgressTracker progress={progress} roadmap={roadmap} />
    </div>
  );
};

export default LearningRoadmap;