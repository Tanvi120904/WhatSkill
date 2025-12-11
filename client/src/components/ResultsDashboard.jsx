import React from 'react';
import { CheckCircle2, Circle, TrendingUp, Rocket } from 'lucide-react';

const ResultsDashboard = ({ analysis, onGenerateRoadmap, loading }) => {
  const { currentSkills, missingSkills, partialSkills } = analysis;

  // Calculate total skills and match percentage safely
  const totalSkills = currentSkills.length + missingSkills.length + partialSkills.length;
  const matchPercentage = totalSkills > 0 ? Math.round((currentSkills.length / totalSkills) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Your Skill Gap Analysis</h2>
        <p className="text-gray-600">Here's how you match up with the job requirements</p>
      </div>

      {/* Match Score */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-8 mb-8 text-center shadow-lg">
        <h3 className="text-lg opacity-90 mb-2">Skill Match Score</h3>
        <div className="text-6xl font-bold mb-2">{matchPercentage}%</div>
        <p className="text-sm opacity-90">
          You have {currentSkills.length} out of {totalSkills} required skills
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Skills You Have */}
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-lg">Skills You Have</h3>
          </div>
          <div className="text-sm text-green-700 mb-3 font-medium">
            {currentSkills.length} skills ✅
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {currentSkills.length > 0 ? (
              currentSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="bg-white px-3 py-2 rounded-lg text-sm flex items-center gap-2"
                >
                  <span className="text-green-600">✓</span>
                  <span>{skill}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No matching skills found</p>
            )}
          </div>
        </div>

        {/* Skills to Learn */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Circle className="w-6 h-6 text-red-600" />
            <h3 className="font-semibold text-lg">Skills to Learn</h3>
          </div>
          <div className="text-sm text-red-700 mb-3 font-medium">
            {missingSkills.length} skills needed ❌
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {missingSkills.length > 0 ? (
              missingSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="bg-white px-3 py-2 rounded-lg text-sm flex items-center gap-2"
                >
                  <span className="text-red-600">✗</span>
                  <span>{skill}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                Great! No missing skills
              </p>
            )}
          </div>
        </div>

        {/* Partial Skills */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-yellow-600" />
            <h3 className="font-semibold text-lg">Need Improvement</h3>
          </div>
          <div className="text-sm text-yellow-700 mb-3 font-medium">
            {partialSkills.length} skills to improve ⚠️
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {partialSkills.length > 0 ? (
              partialSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="bg-white px-3 py-2 rounded-lg text-sm flex items-center gap-2"
                >
                  <span className="text-yellow-600">!</span>
                  <span>{skill}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No skills need improvement</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      {(missingSkills.length > 0 || partialSkills.length > 0) && (
        <div className="text-center">
          <button
            onClick={onGenerateRoadmap}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating Your Roadmap...
              </>
            ) : (
              <>
                Generate 30-Day Learning Roadmap
                <Rocket className="w-5 h-5" />
              </>
            )}
          </button>
          <p className="text-sm text-gray-600 mt-3">
            Get a personalized learning plan with free resources
          </p>
        </div>
      )}

      {missingSkills.length === 0 && partialSkills.length === 0 && (
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-green-800 mb-2">
            Congratulations!
          </h3>
          <p className="text-green-700">
            You have all the skills required for this job. You're ready to apply!
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultsDashboard;