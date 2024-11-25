import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { formatDate } from '../utils/dateTimeUtils';
import { limitString } from '../utils/stringUtils';
import postsService from '../services/Posts';


const AdminViewList = ({ navigation, route, filteredData }) => {
    const handlePress = (post) => {
        navigation.navigate('PostDetails', { post });
    };

    const handleDelete = async () => {
      await postsService.deletePost(post.id);
      filteredData.splice(filteredData.indexOf(post.id), 1);
    }

    const handleEdit = (post) => {
        // Implement edit functionality here
        navigation.navigate('PostForm', { post });
    };

    return (
        <FlatList
            data={filteredData}
            renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => handlePress(item)} style={index % 2 === 0 ? { backgroundColor: '#e5e5e5' } : {}}>
                    <View style={styles.row}>
                        <Text style={styles.title}>{limitString(item.title, 16)}</Text>
                        
                        <Text style={styles.date}>{formatDate(item.updated_at)}</Text>
                    </View>
                    <View style={styles.row}>
                      
                        <Text style={styles.description}>{limitString(item.description, 30)}</Text>
                        <Text style={styles.author}>Autor: {item.author}</Text>
                    </View>
                    <View style={styles.row}>
                      <Button mode="contained" style={{flex: 1, marginRight: 10, backgroundColor: '#2593ef'}} onPress={handleEdit}>Editar</Button>
                      <Button mode="contained" style={{flex: 1, marginRight: 10, backgroundColor: 'red'}} onPress={handleDelete}>Excluir</Button>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
        />
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
    },
    author: {
        fontSize: 14,
        color: '#999',
    },
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
    description: {
        fontSize: 14,
        color: '#666'
    },
    date: {
        fontSize: 12,
        color: '#999',
        marginTop: 5
    },
});

export default AdminViewList;

