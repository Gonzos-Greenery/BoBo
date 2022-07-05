import {gql} from '@apollo/client'

export const MOVIES_QUERY = gql`
{
  getMovies{
    id
    title
    description
  }
}`

// export const USER_QUERY = gql`
// {
//   getUser{
//     id
//     name
//     username
//     email 
//     password
//     hulu
//     netflix
//     prime
//     disney
//     hbo
//   }
// `

// export const MOVIES_QUERY = gql`
//   query Movies {
//     movies {
//       id
//       title
//       description
//     }
//   }
// `
