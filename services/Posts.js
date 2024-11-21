import api from '../api/api'

const postsService = {
    getPosts: async () => {
        const response = await api.get('/posts')
        return response.data
    },

    deletePost: async (id) => {
        const response = await api.delete(`/posts/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    },

    createPost: async (postData) => {
        const response = await api.post('/posts/create', postData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data;
    },

    updatePost: async (id, postData) => {
        const response = await api.put(`/posts/${id}`, postData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data;
    }

}

export default postsService
