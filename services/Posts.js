import api from "../api/api"
import AsyncStorage from '@react-native-async-storage/async-storage';

let token ;


const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      token = storedToken;
    } catch (error) {
      console.error(error);
    }
  };


const postsService = {

    getPosts: async () => {
        try {
            const response = await api.get('/posts');
            return response.data;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    },

    deletePost: async (id) => {
        if (!token) await getToken();
        const response = await api.delete(`/posts/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    },

    createPost: async (postData) => {
        if (!token) await getToken();
        const response = await api.post('/posts/create', postData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data;
    },

    updatePost: async (id, postData) => {
        if (!token) await getToken();
        console.log('token update = ', token);
        const response = await api.put(`/posts/${id}`, postData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data;
    }

}

export default postsService
