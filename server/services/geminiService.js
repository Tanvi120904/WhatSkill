// services/geminiService.js
const axios = require('axios');

class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta';
    // Use 1.5-flash for faster results and better JSON compliance
    this.model = 'gemini-2.5-flash-lite'; 
  }

  // Helper to extract JSON from text even if AI adds extra chatter
  cleanAndParse(text) {
    try {
      // 1. Remove markdown code blocks
      let cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      // 2. Find the first '{' and last '}' to ignore any preamble text
      const firstBrace = cleaned.indexOf('{');
      const lastBrace = cleaned.lastIndexOf('}');
      
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleaned = cleaned.substring(firstBrace, lastBrace + 1);
      }

      return JSON.parse(cleaned);
    } catch (e) {
      console.error("JSON Parse Error on text:", text);
      throw new Error("AI response was not valid JSON");
    }
  }

  async analyzeSkills(jobDescription, userSkills) {
    try {
      const prompt = `
        You are a career counselor. Analyze these skills.
        JOB DESCRIPTION: ${jobDescription}
        CANDIDATE SKILLS: ${userSkills}
        
        Return JSON strictly matching this schema:
        {
          "currentSkills": ["skill1"],
          "missingSkills": ["skill2"],
          "partialSkills": ["skill3"]
        }
      `.trim();

      const response = await axios.post(
        `${this.baseURL}/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
        }
      );

      const generatedText = response.data.candidates[0].content.parts[0].text;
      const analysis = this.cleanAndParse(generatedText); // Use helper

      return {
        currentSkills: analysis.currentSkills || [],
        missingSkills: analysis.missingSkills || [],
        partialSkills: analysis.partialSkills || []
      };
    } catch (error) {
      console.error('Gemini API Error:', error.response?.data || error.message);
      throw new Error('Failed to analyze skills.');
    }
  }

  async generateRoadmap(missingSkills, partialSkills) {
    try {
      const skillsToLearn = [...missingSkills, ...partialSkills];
      const prompt = `
        Create a 4-week roadmap for: ${skillsToLearn.join(', ')}.
        Return JSON with keys "week1", "week2", "week3", "week4".
        Structure: { "week1": { "focus": "", "goals": [], "dailyTasks": [], "resources": { "youtube": "", "docs": "" } } }
      `.trim();

      const response = await axios.post(
        `${this.baseURL}/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 4096 }
        }
      );

      const generatedText = response.data.candidates[0].content.parts[0].text;
      return this.cleanAndParse(generatedText); // Use helper
    } catch (error) {
      console.error('Gemini API Error:', error.response?.data || error.message);
      throw new Error('Failed to generate roadmap.');
    }
  }
}

module.exports = new GeminiService();