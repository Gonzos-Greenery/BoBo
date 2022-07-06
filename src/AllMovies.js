import React from "react";
import { Text, FlatList, Pressable, View, Button } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { MOVIES_QUERY } from "./graphql/Query";
import MovieCard from "./MovieSwipe/MovieCard";
import Loading from './Loading'

import styles from "./styles";

const MovieItem = ({ movie, onPress }) => {
  const { title, description } = movie;
  let header, subheader;

  if (title) {
    header = `Title ${title}`;
    subheader = description;
  } else {
    header = description;
  }

  return (
    <Pressable style={styles.item} onPress={onPress} >
      <Text style={styles.header}>{header}</Text>
      {!!subheader && <Text style={styles.subheader}>{subheader}</Text>}
    </Pressable>
  );
};

export default ({ navigation }) => {
  const { data, loading } = useQuery(MOVIES_QUERY);

  if (loading) {
    return <Loading />
  }

  return (
    <View>
      <Button title="Vote" onPress={() => navigation.navigate("MovieCard")} />
      <FlatList
        data={data.getMovies}
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            onPress={() => navigation.navigate("SingleMovie", { movie: item })}
          />
        )}
        keyExtractor={(movie) => movie.id.toString()}
      />
    </View>
  );
};
