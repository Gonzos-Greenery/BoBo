import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppRegistry } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from "@apollo/client";

import Data from "./Data";
import MovieCard from "./components/MovieCard";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: "localhost:8080/graphql",
  cache: new InMemoryCache(),
});

const GET_MOVIES = gql`
query {
  movies {
    title
  }
}
`;


export default function App() {
  const { data} = useQuery(GET_MOVIES);
  return (
    <ApolloProvider client={client}>
      {/* <MovieCard />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Movie Card" component={MovieCard} />
          <View style={styles.container}>
          <Data />
          <MovieCardItem /> */}
          <Text style={{ fontWeight: "bold", fontSize: 30 }}>
            Data Goes Here
          </Text>
          {/* <StatusBar style="auto" />
        </View>
        </Stack.Navigator>
      </NavigationContainer> */}
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

AppRegistry.registerComponent("MyApplication", () => App);
