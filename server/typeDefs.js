import { ApolloServer, gql } from 'apollo-server-express';

const typeDefs = gql`
  type Movie {
    id: ID
    title: String
    description: String
    imdb_id: ID
    genres: [String]
  }
  type Genre {
    name: String
  }
  type User {
    id: ID
    name: String
    username: String
    email: String
    password: String
    token: String
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
  input RegisterInput {
    email: String
    password: String
    username: String
    name: String
  }

  input UpdateUserInput {
    id: String
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
    loginUser(LoginInput: LoginInput): User
    registerUser(registerInput: RegisterInput): User
    updateUser(updateUserInput: UpdateUserInput): User
  }
`;

export default typeDefs;
