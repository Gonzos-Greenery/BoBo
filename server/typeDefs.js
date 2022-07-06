import { ApolloServer, gql } from "apollo-server-express";

const typeDefs = gql`
  type Movie {
    id: ID
    title: String
    description: String
  }
  type User {
    id: ID
    name: String
    username: String
    email: String
    password: String
    hulu: Boolean
    netflix: Boolean
    prime: Boolean
    disney: Boolean
    hbo: Boolean
  }
  input LoginInput{
    email: String
    password: String
  }

  type Query {
    welcome: String
    getMovies: [Movie]
    getMovie(id: ID): Movie
  }
  type Mutation {
    addMovie(title: String, description: String): Movie
    deleteMovie(id: ID): String
    updateMovie(id: ID, title: String, description: String): Movie
    loginUser(LoginInput: LoginInput): User
  }
`;

// const GET_MOVIES = gql`
// type Query {
//   movies {
//     title
//   }
// }
// `

export default typeDefs;
