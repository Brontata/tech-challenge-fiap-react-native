import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
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
        <FlatList
            data={posts}
            renderItem={({ item }) => <Post post={item} />}
        >
        </FlatList>
    )
}

export default ListPosts;
