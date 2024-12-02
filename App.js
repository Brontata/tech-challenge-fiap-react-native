import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './components/Header';
import HomeScreen from './pages/Home';
import AdminView from './pages/AdminView';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './pages/Login';
import RegisterScreen from './pages/RegisterScreen';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './Hooks/useAuth';
import EditPost from './pages/EditPost';
import UserView from './pages/UserScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabsNavigator = () => {
  const { isLogged, role } = useAuth();
  console.log(role);

  return (
    <Tab.Navigator>
      {!isLogged && (
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <Ionicons name="person" size={size} color={color} />
              ) : (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
          }}
        />
      )}

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Ionicons name="home" size={size} color={color} />
            ) : (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
        }}
      />

      {isLogged && role === "PROFESSOR" && (
        <Tab.Screen
          name="Admin"
          component={AdminView}
          options={{
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <Ionicons name="person" size={size} color={color} />
              ) : (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
          }}
        />
      )}

      {isLogged && role === "PROFESSOR" && (
        <Tab.Screen
          name="CreatePost"
          component={CreatePost}
          options={{
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <Ionicons name="create" size={size} color={color} />
              ) : (
                <Ionicons name="create-outline" size={size} color={color} />
              ),
          }}
        />
      )}

{isLogged && role === "PROFESSOR" && (
        <Tab.Screen
          name="Usuários"
          component={UserView}
          options={{
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <Ionicons name="create" size={size} color={color} />
              ) : (
                <Ionicons name="create-outline" size={size} color={color} />
              ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={TabsNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostDetails"
          component={PostDetails}
          options={{ title: 'Detalhes do Post' }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="EditPost"
          component={EditPost}
          options={{ title: 'Editar Post' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <MyStack />
        </View>
      </View>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default App;