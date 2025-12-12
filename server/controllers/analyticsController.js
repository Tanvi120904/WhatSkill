const Analysis = require('../models/Analysis');
const Roadmap = require('../models/Roadmap');

// @desc    Get user dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private
const getDashboardAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch latest analysis and roadmap
    const recentAnalysis = await Analysis.findOne({ user: userId })
      .sort({ createdAt: -1 });
    
    const activeRoadmap = await Roadmap.findOne({ user: userId })
      .sort({ createdAt: -1 });

    // Calculate generic stats
    const totalAnalyses = await Analysis.countDocuments({ user: userId });
    
    let progressStats = {
      completedTasks: 0,
      totalTasks: 0,
      percentage: 0
    };

    if (activeRoadmap) {
      // Calculate progress from the active roadmap
      const completed = Object.values(activeRoadmap.progress || {}).filter(Boolean).length;
      
      // Calculate total tasks (assuming 7 days * 4 weeks = 28 tasks roughly, or count from data)
      // Since roadmap structure is dynamic, we estimate or count if structure is available
      let total = 0;
      if (activeRoadmap.roadmap) {
         Object.values(activeRoadmap.roadmap).forEach(week => {
             total += week.dailyTasks ? week.dailyTasks.length : 0;
         });
      }
      
      progressStats = {
        completedTasks: completed,
        totalTasks: total,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0
      };
    }

    res.status(200).json({
      recentAnalysis,
      activeRoadmap,
      stats: {
        totalAnalyses,
        currentProgress: progressStats
      }
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Server error fetching analytics' });
  }
};

// @desc    Get analysis history
// @route   GET /api/analytics/history
// @access  Private
const getAnalysisHistory = async (req, res) => {
  try {
    const history = await Analysis.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10); // Return last 10
      
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardAnalytics,
  getAnalysisHistory
};