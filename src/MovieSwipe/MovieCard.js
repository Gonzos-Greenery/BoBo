import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Dimensions,
} from "react-native";
import bo from "../../assets/bo.jpg";
import lobo from "../../assets/lobo.jpg";
import MovieCardItem from "./MovieCardItem";
import MovieFooter from "./MovieFooter";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSkull,
  faStar,
  faX,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

let cardPics = [bo, lobo];

const MovieCard = ({ navigation }) => {
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

  return (
    <View style={styles.wrapper}>
      {/* <Text>Waiting for everyone to finish voting...</Text> */}

      <View style={styles.cardMain}>
        <View style={styles.noMoreWrapper}>
          <View style={styles.noMoreText}></View>
        </View>
        {/* <View style={styles.swipesContainer}>
          {cardPics.map((pic) => {
            return <MovieCardItem card={pic} key={pic} />;
          })} */}
          <View style={styles.swipesContainer}>
          {movieArr.map((movie) => {
            return <MovieCardItem card={movie} key={movie.id} />;
          })}
        </View>
      </View>
      <Button
        title="Done Voting? Start the Party!"
        onPress={() => navigation.navigate("Recommendation")}
      />
      <MovieFooter />
    </View>
  );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    overflow: "hidden",
  },
  cardMain: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    width: width,
    height: height * 0.8,
  },
  noMoreWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  noMoreText: {
    color: "white",
  },
  swipesContainer: {
    width: width,
    height: height,
  },
});

export default MovieCard;
