const quizSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['frontend', 'backend', 'database', 'devops', 'ml-ai', 'aptitude', 'soft-skills']
  },
  subcategory: String, // e.g., 'react', 'node.js', 'mongodb'
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  
  title: { type: String, required: true },
  description: String,
  
  questions: [{
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true }, // index of correct option
    explanation: String,
    skillTag: String, // specific skill this question tests
    difficulty: String,
    points: { type: Number, default: 1 }
  }],
  
  totalPoints: Number,
  timeLimit: Number, // in minutes
  passingScore: { type: Number, default: 60 }, // percentage
  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
