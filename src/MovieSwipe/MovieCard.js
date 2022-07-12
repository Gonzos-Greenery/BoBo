import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { StyleSheet, Text, View, Image } from "react-native";
import bo from "../../assets/bo.jpg";
import lobo from "../../assets/lobo.jpg";
import MovieCardItem from "./MovieCardItem";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSkull,
  faStar,
  faX,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

let cardPics = [bo, lobo];

const MovieCard = () => {
  const [movieArr, setMovieArr] = useState([]);

  const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_URL =
    BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;

  const searchURL = BASE_URL + "/search/movie?" + API_KEY;

  function getMovies(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // showMovies(data.results);
        setMovieArr(data.results);
      });
  }
  useEffect(() => {
    getMovies(API_URL);
  }, []);

  // console.log("movie array is", movieArr);
  // console.log("picture urls are", posterUrl);

  return (
    <View>
      {/* <View style={{ flex: 1, flexBasis: 100 }}>
        <View style={styles.star}>
          <FontAwesomeIcon icon={faStar} size={32} color={"green"} />
        </View>
      </View>

      <View style={{ flex: 2, flexBasis: 500 }}>
        <View style={styles.ex}>
          <FontAwesomeIcon icon={faX} size={32} color={"green"} />
        </View> */}
      <View style={styles.container}>
        {cardPics.map((pic) => {
          return <MovieCardItem card={pic} key={pic} />;
        })}
        {/* <View style={styles.container}>
          {movieArr.map((movie) => {
            return <MovieCardItem card={movie} key={movie.id} />;
          })} */}
      </View>
      {/* <View style={styles.heart}>
          <FontAwesomeIcon icon={faHeart} size={32} color={"green"} />
        </View>
      </View>

      <View style={{ flex: 3, flexBasis: 100 }}>
        <View style={styles.skull}>
          <FontAwesomeIcon icon={faSkull} size={32} color={"green"} />
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "green",
  },
  heart: {
    flexDirection: "row",
    justifyContent: "right",
    alignItems: "right",
  },
  skull: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
  },
  star: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ex: {
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "left",
  },
});

export default MovieCard;
