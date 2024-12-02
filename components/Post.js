import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { formatDate } from '../utils/dateTimeUtils';
import { limitString } from '../utils/stringUtils';

const image = 'https://random.imagecdn.app/500/150';
const Post = ({ post }) => {
    const navigation = useNavigation();
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('PostDetails', { post, navigation })}>
            <View style={styles.container} key={post.id} >
                <Text style={styles.title}>{post.title}</Text>
                <Image source={{ uri: image }} style={{ width: '100%', height: 200 }}/>
                <Text style={styles.author}>Autor: {post.author}</Text>
                <Text style={styles.content}>{limitString(post.description, 100)}</Text>
                <Text style={styles.date}>Atualizado em: {formatDate(post.created_at)}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginBottom: 75,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    author: {
        marginTop: 10,
        fontSize: 18,
        color: '#666',
        marginBottom: 10,    
    },
    content: {
        fontSize: 16,
    },
    date: {
        marginTop: 10,
        fontSize: 14,
        color: '#999',
    },
});

export default Post;
