import {gql} from '@apollo/client'

export const MOVIES_QUERY = gql`
{
  getMovies{
    id
    title
    description
    imdb_id
    genres
  }
}`

export const SINGLE_MOVIES_QUERY = gql`
query getMovie($id: ID)
{
  getMovie (id: $id){
    id
    title
    description
    imdb_id
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
