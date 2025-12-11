import React from 'react';
import { CheckCircle2, Circle, TrendingUp, Rocket, Award, AlertCircle } from 'lucide-react';

const ResultsDashboard = ({ analysis, onGenerateRoadmap, loading }) => {
  const { currentSkills, missingSkills, partialSkills } = analysis;

  const totalSkills = currentSkills.length + missingSkills.length + partialSkills.length;
  const matchPercentage = totalSkills > 0 ? Math.round((currentSkills.length / totalSkills) * 100) : 0;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl shadow-2xl shadow-purple-500/30 mb-6 animate-float">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl font-black gradient-text mb-4">Your Skill Gap Analysis</h2>
          <p className="text-xl text-gray-600">Here's how you match up with the job requirements</p>
        </div>

        {/* Match Score Card */}
        <div className="card bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 text-white border-none mb-12 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative text-center py-8">
            <h3 className="text-xl opacity-90 mb-4 font-semibold">Skill Match Score</h3>
            <div className="text-8xl font-black mb-4">{matchPercentage}%</div>
            <p className="text-lg opacity-90">
              You have <span className="font-bold">{currentSkills.length}</span> out of <span className="font-bold">{totalSkills}</span> required skills
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto mt-8">
              <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${matchPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Skills You Have */}
          <div className="card border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-green-200">
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-800">Skills You Have</h3>
                <p className="text-sm text-green-700 font-semibold">{currentSkills.length} skills ✅</p>
              </div>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {currentSkills.length > 0 ? (
                currentSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="bg-white px-4 py-3 rounded-xl shadow-sm border-2 border-green-100 flex items-center gap-3 hover:shadow-md transition-all"
                  >
                    <span className="text-green-600 text-xl font-bold">✓</span>
                    <span className="text-gray-800 font-medium">{skill}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Circle className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No matching skills found</p>
                </div>
              )}
            </div>
          </div>

          {/* Skills to Learn */}
          <div className="card border-2 border-red-200 bg-gradient-to-br from-red-50 to-white">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-red-200">
              <div className="p-3 bg-red-100 rounded-xl">
                <Circle className="w-7 h-7 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-800">Skills to Learn</h3>
                <p className="text-sm text-red-700 font-semibold">{missingSkills.length} skills needed ✗</p>
              </div>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {missingSkills.length > 0 ? (
                missingSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="bg-white px-4 py-3 rounded-xl shadow-sm border-2 border-red-100 flex items-center gap-3 hover:shadow-md transition-all"
                  >
                    <span className="text-red-600 text-xl font-bold">✗</span>
                    <span className="text-gray-800 font-medium">{skill}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Great! No missing skills</p>
                </div>
              )}
            </div>
          </div>

          {/* Partial Skills */}
          <div className="card border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-amber-200">
              <div className="p-3 bg-amber-100 rounded-xl">
                <TrendingUp className="w-7 h-7 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-800">Need Improvement</h3>
                <p className="text-sm text-amber-700 font-semibold">{partialSkills.length} skills ⚠️</p>
              </div>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {partialSkills.length > 0 ? (
                partialSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="bg-white px-4 py-3 rounded-xl shadow-sm border-2 border-amber-100 flex items-center gap-3 hover:shadow-md transition-all"
                  >
                    <span className="text-amber-600 text-xl font-bold">!</span>
                    <span className="text-gray-800 font-medium">{skill}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No skills need improvement</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        {(missingSkills.length > 0 || partialSkills.length > 0) && (
          <div className="text-center card border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Bridge the Gap?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Get a personalized 30-day learning roadmap with free, high-quality resources to master the skills you need.
            </p>
            <button
              onClick={onGenerateRoadmap}
              disabled={loading}
              className="btn-primary px-12 py-5 text-xl group inline-flex"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Generating Your Roadmap...
                </>
              ) : (
                <>
                  Generate 30-Day Learning Roadmap
                  <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Perfect Match */}
        {missingSkills.length === 0 && partialSkills.length === 0 && (
          <div className="card border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 text-center">
            <div className="text-6xl mb-6">🎉🎊✨</div>
            <h3 className="text-4xl font-black gradient-text mb-4">
              Congratulations!
            </h3>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              You have all the skills required for this job. You're ready to apply with confidence!
            </p>
            <div className="mt-8">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 rounded-full border-2 border-green-300">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">100% Match</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDashboard;