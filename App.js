import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {View, text, TouchableOpacity} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/* Used for graphql hookup (also add in <ApolloProvider client={client}> tage around return statement)
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
}); */

function PartyStack() {
  return (
    <Stack.Navigator initalRouteName="Party" screenOptions={screenOptions}>
      <Stack.Screen name="Party" component={PartyView} />
      <Stack.Screen name="Party Invites" component={PartyAddForm} />
      <Stack.Screen name="Party-Host" component={HostParty} />
      <Stack.Screen
        name="PartyAddForm"
        component={PartyAddForm}
        options={{ title: 'Add Someone' }}
      />
    </Stack.Navigator>
  );
}

function LoggedInStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={AllMovies} />
      <Tab.Screen name="User" component={User} />
      <Tab.Screen name="Movies" component={MovieStack} />
      <Tab.Screen name="PartyStack" component={PartyStack} />
    </Tab.Navigator>
  );
}

function RegisterStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: 'BoBo Reg' }}
      />
      <Stack.Screen
        name="StreamingOptions"
        component={StreamingOptions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GenrePreferences"
        component={GenrePreferences}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterMovies"
        component={RegisterMoviesList}
        options={{ title: "Select Movies You've Seen" }}
      />
    </Stack.Navigator>
  );
}

function MovieStack() {
  return (
    <Stack.Navigator>
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
        })}
      />
      <Stack.Screen
        name="MovieCard"
        component={MovieCard}
        options={{ title: 'Netflix and Chill' }}
      />
      <Stack.Screen />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NativeBaseProvider>
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
            <Stack.Screen name="LoggedIn" component={LoggedInStack} />

            <Stack.Screen name="RegisterStack" component={RegisterStack} />
            <Stack.Screen
              name="PartyView"
              component={PartyView}
              options={{ title: 'Party' }}
            />
            <Stack.Screen name="PartyStack" component={PartyStack} />
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="FriendsList" component={FriendsList} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}
