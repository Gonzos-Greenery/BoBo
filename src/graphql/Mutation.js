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
    }
  }
`;

export const LoginAuth = gql`
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
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput) {
    updateUser(UpdateUserInput: $updateUserInput) {
      name
      username
      email
      hulu
      netflix
      prime
      disney
      hbo
    }
  }
`;
