import React, { useState } from 'react';
import { BarChart3, Code, Database, Cloud, Brain, Users, Target } from 'lucide-react';

const QuizzesPage = () => {
  const quizCategories = [
    {
      id: 1,
      name: "Frontend Development",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      quizzes: 12,
      topics: ["React", "JavaScript", "CSS", "HTML"]
    },
    {
      id: 2,
      name: "Backend Development",
      icon: Database,
      color: "from-purple-500 to-violet-500",
      quizzes: 10,
      topics: ["Node.js", "Express", "APIs", "Authentication"]
    },
    {
      id: 3,
      name: "Database",
      icon: Database,
      color: "from-green-500 to-emerald-500",
      quizzes: 8,
      topics: ["MongoDB", "SQL", "PostgreSQL", "Redis"]
    },
    {
      id: 4,
      name: "Cloud & DevOps",
      icon: Cloud,
      color: "from-orange-500 to-red-500",
      quizzes: 9,
      topics: ["AWS", "Docker", "CI/CD", "Kubernetes"]
    },
    {
      id: 5,
      name: "ML & AI",
      icon: Brain,
      color: "from-pink-500 to-purple-500",
      quizzes: 7,
      topics: ["Python", "TensorFlow", "Neural Networks", "NLP"]
    },
    {
      id: 6,
      name: "Soft Skills",
      icon: Users,
      color: "from-violet-500 to-purple-500",
      quizzes: 6,
      topics: ["Communication", "Leadership", "Problem Solving"]
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl shadow-2xl shadow-purple-500/30 mb-6 animate-float">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-black gradient-text mb-4">Diagnostic Quizzes</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your knowledge and identify areas for improvement
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {quizCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="card border-2 border-purple-100 hover:border-purple-300 hover:shadow-2xl transition-all cursor-pointer group"
              >
                {/* Icon & Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.quizzes} quizzes available</p>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {category.topics.map((topic, idx) => (
                      <span key={idx} className="badge text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button className="btn-outline w-full justify-center py-3 mt-2">
                  <Target size={18} />
                  Start Quiz
                </button>
              </div>
            );
          })}
        </div>

        {/* Recent Results */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Recent Quiz Results</h2>
          <div className="card border-2 border-purple-100">
            <div className="text-center py-12 text-gray-500">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No quiz results yet. Take your first quiz to see results here!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizzesPage;