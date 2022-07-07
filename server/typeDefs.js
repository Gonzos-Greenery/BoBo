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
    genre: [Genre!]
  }
  type Genre {
    action: Boolean
    animation: Boolean
    comedy: Boolean
    crime: Boolean
    documentation: Boolean
    drama: Boolean
    european: Boolean
    family: Boolean
    fantasy: Boolean
    history: Boolean
    horror: Boolean
    music: Boolean
    romance: Boolean
    scifi: Boolean
    thriller: Boolean
    war: Boolean
    western: Boolean
    user: [User!]
  }
  input RegisterInput {
    name: String
    username: String
    email: String
    password: String
  }
  input UpdateUserInput {
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
    registerUser(registerInput: RegisterInput): User
    addGenre(
      action: Boolean
      animation: Boolean
      comedy: Boolean
      crime: Boolean
      documentation: Boolean
      drama: Boolean
      european: Boolean
      family: Boolean
      fantasy: Boolean
      history: Boolean
      horror: Boolean
      music: Boolean
      romance: Boolean
      scifi: Boolean
      thriller: Boolean
      war: Boolean
      western: Boolean
    ): Genre
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
