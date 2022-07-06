import {gql} from '@apollo/client'

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