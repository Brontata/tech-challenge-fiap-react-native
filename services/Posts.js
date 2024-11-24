import api from "../api/api"

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
        const response = await api.delete(`/posts/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlBST0ZFU1NPUiIsIm5hbWUiOiJHdWlsaGVybWUiLCJpYXQiOjE3MzI0MTIwMzQsImV4cCI6MTczMjQxNTYzNH0.f06UAVWBsVEuctHyLWLdUSalL-GoMBPIep7WlTF4sbY`
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
