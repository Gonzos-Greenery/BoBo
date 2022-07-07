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
import { NativeBaseProvider } from 'native-base';

<<<<<<< HEAD
import Register from './src/Register';

import { screenOptions } from './src/styles.js';
=======
import { screenOptions } from './src/styles.js';
import 'react-native-gesture-handler';

import Register from './src/Register';
import AllMovies from './src/AllMovies';
import Login from './src/Login';
import MovieCard from './src/MovieSwipe/MovieCard';
import SingleMovie from './src/SingleMovie';
>>>>>>> 84910115771ee9b08716ca9b3c8cb0dc3c724bee

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
<<<<<<< HEAD
            initialRouteName='Login'
            screenOptions={screenOptions}
          >
            {/* <Stack.Navigator
            initialRouteName="Register"
=======
            initialRouteName="Login"
>>>>>>> 84910115771ee9b08716ca9b3c8cb0dc3c724bee
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
<<<<<<< HEAD
              name='GenrePreferences'
              component={GenrePreferences}
              options={{ title: 'Choose Preferred Genres' }}
            />
            {/* <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'BoBo Account Login'}}
        /> */}
            <Stack.Screen
              name='SingleMovie'
=======
            name="Login"
            component={Login}
            options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SingleMovie"
>>>>>>> 84910115771ee9b08716ca9b3c8cb0dc3c724bee
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
<<<<<<< HEAD
              name='MovieCard'
              component={MovieCard}
              options={{ title: 'Netflix and Chill' }}
=======
              name="MovieCard"
              component={MovieCard}
              options={{ title: "Netflix and Chill" }}
>>>>>>> 84910115771ee9b08716ca9b3c8cb0dc3c724bee
            />
          </Stack.Navigator>
          <StatusBar style='light' />
        </NavigationContainer>
      </NativeBaseProvider>
    </ApolloProvider>
  );
}
