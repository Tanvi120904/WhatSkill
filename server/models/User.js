// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  currentRole: {
    type: String,
    required: [true, 'Current role is required'],
    trim: true
  },
  bio: {
    type: String,
    default: '',
    maxlength: 500
  },
  skills: [{
    type: String
  }],
  analyses: [{
    jobDescription: String,
    userSkills: String,
    results: {
      currentSkills: [String],
      missingSkills: [String],
      partialSkills: [String]
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  roadmaps: [{
    title: String,
    targetJob: String,
    weeks: mongoose.Schema.Types.Mixed,
    progress: mongoose.Schema.Types.Mixed,
    createdAt: {
      type: Date,
      default: Date.now
    },
    completedAt: Date
  }],
  stats: {
    completedRoadmaps: {
      type: Number,
      default: 0
    },
    skillsLearned: {
      type: Number,
      default: 0
    },
    totalProgress: {
      type: Number,
      default: 0
    }
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
userSchema.index({ email: 1 });

// Virtual for user's full profile
userSchema.virtual('profileCompletion').get(function() {
  let completion = 0;
  if (this.name) completion += 20;
  if (this.email) completion += 20;
  if (this.currentRole) completion += 20;
  if (this.bio) completion += 20;
  if (this.skills && this.skills.length > 0) completion += 20;
  return completion;
});

// Method to get user's recent activity
userSchema.methods.getRecentActivity = function() {
  const recentAnalyses = this.analyses
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);
  
  const recentRoadmaps = this.roadmaps
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);
  
  return {
    analyses: recentAnalyses,
    roadmaps: recentRoadmaps
  };
};

// Method to calculate overall progress
userSchema.methods.calculateProgress = async function() {
  let totalTasks = 0;
  let completedTasks = 0;

  this.roadmaps.forEach(roadmap => {
    if (roadmap.progress) {
      const progressKeys = Object.keys(roadmap.progress);
      totalTasks += progressKeys.length;
      completedTasks += progressKeys.filter(key => roadmap.progress[key]).length;
    }
  });

  const progressPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  this.stats.totalProgress = progressPercentage;
  await this.save();

  return progressPercentage;
};

const User = mongoose.model('User', userSchema);

module.exports = User;