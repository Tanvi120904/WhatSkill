// routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate latest stats
    await user.calculateProgress();

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        currentRole: user.currentRole,
        bio: user.bio,
        skills: user.skills,
        createdAt: user.createdAt,
        profileCompletion: user.profileCompletion
      },
      stats: user.stats,
      recentActivity: user.getRecentActivity()
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, currentRole, bio, skills } = req.body;

    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    if (name) user.name = name;
    if (currentRole) user.currentRole = currentRole;
    if (bio !== undefined) user.bio = bio;
    if (skills) user.skills = skills;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        currentRole: user.currentRole,
        bio: user.bio,
        skills: user.skills
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/user/analysis
// @desc    Save skill gap analysis
// @access  Private
router.post('/analysis', auth, async (req, res) => {
  try {
    const { jobDescription, userSkills, results } = req.body;

    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.analyses.push({
      jobDescription,
      userSkills,
      results,
      createdAt: new Date()
    });

    await user.save();

    res.json({
      message: 'Analysis saved successfully',
      analysisId: user.analyses[user.analyses.length - 1]._id
    });
  } catch (error) {
    console.error('Analysis save error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/user/roadmap
// @desc    Save learning roadmap
// @access  Private
router.post('/roadmap', auth, async (req, res) => {
  try {
    const { title, targetJob, weeks } = req.body;

    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.roadmaps.push({
      title,
      targetJob,
      weeks,
      progress: {},
      createdAt: new Date()
    });

    await user.save();

    res.json({
      message: 'Roadmap saved successfully',
      roadmapId: user.roadmaps[user.roadmaps.length - 1]._id
    });
  } catch (error) {
    console.error('Roadmap save error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/user/roadmap/:roadmapId/progress
// @desc    Update roadmap progress
// @access  Private
router.put('/roadmap/:roadmapId/progress', auth, async (req, res) => {
  try {
    const { progress } = req.body;
    const { roadmapId } = req.params;

    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const roadmap = user.roadmaps.id(roadmapId);
    
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    roadmap.progress = progress;

    // Check if roadmap is completed
    const totalTasks = Object.keys(progress).length;
    const completedTasks = Object.values(progress).filter(Boolean).length;
    
    if (completedTasks === totalTasks && totalTasks > 0) {
      roadmap.completedAt = new Date();
      user.stats.completedRoadmaps += 1;
    }

    await user.save();
    await user.calculateProgress();

    res.json({
      message: 'Progress updated successfully',
      progress: roadmap.progress
    });
  } catch (error) {
    console.error('Progress update error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/user/roadmaps
// @desc    Get all user roadmaps
// @access  Private
router.get('/roadmaps', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('roadmaps');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      roadmaps: user.roadmaps.sort((a, b) => b.createdAt - a.createdAt)
    });
  } catch (error) {
    console.error('Roadmaps fetch error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/user/analyses
// @desc    Get all user analyses
// @access  Private
router.get('/analyses', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('analyses');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      analyses: user.analyses.sort((a, b) => b.createdAt - a.createdAt)
    });
  } catch (error) {
    console.error('Analyses fetch error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;