const axios = require('axios');

class AIService {
  constructor() {
    this.geminiKey = process.env.GEMINI_API_KEY;
    this.claudeKey = process.env.CLAUDE_API_KEY;
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta';
    this.claudeURL = 'https://api.anthropic.com/v1/messages';
  }

  // Extract skills from job description
  async extractJobSkills(jobDescription) {
    const prompt = `
Extract all technical skills, soft skills, and qualifications from this job description.
Return ONLY valid JSON with no markdown:

{
  "technicalSkills": ["skill1", "skill2"],
  "softSkills": ["skill1", "skill2"],
  "qualifications": ["qual1", "qual2"],
  "experienceLevel": "junior/mid/senior",
  "primaryRole": "role name"
}

JOB DESCRIPTION:
${jobDescription}
    `.trim();

    try {
      const response = await axios.post(
        `${this.baseURL}/models/gemini-pro:generateContent?key=${this.geminiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 2048 }
        }
      );

      const text = response.data.candidates[0].content.parts[0].text;
      const cleaned = text.replace(/```json\n?|```\n?/g, '').trim();
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('AI extraction error:', error);
      throw new Error('Failed to extract skills from job description');
    }
  }

  // Extract skills from resume
  async extractResumeSkills(resumeText) {
    const prompt = `
Analyze this resume and extract all skills, experience, and qualifications.
Return ONLY valid JSON:

{
  "technicalSkills": ["skill1", "skill2"],
  "softSkills": ["skill1", "skill2"],
  "experience": {
    "years": number,
    "roles": ["role1", "role2"]
  },
  "education": ["degree1", "degree2"],
  "certifications": ["cert1", "cert2"],
  "projects": ["project1", "project2"]
}

RESUME:
${resumeText}
    `.trim();

    try {
      const response = await axios.post(
        `${this.baseURL}/models/gemini-pro:generateContent?key=${this.geminiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 2048 }
        }
      );

      const text = response.data.candidates[0].content.parts[0].text;
      const cleaned = text.replace(/```json\n?|```\n?/g, '').trim();
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('AI extraction error:', error);
      throw new Error('Failed to extract skills from resume');
    }
  }

  // Compare skills and generate insights
  async compareSkills(jobSkills, userSkills) {
    const prompt = `
Compare the required skills with user's current skills and provide detailed analysis.
Return ONLY valid JSON:

{
  "currentSkills": ["skills user has that match"],
  "missingSkills": ["skills user completely lacks"],
  "partialSkills": ["skills user has basic knowledge of"],
  "matchPercentage": number,
  "insights": {
    "strengths": ["strength1", "strength2"],
    "weaknesses": ["weakness1", "weakness2"],
    "recommendations": ["rec1", "rec2"],
    "careerPath": "suggested path based on current skills"
  }
}

REQUIRED SKILLS: ${JSON.stringify(jobSkills)}
USER SKILLS: ${JSON.stringify(userSkills)}
    `.trim();

    try {
      const response = await axios.post(
        `${this.baseURL}/models/gemini-pro:generateContent?key=${this.geminiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.5, maxOutputTokens: 2048 }
        }
      );

      const text = response.data.candidates[0].content.parts[0].text;
      const cleaned = text.replace(/```json\n?|```\n?/g, '').trim();
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('AI comparison error:', error);
      throw new Error('Failed to compare skills');
    }
  }

  // Generate personalized roadmap
  async generateRoadmap(missingSkills, partialSkills, userProfile) {
    const prompt = `
Create a personalized 30-day learning roadmap for these skills:
Missing: ${missingSkills.join(', ')}
Partial: ${partialSkills.join(', ')}

User Profile:
- Learning Style: ${userProfile.learningStyle}
- Difficulty Level: ${userProfile.difficultyLevel}
- Time Commitment: ${userProfile.timeCommitment || '2 hours/day'}

Return ONLY valid JSON with this structure:
{
  "week1": {
    "focus": "Week focus area",
    "goals": ["goal1", "goal2", "goal3"],
    "dailyTasks": ["Day 1: task", "Day 2: task", ... "Day 7: task"],
    "resources": {
      "youtube": [{"title": "name", "url": "https://youtube.com/..."}],
      "courses": [{"platform": "Coursera", "title": "name", "url": "link"}],
      "practice": [{"title": "name", "url": "link"}],
      "docs": [{"title": "name", "url": "link"}]
    }
  },
  "week2": { ... },
  "week3": { ... },
  "week4": { ... },
  "finalProject": {
    "title": "Project name",
    "description": "What to build",
    "requirements": ["req1", "req2"],
    "technologies": ["tech1", "tech2"],
    "githubTemplate": "optional template link"
  }
}

Make it realistic for daily 1-2 hour commitment with FREE resources only.
    `.trim();

    try {
      const response = await axios.post(
        `${this.baseURL}/models/gemini-pro:generateContent?key=${this.geminiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 4096 }
        }
      );

      const text = response.data.candidates[0].content.parts[0].text;
      const cleaned = text.replace(/```json\n?|```\n?/g, '').trim();
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('Roadmap generation error:', error);
      throw new Error('Failed to generate roadmap');
    }
  }

  // Generate quiz questions
  async generateQuiz(category, subcategory, difficulty, count = 10) {
    const prompt = `
Generate ${count} multiple-choice quiz questions for:
Category: ${category}
Subcategory: ${subcategory}
Difficulty: ${difficulty}

Return ONLY valid JSON:
{
  "questions": [
    {
      "question": "Question text",
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": 0,
      "explanation": "Why this is correct",
      "skillTag": "${subcategory}",
      "difficulty": "${difficulty}",
      "points": 1
    }
  ]
}

Make questions practical and test real understanding.
    `.trim();

    try {
      const response = await axios.post(
        `${this.baseURL}/models/gemini-pro:generateContent?key=${this.geminiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 3072 }
        }
      );

      const text = response.data.candidates[0].content.parts[0].text;
      const cleaned = text.replace(/```json\n?|```\n?/g, '').trim();
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('Quiz generation error:', error);
      throw new Error('Failed to generate quiz');
    }
  }
}

module.exports = new AIService();