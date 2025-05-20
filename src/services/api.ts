import axios from 'axios';

// Base URL para a API - substitua pela URL real do seu serviço backend quando estiver pronto
const API_URL = 'http://localhost:3000/api';  

// Cliente axios configurado
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
  
  // Salvar informações adicionais pós-registro
  saveAdditionalInfo: async (userId: string, additionalInfo: any) => {
    try {
      const response = await api.post(`/users/${userId}/additional-info`, additionalInfo);
      return response.data;
    } catch (error) {
      console.error('Erro ao salvar informações adicionais:', error);
      throw error;
    }
  }
};