import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, text, TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import AllMovies from './src/AllMovies';
import Login from './src/Login';
import MovieCard from './src/MovieSwipe/MovieCard';
import SingleMovie from './src/SingleMovie';
import RegisterMoviesList from './src/RegisterMoviesList.js';
import StreamingOptions from './src/StreamingOptions';
import GenrePreferences from './src/GenrePreferences';
import { NativeBaseProvider } from 'native-base';
import { screenOptions } from './src/styles.js';
import Register from './src/Register';
import PartyView from './src/PartyView';
import PartyAddForm from './src/PartyAddForm';
import User from './src/User';
import Footer from './src/Footer';
import HostParty from './src/HostParty';
import FriendsList from './src/FriendsList';
import theme from './src/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();



function PartyStack() {
  return (
    <Stack.Navigator
      initalRouteName="Party-Host"
      screenOptions={screenOptions}
      options={{ headerShown: false }}
    >
      <Stack.Screen
        name="Party-Host"
        component={HostParty}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PartyAddForm"
        component={PartyAddForm}
        options={{ title: 'Add Someone' }}
      />
      <Stack.Screen
        name="MovieCard"
        component={MovieCard}
        options={{ title: 'Netflix and Chill' }}
      />

       <Stack.Screen
              name="PartyView"
              component={PartyView}
              options={{
                headerShown:false,
              }}
            />
    </Stack.Navigator>
  );
}

function LoggedInStack() {
  return (
    <Tab.Navigator
      initalRouteName="Home"
      activeColor="#404746"
      inactiveColor="#8A9D8C"
      barStyle={{ backgroundColor: '#F6F5DC' }}
      headerShown={false}
    >
      <Tab.Screen
        name="Home"
        component={MovieStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-details"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen name="FriendsList" component={FriendsList}  options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-multiple"
              color={color}
              size={26}
            />
          ),
        }}/>
      <Tab.Screen
        name="PartyStack"
        component={PartyStack}
        headerShown={false}
        options={{
          tabBarLabel: 'Create New Party',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="movie-open-plus"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function RegisterStack() {
  return (
    <Stack.Navigator
      navigationOptions={{ headerStyle: { backgroundColor: '#EFEECE' } }}
    >
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Register an account with BOBO',
          headerStyle: { backgroundColor: '#EFEECE' },
        }}
      />
      <Stack.Screen
        name="StreamingOptions"
        component={StreamingOptions}
        options={{ headerShown: false ,    headerStyle: { backgroundColor: '#EFEECE' },}}
      />
      <Stack.Screen
        name="GenrePreferences"
        component={GenrePreferences}
        options={{ headerShown: false ,    headerStyle: { backgroundColor: '#EFEECE' },}}
      />
      <Stack.Screen
        name="RegisterMovies"
        component={RegisterMoviesList}
        options={{ title: "Select Movies You've Seen",    headerStyle: { backgroundColor: '#EFEECE' }, }}
      />
    </Stack.Navigator>
  );
}

function MovieStack() {
  return (
    <Stack.Navigator initialRouteName="Movies" options={{ headerShown: false }}>
      <Stack.Screen
        name="Movies"
        headerShown={false}
        component={AllMovies}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SingleMovie"
        component={SingleMovie}
        options={({
          route: {
            params: {
              movie: { title },
            },
          },
        }) => ({
          title: title,
          headerStyle: { backgroundColor: '#EFEECE' },
        })}
      />
      <Stack.Screen
        name="MovieCard"
        component={MovieCard}
        options={{ title: 'Netflix and Chill' }}
      />
        <Stack.Screen
              name="PartyView"
              component={PartyView}
              options={{
                headerShown:false,
              }}
            />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={screenOptions}
          >
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoggedIn"
              component={LoggedInStack}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="RegisterStack"
              component={RegisterStack}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Parties"
              component={PartyStack}
              options={{ headerShown: false }}
            />

            <Stack.Screen name="Party Invites" component={PartyAddForm} />
            <Stack.Screen name="User" component={User} />

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}
