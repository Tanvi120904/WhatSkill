import React from 'react';
import { Target, TrendingUp, Award, Sparkles } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: Target,
      title: "AI-Powered Analysis",
      description: "Get precise skill gap identification powered by advanced Claude AI technology.",
      gradient: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200"
    },
    {
      icon: TrendingUp,
      title: "30-Day Roadmap",
      description: "Structured learning plan with curated, free, high-quality resources tailored to you.",
      gradient: "from-violet-500 to-purple-600",
      bgColor: "bg-violet-50",
      iconColor: "text-violet-600",
      borderColor: "border-violet-200"
    },
    {
      icon: Award,
      title: "Track Progress",
      description: "Monitor your growth, earn badges, and stay motivated throughout your journey.",
      gradient: "from-purple-600 to-pink-600",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      borderColor: "border-pink-200"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-semibold text-purple-700">Features</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Everything You Need</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Powerful tools to accelerate your learning journey
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className={`group relative card border-2 ${feature.borderColor} hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer`}
            >
              {/* Gradient Glow Effect on Hover */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur transition duration-300`}></div>
              
              {/* Content */}
              <div className="relative text-center">
                {/* Icon Container */}
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-2xl mb-5 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="font-bold text-2xl mb-3 text-gray-900 group-hover:text-purple-700 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Bottom Bar */}
                <div className={`mt-6 h-1 w-16 mx-auto bg-gradient-to-r ${feature.gradient} rounded-full group-hover:w-24 transition-all duration-300`}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <p className="text-gray-500 text-sm">
          Join thousands of learners already bridging their skill gaps
        </p>
      </div>
    </section>
  );
};

export default FeatureSection;