import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import AllMovies from './src/AllMovies'
import Login from './src/Login'

import { screenOptions } from './src/styles.js'

const Stack = createStackNavigator()

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
        <Stack.Screen
          name="Movies"
          component={AllMovies}
          options={{ title: 'BoBo' }}
        />
        <Stack.Screen 
          name="Login"
          component={Login}
          options={{title: 'BoBo Account Login'}}
        />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
    </ApolloProvider>
  )
}
