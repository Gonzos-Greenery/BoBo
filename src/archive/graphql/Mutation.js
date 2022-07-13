import { gql } from '@apollo/client';

export const ADD_GENRE_MUTATION = gql`
  mutation AddGenre($genreInput: GenreInput) {
    addGenre(genreInput: $genreInput) {
      action
      animation
      comedy
      crime
      documentation
      drama
      european
      family
      fantasy
      history
      horror
      music
      romance
      scifi
      thriller
      war
      western
    }
  }
`;
export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      id
      name
      username
      email
      password
    }
  }
`;


export const LOGIN_AUTH = gql`
mutation LoginUser($loginInput: LoginInput) {
    loginUser(LoginInput: $loginInput) {
      name
      username
      email
      hulu
      netflix
      prime
      disney
      hbo
      watched
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      name
      username
      password
      email
      hulu
      netflix
      prime
      disney
      hbo
    }
  }
`;

export const ADD_WATCHED = gql`
mutation AddWatched($addWatched: AddWatched) {
  addWatched(addWatched: $addWatched) {
    id,
    username,
    watched
  }
}
`