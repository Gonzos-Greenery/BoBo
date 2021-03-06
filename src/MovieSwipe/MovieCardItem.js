import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

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
    <TinderCard>
      <View style={styles.tinderCardWrapper}>
        <View style={styles.imagecontainer}>
          <Text style={styles.header}>{card.card.original_title}</Text>
          {/* <Text style={styles.header}>{card.card}</Text> */}
          <Image
            style={styles.image}
            source={{
              // uri: card.card,
              uri: posterUrl,
            }}
          />
        </View>
      </View>
    </TinderCard>
  );
};
export default MovieCardItem;

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  tinderCardWrapper: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    overflow: "hidden",
  },
  imagecontainer: {
    width: width * 0.7,
    height: height * 0.6,
    textAlign: "center",
    borderWidth: 10,
    borderColor: "darkolivegreen",
    borderRadius: 8,
    backgroundColor: "darkseagreen",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    overflow: "hidden",
    padding: 30,
  },
  image: {
    width: width * 0.5,
    height: height * 0.4,
  },
  header: {
    flexWrap: "wrap",
    overflow: "hidden",
    width: width * 0.5,
  },
});
