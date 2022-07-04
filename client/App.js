import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppRegistry } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloConsumer, HttpLink, from} from "@apollo/client";
import { gql } from "apollo-boost";
import Data from './Data';
import Login from './Components/Login'


const link = new HttpLink({uri: "http://localhost:8080/graphql"})
// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: link
// });

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
})

client.query({
  query: gql`
  {
    getMovies {
      title
      description
    }
  }`
}).then((result) => console.log(result))

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
const WithApolloClient = () => (
  <ApolloConsumer>
    {client => 'We have access to the client!' /* do stuff here */}
  </ApolloConsumer>
);

export default function App() {
  
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        {/* <Text style={{ fontWeight: "bold", fontSize: 30 }}>Data Goes Here</Text> */}
        <StatusBar style="auto" />
        {/* <Login/> */}
        <Text>Hello World</Text>
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A4C69C",
    alignItems: "center",
    justifyContent: "center",
  },
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff'
//   },
//   header: {
//     marginTop: 50,
//     alignItems: 'center',
//     borderBottomWidth: StyleSheet.hairlineWidth
//   },
//   headerText: {
//     marginBottom: 5,
//     fontSize: 30,
//     fontWeight: 'bold'
//   },
//   contentContainer: {
//     paddingHorizontal: 20,
//     paddingVertical: 20
//   }
// })

AppRegistry.registerComponent("MyApplication", () => App);
