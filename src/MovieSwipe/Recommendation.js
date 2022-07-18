import React, { useState, useEffect } from "react";
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  Image,
  Dimensions,
} from "react-native";
import axios from "axios";


export default () => {
  const [data, setData] = useState();
  const [posterUrl, setPosterUrl] = useState("");
  const [description, setDescription] = useState();
  const [site, setSite] = useState("");
  const [imdbUrl, setImdbUrl] = useState();
  const [title, setTitle] = useState();


  useEffect(() => {
    const getMovie = async () => {
      const res = await axios
        .get(`http://localhost:8080/api/movies/11631`)
        .catch((err) => {
          console.log(err);
        });

      setData(res.data);
      setImdbUrl(res.data.imdb_id);
      setTitle(res.data.title);
      setDescription(res.data.description);
    };

    getMovie();
  }, []);

  const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
  const BASE_URL = "https://api.themoviedb.org/3";

  const API_URL =
    BASE_URL +
    `/find/${imdbUrl}?` +
    API_KEY +
    "&language=en-US&external_source=imdb_id";
  const IMG_URL = "https://image.tmdb.org/t/p/w500";
  const searchURL = BASE_URL + "/search/movie?" + API_KEY;

  function getMovie(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.length !== 0 && data.movie_results.length !== 0) {
          findStreaming();
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

  const findStreaming = () => {
    for (let keys in data) {
      if (data[keys] === true) {
        setSite(keys);
      }
    }
  };

  return (
    <View>
      <Text style={styles.header}>Your BoBo Recommendation:</Text>
      <View style={styles.imagecontainer}>
        <Text>{title}</Text>
        <Image style={styles.image} source={{ uri: posterUrl }} />
        <Text>{description}</Text>
        <Text>Available on: {site.toUpperCase()}</Text>
      </View>
    </View>
  );
};
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.6,
    height: height * 0.5,
  },
  imagecontainer: {

    height: height * 0.8,
    textAlign: "center",
    borderWidth: 10,
    borderColor: "darkolivegreen",
    borderRadius: 8,
    backgroundColor: "darkseagreen",

    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
});
