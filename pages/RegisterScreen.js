import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import api from '../api/api';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ALUNO'); 
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    setErrors({ name: '', email: '', password: '' });

    let isValid = true;
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'O campo Nome é obrigatório.';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'O campo Email é obrigatório.';
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Formato de email inválido.';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'O campo Senha é obrigatório.';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      return; 
    }

    const body = { name, email, password, role };

    try {
      const response = await api.post('/users/register', body);
      if (response.status === 201) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.goBack();
      } else {
        throw new Error('Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
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
      <View style={styles.buttonWrapper}>
        <Button title="Cadastrar" onPress={handleRegister} />
      </View>
      <Button title="Voltar" onPress={() => navigation.goBack()} color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 16, padding: 8, borderRadius: 15 },
  inputError: { borderColor: 'red' },
  errorText: { color: 'red', fontSize: 12, marginBottom: 10 },
  buttonWrapper: { marginBottom: 10 },
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
