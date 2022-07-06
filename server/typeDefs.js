import { ApolloServer, gql } from 'apollo-server-express';

const typeDefs = gql`
  type Movie {
    id: ID
    title: String
    description: String
    imdb_id: ID
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
  input RegisterInput{
    name: String
    username: String
    email: String
    password: String
  }

  type Query {
    welcome: String
    getMovies: [Movie]
    getMovie(id: ID): Movie
    getUser(id: ID): User
  }
  type Mutation {
    addMovie(title: String, description: String): Movie
    deleteMovie(id: ID): String
    updateMovie(id: ID, title: String, description: String): Movie
    addUser(
      name: String
      username: String
      email: String
      password: String
      hulu: Boolean
      netflix: Boolean
      prime: Boolean
      disney: Boolean
      hbo: Boolean
    ): User
    updateUser(
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
    ): User
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
