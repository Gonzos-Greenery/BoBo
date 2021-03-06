import {gql} from '@apollo/client'

export const MOVIES_QUERY = gql`
{
  getMovies{
    id
    title
    description
    imdb_id
    genres
    imdb_score
    production_countries
    release_year
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

/
