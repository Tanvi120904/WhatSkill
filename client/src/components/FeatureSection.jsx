import React from 'react';
import { Target, TrendingUp, Award } from 'lucide-react';

const FeatureSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {/* AI Analysis */}
        <div className="card text-center hover:scale-[1.02] transition duration-300">
          <Target className="w-12 h-12 text-indigo-600 mb-3 mx-auto p-2 bg-indigo-50 rounded-full" />
          <h3 className="font-bold text-xl mb-2 text-gray-900">AI Analysis</h3>
          <p className="text-gray-600">
            Get precise skill gap identification powered by Claude AI.
          </p>
        </div>

        {/* 30-Day Roadmap */}
        <div className="card text-center hover:scale-[1.02] transition duration-300">
          <TrendingUp className="w-12 h-12 text-purple-600 mb-3 mx-auto p-2 bg-purple-50 rounded-full" />
          <h3 className="font-bold text-xl mb-2 text-gray-900">30-Day Roadmap</h3>
          <p className="text-gray-600">
            Structured learning plan with curated, free, high-quality resources.
          </p>
        </div>

        {/* Track Progress */}
        <div className="card text-center hover:scale-[1.02] transition duration-300">
          <Award className="w-12 h-12 text-pink-600 mb-3 mx-auto p-2 bg-pink-50 rounded-full" />
          <h3 className="font-bold text-xl mb-2 text-gray-900">Track Progress</h3>
          <p className="text-gray-600">
            Monitor your growth, earn badges, and stay motivated on your journey.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;