import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';

const AdminViewList = ({navigation, route, filteredData}) => {
    const handlePress = (post) => {
        navigation.navigate('PostDetails', { post });
      };
    return (
    <FlatList
    data={filteredData}
    renderItem={({item}) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
        <View style={styles.row}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{new Date(item.updatedAt).toLocaleDateString()}</Text>
        <Text style={styles.author}>Autor: {item.author}</Text>
        </View>
    </TouchableOpacity>
    )}
    keyExtractor={item => item.id.toString()}
    />
    );
}

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

export default AdminViewList;
    
