import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import api from '../api/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import usersService from '../services/Users';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const route = useRoute(); // Para acessar os parâmetros da rota

  // Inicializa os estados
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ALUNO');
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });

  // Determina se estamos no modo de edição ou cadastro
  const isEditing = !!route.params?.user;

  useEffect(() => {
    if (isEditing) {
      const { name, email, role } = route.params.user;
      console.log('teste',route.params.user);
      setName(name);
      setEmail(email);
      setRole(role);
    }
  }, [route.params]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegisterOrUpdate = async () => {
    setErrors({ name: '', email: '', password: '' });

    let isValid = true;
    const newErrors = {};

    if (!name?.trim()) {
      newErrors.name = 'O campo Nome é obrigatório.';
      isValid = false;
    }

    if (!email?.trim()) {
      newErrors.email = 'O campo Email é obrigatório.';
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Formato de email inválido.';
      isValid = false;
    }

    if (!isEditing && !password.trim()) {
      newErrors.password = 'O campo Senha é obrigatório.';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      return; 
    }

    const body = { name, email, role, password };

    try {
      if (isEditing) {
        // Editar usuário
        const response = await usersService.updateUser(route.params.user.id, body);
  
        if (response.status === 200) {
          Alert.alert('Sucesso', 'Usuário editado com sucesso!');
          navigation.goBack();
        }
      } else {
        // Cadastrar usuário
        const response = await api.post('/users/register', body);
        if (response.status === 201) {
          Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
          navigation.goBack();
        }
      }
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', 'Ocorreu um erro. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Edição' : 'Cadastro'}</Text>

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
        <Button title={isEditing ? 'Salvar Alterações' : 'Cadastrar'} onPress={handleRegisterOrUpdate} />
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
