const quizResultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  
  answers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    selectedAnswer: Number,
    isCorrect: Boolean,
    skillTag: String
  }],
  
  score: { type: Number, required: true },
  percentage: { type: Number, required: true },
  passed: { type: Boolean, default: false },
  
  // Detailed Analysis
  weaknesses: [{
    skill: String,
    questionsAttempted: Number,
    questionsCorrect: Number,
    accuracyPercentage: Number
  }],
  
  strengths: [String],
  recommendations: [String],
  
  timeSpent: Number, // in seconds
  completedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('QuizResult', quizResultSchema);

// ============================================
// 6. MODELS - models/Progress.js
// ============================================
const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roadmap: { type: mongoose.Schema.Types.ObjectId, ref: 'Roadmap', required: true },
  
  weeklyProgress: {
    week1: {
      tasksCompleted: [String],
      tasksTotal: Number,
      percentageComplete: Number,
      quizScore: Number
    },
    week2: { /* same */ },
    week3: { /* same */ },
    week4: { /* same */ }
  },
  
  overallProgress: { type: Number, default: 0 },
  
  skillsAcquired: [{
    skill: String,
    proficiencyLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced']
    },
    acquiredAt: Date
  }],
  
  studyStreak: { type: Number, default: 0 },
  lastStudyDate: Date,
  
  milestones: [{
    name: String,
    description: String,
    achievedAt: Date
  }]
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);