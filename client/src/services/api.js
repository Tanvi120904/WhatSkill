// services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Skill Analysis API
export const analyzeSkills = async (jobDescription, userSkills) => {
  try {
    const response = await apiClient.post('/analysis/skills', {
      jobDescription,
      userSkills,
    });
    return response.data.analysis;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to analyze skills');
  }
};

// Generate Roadmap API
export const generateRoadmap = async (missingSkills, partialSkills, targetJob = '') => {
  try {
    const response = await apiClient.post('/analysis/roadmap', {
      missingSkills,
      partialSkills,
      targetJob,
    });
    return response.data.roadmap;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to generate roadmap');
  }
};

// Auth APIs
export const login = async (email, password) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};

export const verifyToken = async () => {
  const response = await apiClient.get('/auth/verify');
  return response.data;
};

// User Profile APIs
export const getUserProfile = async () => {
  const response = await apiClient.get('/user/profile');
  return response.data;
};

export const updateUserProfile = async (profileData) => {
  const response = await apiClient.put('/user/profile', profileData);
  return response.data;
};

// Roadmap APIs
export const getUserRoadmaps = async () => {
  const response = await apiClient.get('/user/roadmaps');
  return response.data.roadmaps;
};

export const updateRoadmapProgress = async (roadmapId, progress) => {
  const response = await apiClient.put(`/user/roadmap/${roadmapId}/progress`, {
    progress,
  });
  return response.data;
};

// Analysis History APIs
export const getUserAnalyses = async () => {
  const response = await apiClient.get('/user/analyses');
  return response.data.analyses;
};

export default apiClient;