import {gql} from '@apollo/client'

export const MOVIES_QUERY = gql`
{
  getMovies{
    id
    title
    description
  }
}`

// export const MOVIES_QUERY = gql`
//   query Movies {
//     movies {
//       id
//       title
//       description
//     }
//   }
// `
