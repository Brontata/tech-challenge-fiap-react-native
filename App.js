import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/Home';
import AdminView from './pages/AdminView';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import { Ionicons } from '@expo/vector-icons';
import EditPost from './pages/EditPost';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// BottomTabNavigator para as telas principais
const TabsNavigator = () => (
    <Tab.Navigator>
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
    </Tab.Navigator>
);

// StackNavigator para incluir telas extras
const MyStack = () => (
  <NavigationContainer>
      <Stack.Navigator>
        {/* Tela principal que contém o TabNavigator */}
        
        <Stack.Screen
          name="MainTabs"
          component={TabsNavigator}
          options={{ headerShown: false }}
        />
        {/* Tela de detalhes do post, fora do TabNavigator */}
        <Stack.Screen
          name="PostDetails"
          component={PostDetails}
          options={{ title: 'Detalhes do Post' }}
        />
        <Stack.Screen
          name="EditPost"
          component={EditPost}
          options={{ title: 'Editar Post' }}
        />
      </Stack.Navigator>

  </NavigationContainer>
);

export default MyStack;