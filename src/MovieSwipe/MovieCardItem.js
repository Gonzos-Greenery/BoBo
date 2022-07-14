import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TinderCard from "react-tinder-card";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSkull,
  faStar,
  faX,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { addPartyRating } from "../store/partyRatings";
const MovieCardItem = (card) => {
  const dispatch = useDispatch();
  const [posterUrl, setPosterUrl] = useState([]);
  const store = useSelector((state) => {
    return state;
  });
  const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMG_URL = "https://image.tmdb.org/t/p/w500";

  // function showMovies(data) {
  //   const { poster_path } = data;
  //   setPosterUrl(
  //     `${
  //       poster_path
  //         ? IMG_URL + poster_path
  //         : "http://via.placeholder.com/1080x1580"
  //     }`
  //   );
  // }
  const movieId = card.card.id;
  const userId = store.auth.id;

  useEffect(() => {
    // showMovies(card.card);
    setPosterUrl(card.card.image);
  }, []);

  const onSwipe = async (dir) => {
    if (dir === "right") {
      // dispatch(addPartyRating(1, userId, movieId, 3));
      await axios
        .post(
          `http://localhost:8080/api/partyrating/add/${movieId}/1/${userId}`,
          {
            rating: 3,
          }
        )
        .catch((err) => {
          console.log(err);
        });
    }
    if (dir === "left") {
      // dispatch(addPartyRating(1, userId, movieId, 2));
      await axios
        .post(
          `http://localhost:8080/api/partyrating/add/${movieId}/1/${userId}`,
          {
            rating: 2,
          }
        )
        .catch((err) => {
          console.log(err);
        });
    }
    if (dir === "up") {
      // dispatch(addPartyRating(1, userId, movieId, 4));
      await axios
        .post(
          `http://localhost:8080/api/partyrating/add/${movieId}/1/${userId}`,
          {
            rating: 4,
          }
        )
        .catch((err) => {
          console.log(err);
        });
    }
    if (dir === "down") {
      // dispatch(addPartyRating(1, userId, movieId, 1));
      await axios
        .post(
          `http://localhost:8080/api/partyrating/add/${movieId}/1/${userId}`,
          {
            rating: 1,
          }
        )
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <TinderCard onSwipe={onSwipe}>
      <View style={styles.tinderCardWrapper}>
        <View style={styles.imagecontainer}>
          <Text style={styles.header}>{card.card.title}</Text>
          <Image
            style={styles.image}
            source={{
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
