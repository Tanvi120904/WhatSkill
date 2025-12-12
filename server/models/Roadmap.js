const roadmapSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  analysis: { type: mongoose.Schema.Types.ObjectId, ref: 'Analysis' },
  
  title: { type: String, required: true },
  targetRole: String,
  targetSkills: [String],
  difficultyLevel: String,
  
  // 4-Week Plan
  weeks: {
    week1: {
      focus: String,
      goals: [String],
      dailyTasks: [String],
      resources: {
        youtube: [{ title: String, url: String }],
        courses: [{ platform: String, title: String, url: String }],
        practice: [{ title: String, url: String }],
        docs: [{ title: String, url: String }]
      },
      quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }
    },
    week2: { /* same structure */ },
    week3: { /* same structure */ },
    week4: { /* same structure */ }
  },
  
  // Final Project
  finalProject: {
    title: String,
    description: String,
    requirements: [String],
    technologies: [String],
    githubTemplate: String
  },
  
  // Progress Tracking
  progress: {
    type: Map,
    of: Boolean,
    default: {}
  },
  
  completedAt: Date,
  
  // Personalization
  personalizedFor: {
    learningStyle: String,
    timeCommitment: String, // hours per day
    priorExperience: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', roadmapSchema);
