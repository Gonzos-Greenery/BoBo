import { gql } from '@apollo/client';

export const REGISTER_USER_MUTATION = gql`

  mutation RegisterUser( $registerInput: RegisterInput) {
    registerUser (registerInput: $registerInput ){
      id
      name
      username
      email
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
`
