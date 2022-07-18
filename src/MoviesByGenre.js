import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const MoviesByGenre = () => {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_URL =
    BASE_URL +
    "find/{external_id}?" +
    API_KEY +
    "&language=en-US&external_source=imdb_id";
  const IMG_URL = "https://image.tmdb.org/t/p/w500";
  const searchURL = BASE_URL + "/search/movie?" + API_KEY;

  const styles = StyleSheet.create({
    text: {
      fontWeight: "bold",
      fontSize: 32,
    },
    image: {
      width: 300,
      height: 400,
    },
  });

  getMovies(API_URL);
  function getMovies(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <View>
      <Text style={styles.text}>Hello there</Text>

    </View>
  );
};

export default MoviesByGenre;
