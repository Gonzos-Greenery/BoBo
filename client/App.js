import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppRegistry } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import { gql } from "apollo-boost";
import Data from './Data';

const client = new ApolloClient({
  uri: "localhost:8080/graphql",
  cache: new InMemoryCache(),
});

// const query = gql`
// {
//   movies {
//     title
//   }
// }
// `;

// const Movies = () => {
//   const {loading, error, data} = useQuery(query);
//   console.log(data)
//   return(
//     <View>
//       <Text>Title: {data.movies && data.movies.title}</Text>
//     </View>
//   )
// };

export default function App() {

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Data />
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>Data Goes Here</Text>
        <StatusBar style="auto" />
      </View>
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
