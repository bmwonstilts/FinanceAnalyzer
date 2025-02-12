// frontend/src/services/auth.js
import { api } from './api';
import { storage } from './storage';

export const auth = {
  async login(username, password) {
    const response = await api.auth.login({ username, password });
    storage.setToken(response.access_token);
    storage.setUser(response.user);
    return response;
  },

  async register(userData) {
    const response = await api.auth.register(userData);
    storage.setToken(response.access_token);
    storage.setUser(response.user);
    return response;
  },

  async logout() {
    storage.clear();
  },

  isAuthenticated() {
    return !!storage.getToken();
  },
};