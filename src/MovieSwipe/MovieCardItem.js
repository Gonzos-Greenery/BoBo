import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import MovieFooter from "./MovieFooter";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSkull,
  faStar,
  faX,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const MovieCardItem = (card) => {
  const [posterUrl, setPosterUrl] = useState([]);
  const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMG_URL = "https://image.tmdb.org/t/p/w500";

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
  useEffect(() => {
    showMovies(card.card);
  }, []);

  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={faStar} size={32} color={"green"} />

      <View style={styles.middleRow}>
        <FontAwesomeIcon icon={faX} size={32} color={"green"} />

        <View style={styles.imagecontainer}>
          <View style={styles.noMoreWrapper}>
            <Text style={styles.noMoreText}>Start the party!</Text>
          </View>
          <View style={styles.swipesContainer}>
            <TinderCard>
              {/* <Text style={styles.header}>{card.card.title}</Text> */}
              <Text style={styles.header}>{card.card}</Text>
              <Image
                style={styles.image}
                source={{
                  uri: card.card,
                  // uri: posterUrl
                }}
              />
            </TinderCard>
          </View>
        </View>
        <FontAwesomeIcon icon={faHeart} size={32} color={"green"} />
      </View>

      <FontAwesomeIcon icon={faSkull} size={32} color={"green"} />
      <MovieFooter />
    </View>
  );
};
export default MovieCardItem;

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  imagecontainer: {
    // width: width * 0.5,
    // height: height * 0.8,
    textAlign: "center",
    borderWidth: 10,
    borderColor: "darkolivegreen",
    borderRadius: 8,
    backgroundColor: "darkseagreen",
    position: "relative",
    overflow: "hidden",
    padding: 30,
  },
  image: {
    width: width * 0.3,
    height: height * 0.5,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  middleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  noMoreText: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  noMoreWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  swipesContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
