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
    token: String
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
  input LoginInput{
    email: String
    password: String
  }
  input RegisterInput {
    name: String
    username: String
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
<<<<<<< HEAD
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
=======
>>>>>>> 84910115771ee9b08716ca9b3c8cb0dc3c724bee
    updateUser(updateUserInput: UpdateUserInput): User
  }
`;

export default typeDefs;
