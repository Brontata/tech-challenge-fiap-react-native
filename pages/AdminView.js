import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import AdminViewList from '../components/PostsAdminViewList';

const AdminView = ({navigation, route}) => {
  const [data, setData] = React.useState([]);
  const [search, setSearch] = useState('');

  React.useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://tech-challenge-node-latest.onrender.com/posts');
      const responseData = await response.json();
      setData(responseData);
    };
    fetchPosts();
  }, []);

  const filteredData = data.filter(item => {
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
      <Text>Painel administrativo</Text>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Pesquisar por nome ou descrição"
          style={styles.searchInput}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      {filteredData.length === 0 && <Text>Nenhum resultado encontrado</Text>}
      <AdminViewList navigation={navigation} route={route} filteredData={filteredData} />
    </View>
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
});

export default AdminView;

