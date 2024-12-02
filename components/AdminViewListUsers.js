import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { limitString } from '../utils/stringUtils';
import usersService from '../services/Users';

const AdminViewListUsers = ({ navigation, route, filteredData }) => {

    const [deleting, setDeleting] = React.useState(false);

    const handleDelete = async (user) => {
        if (deleting) {
            return;
        }
        setDeleting(true);
        Alert.alert(
            "Exclusão de usuário",
            `Tem certeza que deseja excluir o usuário "${user.name}"?`,
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
                            await usersService.deleteUser(user.id);
                            const index = filteredData.findIndex(item => item.id === user.id);
                            if (index !== -1) {
                                filteredData.splice(index, 1);
                            }
                            Alert.alert(
                                "Sucesso",
                                "O usuário foi excluído com sucesso.",
                                [
                                    {
                                        text: "OK",
                                        onPress: () => console.log("OK pressed"),
                                    },
                                ],
                            );
                        } catch (error) {
                            console.error('Error deleting user:', error);
                            Alert.alert(
                                "Erro",
                                "Erro ao excluir o usuário.",
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

    const handleEdit = (user) => {
        navigation.navigate('Register', { user });
    };

    return (
        <FlatList
            data={filteredData}
            renderItem={({ item, index }) => (
                <TouchableOpacity>
                    <View style={styles.row}>
                        <Text style={styles.name}>{limitString(item.name, 24)}</Text>
                        <Text style={styles.role}>{limitString(item.role, 16)}</Text>
                    </View>
                    <View style={styles.row}>
                      
                        <Text style={styles.description}>{limitString(item.email, 30)}</Text>
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
    role: {
        fontSize: 12,
        color: '#999',
        marginTop: 5
    },
});

export default AdminViewListUsers;


