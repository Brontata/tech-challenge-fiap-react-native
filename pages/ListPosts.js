import { useEffect, useState } from 'react';
import { FlatList, View, TextInput, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import postsService from '../services/Posts';
import Post from '../components/Post';
const ListPosts = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const isFocused = useIsFocused();
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await postsService.getPosts(search);
                setPosts(response);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        if (isFocused) {
            fetchPosts();
        }
    }, [isFocused, search]);

    const handleSearch = (text) => {
        setSearch(text);
    };

    const filteredPosts = posts.filter(item => {
        const title = item.title.toLowerCase();
        const description = item.description.toLowerCase();
        const searchLower = search.toLowerCase();

        return (
            title.includes(searchLower) ||
            description.includes(searchLower)
        );
    });

    return (
        <View>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Pesquisar por nome ou descrição"
                    style={styles.searchInput}
                    value={search}
                    onChangeText={handleSearch}
                />
            </View>
            <FlatList
                data={filteredPosts}
                renderItem={({ item }) => <Post post={item} />}
            >
            </FlatList>
        </View>

    )
};

const styles = StyleSheet.create({
    searchContainer: {
        padding: 15,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
});

export default ListPosts;

