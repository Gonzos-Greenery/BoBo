import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { SINGLE_MOVIES_QUERY } from "./graphql/Query";
import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles";
import Loading from "./Loading";

const iconstyles = StyleSheet.create({
  stars: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    display: "inline-block",
    margin: 25
  },
  text: {
    fontWeight: "bold",
    fontSize: 32,
  },
  image: {
    width: 300,
    height: 400,
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ({ route }) => {
  const [posterUrl, setPosterUrl] = useState("");
  const { data, loading } = useQuery(SINGLE_MOVIES_QUERY, {
    variables: { id: route.params.movie.id },
  });

  if (loading) {
    return <Loading />;
  }
  const imdbId = data.getMovie.imdb_id;

  const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
  const BASE_URL = "https://api.themoviedb.org/3";

  const API_URL =
    BASE_URL +
    `/find/${imdbId}?` +
    API_KEY +
    "&language=en-US&external_source=imdb_id";
  const IMG_URL = "https://image.tmdb.org/t/p/w500";
  const searchURL = BASE_URL + "/search/movie?" + API_KEY;

  function getMovie(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.length !== 0) {
          return showMovies(data.movie_results[0]);
        }
      });
  }

  function showMovies(data) {
    const { poster_path } = data;
    setPosterUrl(
      `${
        poster_path
          ? IMG_URL + poster_path
          : "http://via.placeholder.com/1080x1580"
      }`
    );
  }

  getMovie(API_URL);

  return (
    <View style={iconstyles.imageContainer}>
      <Text style={styles.header}>How did you like {data.getMovie.title}?</Text>
      <Image style={iconstyles.image} source={{ uri: posterUrl }} />

      <View style={iconstyles.stars}>
        <FontAwesomeIcon icon={faStar} size={32} color={"grey"} />
        <FontAwesomeIcon icon={faStar} size={32} color={"grey"} />
        <FontAwesomeIcon icon={faStar} size={32} color={"grey"} />
        <FontAwesomeIcon icon={faStar} size={32} color={"grey"} />
        <FontAwesomeIcon icon={faStar} size={32} color={"grey"} />
      </View>
      <Text style={styles.subheader}>Would you watch it again?</Text>
      <View style={iconstyles.thumbs}>
        <FontAwesomeIcon icon={faThumbsUp} size={32} color={"green"} />
        <FontAwesomeIcon icon={faThumbsDown} size={32} color={"red"} />
      </View>
    </View>
  );
};
