import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

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
            initialRouteName='RegisterMovies'
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
              name='StreamingOptions'
              component={StreamingOptions}
              options={{ title: 'Choose Streaming Services' }}
            />
            <Stack.Screen
              name='GenrePreferences'
              component={GenrePreferences}
              options={{ title: 'Choose Preferred Genres' }}
            />
            <Stack.Screen
              name='Login'
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='SingleMovie'
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
              name='MovieCard'
              component={MovieCard}
              options={{ title: 'Netflix and Chill' }}
            />
            <Stack.Screen
              name="RegisterMovies"
              component={RegisterMoviesList}
              options={{title: "Select Movies You've Seen"}}
            />
          </Stack.Navigator>
          <StatusBar style='light' />
        </NavigationContainer>
      </NativeBaseProvider>
    </ApolloProvider>
  );
}
