import React from "react";
import { Text, TextInput, View, StyleSheet, Button } from "react-native";
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import postsService from "../services/Posts";
import { useNavigation } from '@react-navigation/native';
import { Formik } from "formik";
import * as Yup from "yup";


const EditPost = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { post } = route.params;

    const postId = Number(post.id);
    console.log('POST ID = ', postId);
    console.log('POST FINAL = ', post);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
    });


    async function handleEditPost(title, description) {
        try {
            console.log('Iniciou edicao do post');
            console.log('title = ', title);
            console.log('description = ', description);

            const postData = {
                title: title,
                description: description,
                id: postId
            }

            const updatePost = await postsService.updatePost(postId, postData);
            console.log(' xxxxxxx updatePost = ', updatePost);

            if (updatePost.id !== undefined) {
                alert("Post editado com sucesso!");
                //navigation.navigate('Home');
                navigation.goBack();
            } else {
                alert("Erro ao editar post!");
            }

        } catch (error) {
            console.error('Error updating post:', error);
        }

    }

    return (
        <>
            <LinearGradient
                style={styles.container}
                colors={['#87CEEB', '#FFFFFF']}
            >
                <Formik
                    initialValues={{ title: post.title, description: post.description }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleEditPost(values.title, values.description);
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.content}>
                            <Text style={styles.label}>Título</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('title')}
                                onBlur={handleBlur('title')}
                                value={values.title}
                            ></TextInput>

                            <Text style={styles.label}>Texto</Text>
                            <TextInput
                                multiline
                                numberOfLines={5}
                                style={{ height: 150, borderColor: 'gray', borderWidth: 1, borderRadius: 25, padding: 10, width: '80%' }}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                value={values.description}
                            />

                            <Button title="Salvar Alteracões" style={styles.button} onPress={handleSubmit}>

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
        //justifyContent: 'center',
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




export default EditPost;
