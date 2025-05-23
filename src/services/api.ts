import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "https://w1-hackaton.onrender.com/api";
// Cliente axios configurado
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Interceptador para adicionar token de autenticação nas requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Serviço de usuários
export const userService = {
  // Registrar um novo usuário
  register: async (userData: any) => {
    try {
      const response = await api.post('/users/register', userData);
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw error;
    }
  },
  
  // Login de usuário
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post('/users/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },
  
  // Salvar informações adicionais pós-registro
  saveAdditionalInfo: async (userId: string, additionalInfo: any) => {
    try {
      const response = await api.post(`/users/${userId}/additional-info`, additionalInfo);
      return response.data;
    } catch (error) {
      console.error('Erro ao salvar informações adicionais:', error);
      throw error;
    }
  },
  getDashboardData: async (userId: string) => {
    const response = await api.get(`/users/${userId}/dashboard`);
    return response.data;
  },
  getCalendarEvents: async (userId: string) => {
    const response = await api.get(`/users/${userId}/calendar-events`);
    return response.data;
  },
  saveSimulation: async (userId: string, simulation: any) => {
    const response = await api.post(`/users/${userId}/simulations`, simulation);
    return response.data;
  },
  
  getSimulations: async (userId: string) => {
    const response = await api.get(`/users/${userId}/simulations`);
    return response.data;
  },
  getSimulationData: async (userId: string) => {
    const response = await api.get(`/users/${userId}/simulation-data`);
    return response.data;
  }
  
  
};

