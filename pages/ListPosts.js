import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import postsService from '../services/Posts';
import Post from '../components/Post';
const ListPosts = () => {
    const [posts, setPosts] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await postsService.getPosts();
                setPosts(response);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        if (isFocused) {
            fetchPosts();
        }
    }, [isFocused]);
    return (
        <View>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </View>
    )
}

export default ListPosts;