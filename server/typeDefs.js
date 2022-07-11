import { ApolloServer, gql } from 'apollo-server-express';

const typeDefs = gql`
  type Movie {
    id: ID
    title: String
    description: String
    imdb_id: ID,
    imdb_score: Float
    production_countries: String
    release_year: Int
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
    genre: [Genre!]
    watched: [String]
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
  input LoginInput {
    email: String
    password: String
  }
  input RegisterInput {
    name: String
    username: String
    password: String
    email: String
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
  input GenreInput {
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
  }
  input AddWatched {
    id: String
    watched: [String]
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
    addGenre(genreInput: GenreInput): Genre
    updateUser(updateUserInput: UpdateUserInput): User
    addWatched(addWatched: AddWatched): User
  }
`;

export default typeDefs;
