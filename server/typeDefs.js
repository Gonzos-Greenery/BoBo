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
<<<<<<< HEAD
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
=======
>>>>>>> 13503d97d548ce245da051c978b9337e5e54a619
  input RegisterInput {
    name: String
    username: String
    email: String
    password: String
  }
<<<<<<< HEAD
=======

>>>>>>> 13503d97d548ce245da051c978b9337e5e54a619
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

    updateUser(updateUserInput: UpdateUserInput): User
>>>>>>> 13503d97d548ce245da051c978b9337e5e54a619
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
