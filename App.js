import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import AllMovies from './src/AllMovies';
import Login from './src/Login';
import MovieCard from './src/MovieSwipe/MovieCard';
import SingleMovie from './src/SingleMovie';
import StreamingOptions from './src/StreamingOptions';
import GenrePreferences from './src/GenrePreferences';
import { NativeBaseProvider } from 'native-base';
import { screenOptions } from './src/styles.js';
import Register from './src/Register';
import Login from './src/Login';

import { screenOptions } from './src/styles.js';

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Register'
            screenOptions={screenOptions}
          >
            <Stack.Screen
              name='Movies'
              component={AllMovies}
              options={{ title: 'BoBo' }}
            />
            <Stack.Screen
              name='Register'
              component={Register}
              options={{ title: 'BoBo Reg' }}
            />
            <Stack.Screen
              name='GenrePreferences'
              component={GenrePreferences}
              options={{ title: 'Choose Preferred Genres' }}
            />
          </Stack.Navigator>
          <StatusBar style='light' />
        </NavigationContainer>
      </NativeBaseProvider>
    </ApolloProvider>
  );
}
