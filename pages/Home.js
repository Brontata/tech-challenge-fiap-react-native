import { Text, View, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";


const HomeScreen = ({ navigation }) => {
  return (
    <>
      <Text>Home</Text>
      <Button
        title="Admin View"
        onPress={() =>
          navigation.navigate('AdminView', {})
        }
      />

      <Button 
        title="Create Post"
        onPress={() =>
          navigation.navigate('CreatePost', {})
        }
      />
    </>
  );
};

export default HomeScreen;