import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';

const PostDetails = ({ route, navigation }) => {
    const { post } = route.params;

    //TODO: Implementar exclusão
    const handleDelete = async () => {
        await postsService.deletePost(post.id);
        navigation.goBack();
    }

    //TODO: Implementar edição
    const handleUpdate = async () => {
        await postsService.updatePost(post.id);
    }

    const admin = true;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.author}>{post.author}</Text>
            <Text style={styles.content}>{post.description}</Text>
            {admin && (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10}}>
                    <Button mode="contained" style={{flex: 1}} onPress={handleUpdate}>Editar</Button>
                    <Button mode="contained" style={{flex: 1, marginRight: 10, backgroundColor: 'red'}} onPress={handleDelete}>Excluir</Button>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 24
    },
    author: {
        fontSize: 18,
        color: '#666'
    },
    content: {
        fontSize: 16,
        marginTop: 20
    }
});

export default PostDetails;
