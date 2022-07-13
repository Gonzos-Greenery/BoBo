import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import store from './src/store';

import AllMovies from './src/AllMovies';
<<<<<<< HEAD
// import Login from './src/Login';
// import MovieCard from './src/MovieSwipe/MovieCard';
// import SingleMovie from './src/SingleMovie';
import StreamingOptions from './src/StreamingOptions';
// import GenrePreferences from './src/GenrePreferences';
=======
import Login from './src/Login';
import MovieCard from './src/MovieSwipe/MovieCard';
import SingleMovie from './src/SingleMovie';
import StreamingOptions from './src/StreamingOptions';
import GenrePreferences from './src/GenrePreferences';
>>>>>>> ff68609b7dfadd3fdff622d019b6b8c7f15063eb
import { NativeBaseProvider } from 'native-base';
import { screenOptions } from './src/styles.js';
import Register from './src/Register';
import HostParty from './src/HostParty';

const Stack = createStackNavigator();

/* Used for graphql hookup (also add in <ApolloProvider client={client}> tage around return statement)
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
}); */

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Movies'
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
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='GenrePreferences'
              component={GenrePreferences}
              options={{ headerShown: false }}
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
              name='HostParty'
              component={HostParty}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <StatusBar style='light' />
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}
