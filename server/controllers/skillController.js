const Analysis = require('../models/Analysis');
const Roadmap = require('../models/Roadmap');
const { analyzeSkills, generateRoadmap } = require('../services/geminiService');

// @desc    Analyze skill gap
// @route   POST /api/skills/analyze
// @access  Private
const analyzeSkillGap = async (req, res) => {
  try {
    const { jobDescription, userSkills } = req.body;

    // Validate input
    if (!jobDescription || !userSkills) {
      return res.status(400).json({
        message: 'Please provide both job description and user skills',
      });
    }

    // Call Gemini AI
    const analysis = await analyzeSkills(jobDescription, userSkills);

    // Calculate match percentage
    const totalSkills =
      analysis.currentSkills.length +
      analysis.missingSkills.length +
      analysis.partialSkills.length;
    const matchPercentage = Math.round(
      (analysis.currentSkills.length / totalSkills) * 100
    );

    // Save analysis to database
    const savedAnalysis = await Analysis.create({
      user: req.user._id,
      jobDescription,
      userSkills,
      currentSkills: analysis.currentSkills,
      missingSkills: analysis.missingSkills,
      partialSkills: analysis.partialSkills,
      matchPercentage,
    });

    res.status(200).json({
      ...analysis,
      matchPercentage,
      analysisId: savedAnalysis._id,
    });
  } catch (error) {
    console.error('Error analyzing skills:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate learning roadmap
// @route   POST /api/skills/roadmap
// @access  Private
const createRoadmap = async (req, res) => {
  try {
    const { analysisId } = req.body;

    // Get analysis
    const analysis = await Analysis.findById(analysisId);

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }

    // Generate roadmap with Gemini AI
    const roadmap = await generateRoadmap(
      analysis.missingSkills,
      analysis.partialSkills
    );

    // Save roadmap
    const savedRoadmap = await Roadmap.create({
      user: req.user._id,
      analysis: analysisId,
      roadmap,
      progress: {},
    });

    res.status(200).json(savedRoadmap);
  } catch (error) {
    console.error('Error generating roadmap:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update roadmap progress
// @route   PUT /api/skills/roadmap/:id/progress
// @access  Private
const updateProgress = async (req, res) => {
  try {
    const { progress } = req.body;
    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    roadmap.progress = { ...roadmap.progress, ...progress };
    await roadmap.save();

    res.status(200).json(roadmap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  analyzeSkillGap,
  createRoadmap,
  updateProgress,
};