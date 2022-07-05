import {gql} from '@apollo/client'

export const MOVIES_QUERY = gql`
{
  getMovies{
    id
    title
    description
  }
}`

export const USER_QUERY = gql`
{
  getUser(id: ID){
    id
    name
    username
    password
    hulu
    netflix
    prime
    disney
    hbo
  }
`

// export const MOVIES_QUERY = gql`
//   query Movies {
//     movies {
//       id
//       title
//       description
//     }
//   }
// `
