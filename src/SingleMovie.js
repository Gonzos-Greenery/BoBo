import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { SINGLE_MOVIES_QUERY } from "./graphql/Query";
import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles";
import Loading from "./Loading";

const iconstyles = StyleSheet.create({
  stars: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 32,
  },
  image: {
    width: 300,
    height: 400,
  },
});

export default ({ route }) => {
  // const [posterUrl, setPosterUrl] = useState("");
  // useEffect(() => {
  //   function getMovie(url) {
  //     fetch(url, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data.movie_results[0]);
  //         if (data.movie_results.length !== 0) {
  //           const poster_path = data.movie_results[0].poster_path;
  //           setPosterUrl(IMG_URL + poster_path);
  //           console.log(posterUrl);
  //         }
  //       });
  //   }
  //   getMovie(API_URL);
  //   console.log(posterUrl);
  // }, []);

  const { data, loading } = useQuery(SINGLE_MOVIES_QUERY, {
    variables: { id: route.params.movie.id },
  });

  if (loading) {
    return <Loading />;
  }
  const imdbId = data.getMovie.imdb_id;

  const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
  const BASE_URL = "https://api.themoviedb.org/3";
  // const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
  const API_URL =
    BASE_URL +
    `/find/${imdbId}?` +
    API_KEY +
    "&language=en-US&external_source=imdb_id";
  const IMG_URL = "https://image.tmdb.org/t/p/w500";
  const searchURL = BASE_URL + "/search/movie?" + API_KEY;

  getMovie(API_URL);
  function getMovie(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.movie_results[0]);
        if (data.movie_results.length !== 0) {
          showMovies(data.movie_results[0]);
        }
      });
  }

  let posterUrl = "";

  function showMovies(data) {
    const { poster_path } = data;

    posterUrl = `${
      poster_path
        ? IMG_URL + poster_path
        : "http://via.placeholder.com/1080x1580"
    }`;

    if (posterUrl.length > 1) {
      console.log(posterUrl);
      return <Image style={iconstyles.image} source={{ uri: posterUrl }} />;
    }
  }

  return (
    <View style={styles.item}>
      <Text style={styles.header}>How did you like {data.getMovie.title}?</Text>
      <Text>{data.getMovie.description}</Text>
      <Image style={iconstyles.image} source={{ uri: posterUrl }} />
      <View style={iconstyles.stars}>
        <FontAwesomeIcon icon={faStar} size={32} color={"yellow"} />
        <FontAwesomeIcon icon={faStar} size={32} color={"yellow"} />
        <FontAwesomeIcon icon={faStar} size={32} color={"yellow"} />
        <FontAwesomeIcon icon={faStar} size={32} color={"yellow"} />
        <FontAwesomeIcon icon={faStar} size={32} color={"grey"} />
      </View>
    </View>
  );
};
