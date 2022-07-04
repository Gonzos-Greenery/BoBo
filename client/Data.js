import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, gql , useQuery } from '@apollo/client';
// import { gql } from "apollo-boost";

const GET_MOVIES = gql`
query GetMovies {
  getMovies {
    title
    description
  }
}
`;

export default () => {
  const {loading, error, data} = useQuery(GET_MOVIES);
  console.log(data)
  return(
    <View>
      {/* <Text>Title: {data.movies && data.movies.title}</Text> */}
      <Text>Hi</Text>
    </View>
  )
};
