import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";
import getToken from "../services/GetToken";

const usersService = {
  getUsers: async () => {
    try {
    const token = await getToken();
      const response = await api.get('/users', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      console.log('response getUsers = ', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
        const token = await getToken();

      const response = await api.delete(`/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar usuário com ID ${id}:`, error);
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    try {
        const token = await getToken();

      const response = await api.put(`/users/${id}`, userData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      return response;
    } catch (error) {
      console.error(`Erro ao atualizar usuário com ID ${id}:`, error);
      throw error;
    }
  }
};

export default usersService;
