import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, FlatList, Pressable, View, Button } from "react-native";
// import { gql, useQuery } from '@apollo/client';
// import { MOVIES_QUERY } from './graphql/Query';
import { fetchMovies } from "./store/movies";
import MovieCard from "./MovieSwipe/MovieCard";
import Loading from "./Loading";
import axios from "axios";

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
    <Pressable style={styles.item} onPress={onPress}>
      <Text style={styles.header}>{header}</Text>
      {!!subheader && <Text style={styles.subheader}>{subheader}</Text>}
    </Pressable>
  );
};

export default ({ navigation }) => {
  const [info, setInfo] = useState();
  // const { data, loading } = useQuery(MOVIES_QUERY);

  // if (loading) {
  //   return <Loading />
  // }
  const dispatch = useDispatch();

  const movies = useSelector((state) => {
    state.movies;
  });

  useEffect(() => {
    const getMovies = async () => {
      const res = await axios(`http://localhost:8080/api/movies`).catch(
        (err) => {
          console.log(err);
        }
      );
      // const res = dispatch(fetchMovies());
      setInfo(res.data);
    };

    getMovies();
  }, []);

  return (
    <View>
      <Button title="Vote" onPress={() => navigation.navigate("MovieCard")} />
      <FlatList
        // data={data.getMovies}
        data={info}
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
