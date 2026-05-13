import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public API
export const fetchProfile = () => api.get('/profile').then(r => r.data);
export const fetchExperiences = () => api.get('/experience').then(r => r.data);
export const fetchProjects = (featured?: boolean) =>
  api.get('/projects', { params: featured ? { featured: true } : {} }).then(r => r.data);
export const fetchSkills = () => api.get('/skills').then(r => r.data);
export const fetchBlogPosts = (page = 1, limit = 10) =>
  api.get('/blog', { params: { page, limit } }).then(r => r.data);
export const fetchBlogPost = (slug: string) => api.get(`/blog/${slug}`).then(r => r.data);
export const fetchTestimonials = () => api.get('/testimonials').then(r => r.data);
export const fetchSettings = () => api.get('/settings').then(r => r.data);
export const submitContact = (data: { name: string; email: string; company?: string; message: string }) =>
  api.post('/contact', data).then(r => r.data);
export const fetchCaseStudies = () => api.get('/case-studies').then(r => r.data);
export const fetchCaseStudy = (slug: string) => api.get(`/case-studies/${slug}`).then(r => r.data);
export const fetchResumeTemplates = () => api.get('/resume/templates').then(r => r.data);
export const generateResume = (roleType: string) => api.post('/resume/generate', { roleType }).then(r => r.data);
export const fetchMetricsOverview = () => api.get('/metrics/overview').then(r => r.data);
export const trackEvent = (data: { event: string; page?: string; visitorId?: string; metadata?: Record<string, unknown> }) =>
  api.post('/analytics/event', data).then(r => r.data);

// Auth
export const loginAdmin = (data: { email: string; password: string }) =>
  api.post('/auth/login', data).then(r => r.data);

// Admin APIs
export const adminApi = {
  // Profile
  updateProfile: (data: Record<string, unknown>) => api.put('/profile', data).then(r => r.data),
  // Experience
  getExperiences: () => api.get('/experience').then(r => r.data),
  createExperience: (data: Record<string, unknown>) => api.post('/experience', data).then(r => r.data),
  updateExperience: (id: string, data: Record<string, unknown>) => api.put(`/experience/${id}`, data).then(r => r.data),
  deleteExperience: (id: string) => api.delete(`/experience/${id}`).then(r => r.data),
  // Projects
  getProjects: () => api.get('/projects').then(r => r.data),
  createProject: (data: Record<string, unknown>) => api.post('/projects', data).then(r => r.data),
  updateProject: (id: string, data: Record<string, unknown>) => api.put(`/projects/${id}`, data).then(r => r.data),
  deleteProject: (id: string) => api.delete(`/projects/${id}`).then(r => r.data),
  // Skills
  getSkills: () => api.get('/skills').then(r => r.data),
  createSkillGroup: (data: Record<string, unknown>) => api.post('/skills', data).then(r => r.data),
  updateSkillGroup: (id: string, data: Record<string, unknown>) => api.put(`/skills/${id}`, data).then(r => r.data),
  deleteSkillGroup: (id: string) => api.delete(`/skills/${id}`).then(r => r.data),
  createSkill: (data: Record<string, unknown>) => api.post('/skills/items', data).then(r => r.data),
  deleteSkill: (id: string) => api.delete(`/skills/items/${id}`).then(r => r.data),
  // Blog
  getBlogPosts: () => api.get('/blog').then(r => r.data),
  createBlogPost: (data: Record<string, unknown>) => api.post('/blog', data).then(r => r.data),
  updateBlogPost: (id: string, data: Record<string, unknown>) => api.put(`/blog/${id}`, data).then(r => r.data),
  deleteBlogPost: (id: string) => api.delete(`/blog/${id}`).then(r => r.data),
  // Testimonials
  getTestimonials: () => api.get('/testimonials').then(r => r.data),
  createTestimonial: (data: Record<string, unknown>) => api.post('/testimonials', data).then(r => r.data),
  updateTestimonial: (id: string, data: Record<string, unknown>) => api.put(`/testimonials/${id}`, data).then(r => r.data),
  deleteTestimonial: (id: string) => api.delete(`/testimonials/${id}`).then(r => r.data),
  // Contact Messages
  getMessages: () => api.get('/contact').then(r => r.data),
  markMessageRead: (id: string) => api.patch(`/contact/${id}/read`).then(r => r.data),
  deleteMessage: (id: string) => api.delete(`/contact/${id}`).then(r => r.data),
  // Settings
  getSettings: () => api.get('/settings').then(r => r.data),
  updateSettings: (data: Record<string, unknown>) => api.put('/settings', data).then(r => r.data),
  // Case Studies
  getCaseStudies: () => api.get('/case-studies').then(r => r.data),
  createCaseStudy: (data: Record<string, unknown>) => api.post('/case-studies', data).then(r => r.data),
  updateCaseStudy: (id: string, data: Record<string, unknown>) => api.patch(`/case-studies/${id}`, data).then(r => r.data),
  deleteCaseStudy: (id: string) => api.delete(`/case-studies/${id}`).then(r => r.data),
  // Analytics
  getDashboard: () => api.get('/analytics/dashboard').then(r => r.data),
  getAnalyticsEvents: (page = 1, limit = 50) => api.get('/analytics/events', { params: { page, limit } }).then(r => r.data),
  // Recruiter Leads
  getLeads: () => api.get('/recruiter/leads').then(r => r.data),
  updateLead: (id: string, data: Record<string, unknown>) => api.patch(`/recruiter/leads/${id}`, data).then(r => r.data),
  deleteLead: (id: string) => api.delete(`/recruiter/leads/${id}`).then(r => r.data),
  // Resume
  getResumeDownloads: () => api.get('/resume/downloads').then(r => r.data),
  // Embeddings
  syncEmbeddings: () => api.post('/embeddings/sync').then(r => r.data),
  getEmbeddingsStatus: () => api.get('/embeddings/status').then(r => r.data),
};

export default api;
