import { Text, TextInput, View, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from "react-native-paper";
import postsService from "../services/Posts";


const CreatePost = () => {
    console.log("Create Post COMECOU");
    async function createNewPost() {
        try {
        alert("Post criado com sucesso!");
        const postData = {
            title: "teste",
            author: "teste",
            description: "teste"
        }
        const post2 = await postsService.createPost(postData);
        console.log('POST RESULT = ', post2);
    } catch (error) {
        console.error('Error creating post:', error);
    }
}

    const mokedPost = {
        title: "teste",
        author: "teste",
        description: "teste"
    }

    return (
        <>
            <LinearGradient
                style={styles.container}
                colors={['#87CEEB', '#FFFFFF']}
            >
                <Text>Page Create Post</Text>
                <View style={styles.content}>
                    <Text style={styles.label}>Título</Text>
                    <TextInput style={styles.input}></TextInput>

                    <Text style={styles.label}>Texto</Text>
                    <TextInput 
                        multiline
                        numberOfLines={5}
                        placeholder="Enter your text here..."
                        style={{ height: 100, borderColor: 'gray', borderWidth: 1, borderRadius: 25, padding: 10, width: '80%' }}
                    />

                    <Button style={styles.button} onPress={() => createNewPost(mokedPost)}>
                        <Text style={styles.label}>
                            Salvar
                        </Text>
                    </Button>

                </View>
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
        justifyContent: 'center',
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
        backgroundColor: 'inherit',
        borderColor: 'grey',
        borderWidth: 1,
        width: '40%',
        alignItems: 'center',
        padding: 5,
        fontSize: 50,
        fontWeight: 'bold',
    }
})

export default CreatePost