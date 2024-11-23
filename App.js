
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './pages/Home';
import AdminView from './pages/AdminView';
import PostDetails from './pages/PostDetails';
import CreatePost from './pages/CreatePost';

const Stack = createNativeStackNavigator();
const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'XPTO Educacão'}}
        />
        <Stack.Screen name="AdminView" component={AdminView} />
        <Stack.Screen name="PostDetails" component={PostDetails} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;