import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { formatDate } from '../utils/dateTimeUtils';
import postsService from '../services/Posts';


const PostDetailsView = ({ navigation, route, post, admin }) => {
    const handleDelete = async () => {
        await postsService.deletePost(post.id);
        navigation.navigate('AdminView');
    }

    const handleUpdate = async () => {
        await postsService.updatePost(post.id);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.updated_at}>Atualizado em: {formatDate(post.updated_at)}</Text>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.author}>Autor: {post.author}</Text>
            <Image source={{ uri: "https://random-image-pepebigotes.vercel.app/api/random-image" }} style={{ width: '100%', height: 200 }}/>
            <Text style={styles.content}>{post.description}</Text>
            {admin && (
                <View style={styles.buttonContainer}>
                    <Button mode="contained" style={styles.editButton} onPress={handleUpdate}>Editar</Button>
                    <Button mode="contained" style={styles.deleteButton} onPress={handleDelete(post.id)}>Excluir</Button>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9'
    },
    updated_at: {
        fontSize: 14,
        color: '#999'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginVertical: 10
    },
    author: {
        fontSize: 18,
        color: '#666',
        marginBottom: 10
    },
    content: {
        fontSize: 16,
        marginTop: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
    },
    editButton: {
        flex: 1,
        marginRight: 10,
        backgroundColor: '#2593ef'
    },
    deleteButton: {
        flex: 1,
        marginRight: 10,
        backgroundColor: 'red'
    }
});

export default PostDetailsView;

