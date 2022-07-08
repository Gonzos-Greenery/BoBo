import { gql } from '@apollo/client';

export const REGISTER_USER_MUTATION = gql`

  mutation RegisterUser( $registerInput: RegisterInput) {
    registerUser (registerInput: $registerInput ){
      id
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
    }
  }
`
