import { ApolloServer, gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date

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
  type Party {
    date: Date
    host: [User!]
    invitedGuests: [User!]
    acceptedGuests: [User]
    deniedGuests: [User!]
    potentialMovies: [Movie!]
    pickedMovie: Movie!
    partyRating: [PartyRating!]
  }
  type Friend {
    user: User!
    friend: User!
  }
  type UserRating {
    rating: Float
    watchAgain: Boolean
    wantToWatch: Boolean
    user: User!
  }
  type PartyRating {
    rating: Float
    movie: [Movie!]
    user: [User!]
    party: [Party!]
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
  input UserRatingInput {
    rating: Float
    watchAgain: Boolean
    wantToWatch: Boolean
    user: String!
  }
  type Query {
    welcome: String
    getMovies: [Movie]
    getMovie(id: ID): Movie
    getUser(id: ID): User
    getUserRating(id: ID): UserRating
  }
  type Mutation {
    addMovie(title: String, description: String): Movie
    deleteMovie(id: ID): String
    updateMovie(id: ID, title: String, description: String): Movie
    loginUser(LoginInput: LoginInput): User
    registerUser(registerInput: RegisterInput): User
    addGenre(genreInput: GenreInput): Genre
    updateUser(updateUserInput: UpdateUserInput): User
    addUserRating(userRatingInput: UserRatingInput): UserRating
  }
`;

export default typeDefs;
