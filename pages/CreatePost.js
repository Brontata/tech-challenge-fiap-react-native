import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, Button } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import postsService from "../services/Posts";
import { useNavigation } from '@react-navigation/native';
import { Formik } from "formik";
import * as Yup from "yup";
import { getUserNameFromToken } from "../utils/tokenUtils";
import AsyncStorage from '@react-native-async-storage/async-storage';


const CreatePost = () => {
    const navigation = useNavigation();

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
    });

    async function createNewPost(title, description) {
        try {
            const token = await AsyncStorage.getItem('token');
            const postData = {
                title: title,
                description: description,
                author: getUserNameFromToken(token)
            }
            const newPost = await postsService.createPost(postData);
            if (newPost.id !== undefined) {
                alert("Post criado com sucesso!");
                navigation.navigate('Home');
            }else{
                alert("Erro ao criar post!");
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    return (
        <>
            <LinearGradient
                style={styles.container}
                colors={['#87CEEB', '#FFFFFF']}
            >
                <Formik
                    initialValues={{ title: '', description: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                         createNewPost(values.title, values.description);
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.content}>
                            <Text style={styles.label}>Título</Text>
                            <TextInput 
                                style={styles.input} 
                                onChangeText={handleChange('title')} 
                                onBlur={handleBlur('title')}
                            ></TextInput>

                            <Text style={styles.label}>Texto</Text>
                            <TextInput
                                multiline
                                numberOfLines={5}
                                placeholder="Enter your text here..."
                                style={{ height: 150, borderColor: 'gray', borderWidth: 1, borderRadius: 25, padding: 10, width: '80%' }}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                            />

                            <Button title="Salvar" style={styles.button} onPress={handleSubmit}>
                                    
                            </Button>

                        </View>
                    )}
                </Formik>
            </LinearGradient>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    content: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20
    },

    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '80%',
        borderRadius: 25,
    },
    button: {
        marginTop: 32,
        backgroundColor: '#87CEEB',
        borderColor: 'grey',
        borderWidth: 1,
        width: '40%',
        alignItems: 'center',
        fontSize: 50,
        fontWeight: 'bold',
    }
})

export default CreatePost