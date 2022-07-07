import { gql } from '@apollo/client';

export const ADD_GENRE_MUTATION = gql`
  mutation addGenre {
    addGenre {
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
