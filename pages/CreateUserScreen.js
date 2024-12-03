import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import api from '../api/api';
import { useNavigation } from '@react-navigation/native';


export default CreateUserScreen = () => {    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('ALUNO');
    const [errors, setErrors] = useState({});

    const navigation = useNavigation();

    
    async function handleRegister(){
        console.log('Handle Register')

        const userData = {
            name: name,
            email: email,
            password: password,
            role: role
        }

        console.log('userData = ', userData)
        try {
            const newUser = await api.post('/users/register', userData);
            console.log('newUser = ', newUser);

            if (newUser.status === 201) {
                Alert.alert('Cadastro realizado com sucesso');
                navigation.goBack();
            }else{
                Alert.alert('Erro ao cadastrar novo usuario');
            }

        }catch (error) {
            console.error(error);
        }

    }
    
    return (
        <View style={styles.container}>

      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="Nome"
        onChangeText={setName}
      />

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
        <Button title={ 'Cadastrar'} onPress={handleRegister} />
      </View>
      <Button title="Voltar" onPress={() => navigation.goBack()} color="gray" />
    </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 8 },
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
  