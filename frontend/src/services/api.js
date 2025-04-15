import axios from 'axios';

// Use environment variables for API URL with fallback
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

console.log('Using API URL:', API_URL);

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
      console.log('Adding token to request:', config.url);
    } else {
      console.warn('No token found for request:', config.url);
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error(`API Error (${error.config?.url || 'unknown endpoint'}):`, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  login: (credentials) => api.post('/users/login/', credentials),
  register: (userData) => api.post('/users/register/', userData),
  getProfile: () => api.get('/users/profile/'),
  updateProfile: (userData) => api.put('/users/profile/', userData),
  changePassword: (passwordData) => api.put('/users/change-password/', passwordData),
  logout: () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.Authorization;
  },
};

// Topic services
export const topicService = {
  getTopics: () => api.get('/topics/'),
  getTopic: (id) => api.get(`/topics/${id}/`),
  getTopicContents: (id) => api.get(`/topics/${id}/contents/`),
};

// Progress services
export const progressService = {
  updateProgress: (contentId, completed) => api.post(`/progress/content/${contentId}/`, { completed }),
  getOverallProgress: () => api.get('/progress/overall/'),
};

// Admin services
export const adminService = {
  // Auth
  login: (credentials) => api.post('/admin/login/', credentials),

  // Dashboard
  getDashboard: () => api.get('/admin/dashboard/'),

  // Users
  getUsers: () => api.get('/admin/users/'),
  getUserStats: () => api.get('/admin/user-stats/'),

  // Topics
  getAdminTopics: () => api.get('/admin/topics/'),
  getAdminTopic: (id) => api.get(`/admin/topics/${id}/`),
  createTopic: (topicData) => api.post('/admin/topics/', topicData),
  updateTopic: (id, topicData) => api.put(`/admin/topics/${id}/`, topicData),
  deleteTopic: (id) => api.delete(`/admin/topics/${id}/`),

  // Content
  getAdminContent: (topicId = null) => {
    const url = '/admin/content/';
    return topicId ? api.get(`${url}?topic_id=${topicId}`) : api.get(url);
  },
  getAdminContentItem: (id) => api.get(`/admin/content/${id}/`),
  createContent: (contentData) => api.post('/admin/content/', contentData),
  updateContent: (id, contentData) => api.put(`/admin/content/${id}/`, contentData),
  deleteContent: (id) => api.delete(`/admin/content/${id}/`),
};

export default api;
