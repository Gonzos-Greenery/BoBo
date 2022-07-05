import React from 'react';
import { Text, FlatList, Pressable, View } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { MOVIES_QUERY } from './graphql/Query';

import Loading from './Loading';
import styles from './styles';

const MovieItem = ({ movie }) => {
  const { title, description } = movie;
  let header, subheader;

  if (title) {
    header = `Title ${title}`;
    subheader = description;
  } else {
    header = description;
  }

  return (
    <Pressable style={styles.item}>
      <Text style={styles.header}>{header}</Text>
      {!!subheader && <Text style={styles.subheader}>{subheader}</Text>}
    </Pressable>
  );
};

export default () => {
  const { data, loading } = useQuery(MOVIES_QUERY);

  if (loading) {
    return <Loading />;
  } else {
    console.log(data.getMovies[0]);
  }

  return (
    <FlatList
      data={data.getMovies}
      renderItem={({ item }) => <MovieItem movie={item} />}
      keyExtractor={(movie) => movie.id.toString()}
    />
  );
};
