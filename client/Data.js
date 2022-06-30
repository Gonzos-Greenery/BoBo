import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery } from '@apollo/client';
import { gql } from "apollo-boost";

const GET_MOVIES = gql`
query {
  movies (first: 10){
    title
  }
}
`;

export default () => {
  const {loading, error, data} = useQuery(`{movies {title}}`);
  console.log(error)
  return(
    <View>
      {/* <Text>Title: {data.movies && data.movies.title}</Text> */}
      <Text>Hi</Text>
    </View>
  )
};
