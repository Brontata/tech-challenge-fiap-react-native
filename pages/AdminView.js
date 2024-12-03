import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import AdminViewList from '../components/PostsAdminViewList';
import postsService from '../services/Posts';

const AdminView = ({navigation, route}) => {
  const [data, setData] = React.useState([]);
  const [search, setSearch] = useState('');
  const isFocused = useIsFocused();

  React.useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await postsService.getPosts();
        setData(posts);
      } catch (error) {
        console.error(error);
      }
    }
    loadPosts();

    if (isFocused) {
      loadPosts();
  }

  }, [isFocused]);

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
    <View style={styles.container}>
      <View style={{marginBottom: 15}}>
        <Button title="Criar novo post" onPress={() => navigation.navigate('CreatePost')} />
      </View>
      <Text style={styles.text}>Toque em um post visualizar com detalhes!</Text>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Pesquisar por nome ou descrição"
          style={styles.searchInput}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>

      {filteredData.length === 0 && <Text style={styles.text}>Nenhum resultado encontrado</Text>}
      <AdminViewList navigation={navigation} route={route} filteredData={filteredData} />
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
});

export default AdminView;

