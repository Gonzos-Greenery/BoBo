import { gql } from '@apollo/client';

<<<<<<< HEAD
export const ADD_GENRE_MUTATION = gql`
  mutation addGenre {
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
`;
=======
export const REGISTER_USER_MUTATION = gql`

  mutation RegisterUser( $registerInput: RegisterInput) {
    registerUser (registerInput: $registerInput ){
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
`
>>>>>>> 84910115771ee9b08716ca9b3c8cb0dc3c724bee
