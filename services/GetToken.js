import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found');
  }
  return token;
};

export default getToken;
