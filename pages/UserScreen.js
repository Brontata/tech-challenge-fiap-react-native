import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import usersService from '../services/Users';
import AdminViewListUsers from '../components/AdminViewListUsers';

const UserView = ({navigation, route}) => {
  const [users, setData] = React.useState([]);
  const isFocused = useIsFocused();
  const [role, setRole] = useState('PROFESSOR');
  const [search, setSearch] = useState(''); 

  React.useEffect(() => {
    const loadPosts = async () => {
      try {
        const users = await usersService.getUsers();
        setData(users);
      } catch (error) {
        console.error(error);
      }
    }
    loadPosts();

    if (isFocused) {
      loadPosts();
  }

  }, [isFocused,]);
  

  const value = users.filter(item => item.role === role);
  
  const filteredData = value.filter(item => {
    const name = item.name.toLowerCase();
    const searchLower = search.toLowerCase();

    return (
      name.includes(searchLower)
    );
  });

  return (
    <View style={styles.container}>
        <View style={styles.searchContainer}>
        <TextInput
          placeholder="Pesquisar por nome"
          style={styles.searchInput}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
        <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioButton, role === 'ALUNO' && styles.radioSelected]}
          onPress={() => setRole('ALUNO')}
        >
          <Text style={styles.radioText}>Aluno</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, role === 'PROFESSOR' && styles.radioSelected]}
          onPress={() => setRole('PROFESSOR')}
        >
          <Text style={styles.radioText}>Professor</Text>
        </TouchableOpacity>
      </View>

      {filteredData.length === 0 && <Text style={styles.text}>Nenhum resultado encontrado</Text>}
      <AdminViewListUsers navigation={navigation} route={route} filteredData={filteredData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  text: {
    fontSize: 16
  },
  radioContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  radioButton: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: '#f9f9f9',
  },
  radioSelected: {
    borderColor: '#007BFF',
    backgroundColor: '#E0F0FF',
  },
  radioText: { textAlign: 'center', color: '#007BFF' },
});

export default UserView;

