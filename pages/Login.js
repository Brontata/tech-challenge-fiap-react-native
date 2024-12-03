import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../Hooks/useAuth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    if (!email) {
      setEmailError('O email é obrigatório!');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Por favor, insira um email válido!');
      isValid = false;
    }

    if (!password) {
      setPasswordError('A senha é obrigatória!');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const loginResponse = await loginApi({ email, password });

      if (loginResponse.token) {
        await AsyncStorage.setItem('token', loginResponse.token);
        await AsyncStorage.setItem('role', loginResponse.role);
        login(loginResponse.token, loginResponse.role, 3600);

        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'Credenciais inválidas!');
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login.');
    }
  };

  const loginApi = async (credentials) => {
    const response = await api.post('/users/login', credentials);

    if (response.status !== 200) {
      throw new Error('Erro ao fazer login');
    }

    return response.data;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError('');
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setPasswordError(''); // Limpa erro enquanto o usuário digita
        }}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

      <Button title="Entrar" onPress={handleLogin} />

      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Não tem uma conta? Cadastre-se
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  error: { color: 'red', marginBottom: 8 },
  link: { color: 'blue', marginTop: 16, textAlign: 'center' },
});
