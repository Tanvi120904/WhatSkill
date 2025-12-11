// services/geminiService.js
const axios = require('axios');

class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta';
    this.model = 'gemini-pro';
  }

  async analyzeSkills(jobDescription, userSkills) {
    try {
      const prompt = `
You are a career counselor analyzing skill gaps. Given a job description and a candidate's current skills, provide a detailed analysis.

JOB DESCRIPTION:
${jobDescription}

CANDIDATE'S CURRENT SKILLS:
${userSkills}

Analyze and provide your response in the following JSON format (respond ONLY with valid JSON, no markdown or explanations):
{
  "currentSkills": ["skill1", "skill2"],
  "missingSkills": ["skill3", "skill4"],
  "partialSkills": ["skill5", "skill6"]
}

Instructions:
- currentSkills: Skills the candidate already has that match job requirements
- missingSkills: Skills required for the job that the candidate lacks completely
- partialSkills: Skills the candidate has some experience with but needs improvement
- Be specific and list actual technologies, tools, or competencies
- Return ONLY the JSON object, nothing else
      `.trim();

      const response = await axios.post(
        `${this.baseURL}/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          }
        }
      );

      const generatedText = response.data.candidates[0].content.parts[0].text;
      
      // Clean the response (remove markdown code blocks if present)
      const cleanedText = generatedText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      const analysis = JSON.parse(cleanedText);

      return {
        currentSkills: analysis.currentSkills || [],
        missingSkills: analysis.missingSkills || [],
        partialSkills: analysis.partialSkills || []
      };
    } catch (error) {
      console.error('Gemini API Error:', error.response?.data || error.message);
      throw new Error('Failed to analyze skills. Please try again.');
    }
  }

  async generateRoadmap(missingSkills, partialSkills) {
    try {
      const skillsToLearn = [...missingSkills, ...partialSkills];
      
      const prompt = `
Create a detailed 30-day learning roadmap for acquiring these skills: ${skillsToLearn.join(', ')}

Provide a 4-week structured plan in the following JSON format (respond ONLY with valid JSON):
{
  "week1": {
    "focus": "Brief description of week's focus",
    "goals": ["goal1", "goal2", "goal3"],
    "dailyTasks": ["Day 1 task", "Day 2 task", ... up to "Day 7 task"],
    "resources": {
      "youtube": "https://youtube.com/search?q=relevant+search",
      "coursera": "https://coursera.org/search?query=relevant+search",
      "practice": "https://relevant-practice-site.com",
      "docs": "https://relevant-documentation-site.com"
    }
  },
  "week2": { ... },
  "week3": { ... },
  "week4": { ... }
}

Requirements:
- Each week should have 3-4 specific goals
- Each week should have exactly 7 daily tasks (one for each day)
- Tasks should be actionable and specific
- Include real, working URLs for free resources
- Progress from basics to advanced topics
- Make tasks realistic for 1-2 hours daily commitment
- Return ONLY the JSON object
      `.trim();

      const response = await axios.post(
        `${this.baseURL}/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 4096,
          }
        }
      );

      const generatedText = response.data.candidates[0].content.parts[0].text;
      
      // Clean the response
      const cleanedText = generatedText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      const roadmap = JSON.parse(cleanedText);

      return roadmap;
    } catch (error) {
      console.error('Gemini API Error:', error.response?.data || error.message);
      throw new Error('Failed to generate roadmap. Please try again.');
    }
  }
}

module.exports = new GeminiService();