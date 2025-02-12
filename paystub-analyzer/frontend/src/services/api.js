// frontend/src/services/api.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  },

  // Auth endpoints
  auth: {
    login: (credentials) => 
      api.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    
    register: (userData) =>
      api.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    
    getProfile: () => 
      api.request('/auth/profile'),
  },

  // Dashboard endpoints
  dashboard: {
    getSummary: () => 
      api.request('/dashboard/summary'),
    
    getTrends: () =>
      api.request('/dashboard/trends'),
  },

  // Transaction endpoints
  transactions: {
    getAll: (filters = {}) => {
      const params = new URLSearchParams(filters);
      return api.request(`/transactions?${params}`);
    },
    
    updateCategory: (transactionId, category) =>
      api.request(`/transactions/${transactionId}`, {
        method: 'PATCH',
        body: JSON.stringify({ category }),
      }),
    
    export: () =>
      api.request('/transactions/export', {
        headers: {
          'Accept': 'text/csv',
        },
      }),
  },

  // Upload endpoints
  upload: {
    paystub: (formData) =>
      api.request('/upload/paystub', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    
    statement: (formData) =>
      api.request('/upload/statement', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      }),
  },
};
