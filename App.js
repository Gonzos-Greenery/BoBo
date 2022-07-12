import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import store from './src/store';

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
            initialRouteName='Login'
            screenOptions={screenOptions}
          >
            {/* ons={{ title: 'BoBo'}}
            />
            /* <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: 'BoBo Reg' }}
          />
          <Stack.Screen
            name="StreamingOptions"
            component={StreamingOptions}
            options={{ title: 'Choose Streaming Services' }}
          />
          <Stack.Screen
            name="GenrePreferences"
            component={GenrePreferences}
            options={{ title: 'Choose Preferred Genres' }}
          /> */}
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="SingleMovie"
            component={SingleMovie}
            options={({
              route: {
                params: {
                  movie: { title },
                },
              }}) => ({
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
            <Stack.Screen
              name="PartyView"
              component={PartyView}
              options={{title: "Party"}}
            />
            <Stack.Screen
              name="PartyAddForm"
              component={PartyAddForm}
              options={{title: "Add Someone"}}
            />
            <Stack.Screen
              name="User"
              component={User}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}
