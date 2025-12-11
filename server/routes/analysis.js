// routes/analysis.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const geminiService = require('../services/geminiService');
const User = require('../models/User');

// @route   POST /api/analysis/skills
// @desc    Analyze skill gaps using Gemini AI
// @access  Private
router.post('/skills', auth, async (req, res) => {
  try {
    const { jobDescription, userSkills } = req.body;

    if (!jobDescription || !userSkills) {
      return res.status(400).json({
        message: 'Job description and user skills are required'
      });
    }

    // Call Gemini API for analysis
    const analysis = await geminiService.analyzeSkills(
      jobDescription,
      userSkills
    );

    // Save analysis to user's profile
    const user = await User.findById(req.user.id);
    if (user) {
      user.analyses.push({
        jobDescription,
        userSkills,
        results: analysis,
        createdAt: new Date()
      });
      await user.save();
    }

    res.json({
      message: 'Analysis completed successfully',
      analysis
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      message: error.message || 'Failed to analyze skills',
      error: error.message
    });
  }
});

// @route   POST /api/analysis/roadmap
// @desc    Generate learning roadmap using Gemini AI
// @access  Private
router.post('/roadmap', auth, async (req, res) => {
  try {
    const { missingSkills, partialSkills, targetJob } = req.body;

    if (!missingSkills && !partialSkills) {
      return res.status(400).json({
        message: 'Missing skills or partial skills are required'
      });
    }

    // Call Gemini API for roadmap generation
    const roadmap = await geminiService.generateRoadmap(
      missingSkills || [],
      partialSkills || []
    );

    // Save roadmap to user's profile
    const user = await User.findById(req.user.id);
    if (user) {
      user.roadmaps.push({
        title: `Learning Path for ${targetJob || 'Target Role'}`,
        targetJob: targetJob || 'Not specified',
        weeks: roadmap,
        progress: {},
        createdAt: new Date()
      });
      await user.save();
    }

    res.json({
      message: 'Roadmap generated successfully',
      roadmap
    });
  } catch (error) {
    console.error('Roadmap generation error:', error);
    res.status(500).json({
      message: error.message || 'Failed to generate roadmap',
      error: error.message
    });
  }
});

module.exports = router;