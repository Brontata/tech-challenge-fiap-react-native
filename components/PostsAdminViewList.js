import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { formatDate } from '../utils/dateTimeUtils';
import { limitString } from '../utils/stringUtils';
import postsService from '../services/Posts';

const AdminViewList = ({ navigation, route, filteredData }) => {
    
    
    const handlePress = (post) => {
        navigation.navigate('PostDetails', { post });
    };

    const [deleting, setDeleting] = React.useState(false);

    const handleDelete = async (post) => {
        if (deleting) {
            return;
        }
        setDeleting(true);
        Alert.alert(
            "Exclusão de post",
            `Tem certeza que deseja excluir o post "${post.title}"?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                    onPress: () => console.log("Cancel pressed"),
                },
                {
                    text: "Excluir",
                    onPress: async () => {
                        try {
                            console.log(post.id)
                            await postsService.deletePost(post.id);
                            const index = filteredData.findIndex(item => item.id === post.id);
                            if (index !== -1) {
                                filteredData.splice(index, 1);
                            }
                            Alert.alert(
                                "Sucesso",
                                "O post foi excluído com sucesso.",
                                [
                                    {
                                        text: "OK",
                                        onPress: () => console.log("OK pressed"),
                                    },
                                ],
                            );
                        } catch (error) {
                            console.error('Error deleting post:', error);
                            Alert.alert(
                                "Erro",
                                "Erro ao excluir o post.",
                                [
                                    {
                                        text: "OK",
                                    },
                                ],
                            );
                        } finally {
                            setDeleting(false);
                        }
                    },
                },
            ],
        );
    }

    const handleEdit = (post) => {
        navigation.navigate('EditPost', { post });
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
                      <Button mode="contained" style={{flex: 1, marginRight: 10, backgroundColor: '#2593ef'}} onPress={() => handleEdit(item)}>Editar</Button>
                      <Button mode="contained" style={{flex: 1, marginRight: 10, backgroundColor: 'red'}} onPress={() => handleDelete(item)}>Excluir</Button>
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


