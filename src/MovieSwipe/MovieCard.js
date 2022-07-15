import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { addPartyRating } from "../store/partyRatings";

const MovieCard = ({ navigation }) => {
  const [movieArr, setMovieArr] = useState([]);
  const store = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    setMovieArr(store.movies.all.slice(20, 29));
  }, []);

  const dispatch = useDispatch();
  console.log(store);

  const userId = store.auth.id;
  const onSwipe = async (dir, movieId) => {
    if (dir === "right") {
      dispatch(addPartyRating(store.party.id, userId, movieId, 3));
    }
    if (dir === "left") {
      dispatch(addPartyRating(store.party.id, userId, movieId, 2));
    }
    if (dir === "up") {
      dispatch(addPartyRating(store.party.id, userId, movieId, 4));
    }
    if (dir === "down") {
      dispatch(addPartyRating(store.party.id, userId, movieId, 1));
    }
  };

  const handleSwipe = async () => {
    console.log("Hello there");
  };

  const swipe = async (dir) => {
    // const cardsLeft =
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.cardMain}>
        <View style={styles.noMoreWrapper}>
          <View style={styles.noMoreText}></View>
        </View>

        <View style={styles.swipesContainer}>
          {movieArr.map((movie) => {
            // return <MovieCardItem card={movie} key={movie.id} />;
            return (
              <TinderCard
                onSwipe={(dir) => onSwipe(dir, movie.id)}
                key={movie.id}
              >
                <View style={styles.tinderCardWrapper}>
                  <View style={styles.imagecontainer}>
                    <Text style={styles.header}>{movie.title}</Text>
                    <Image
                      style={styles.image}
                      source={{
                        uri: movie.image,
                      }}
                    />
                  </View>
                </View>
              </TinderCard>
            );
          })}
        </View>
      </View>
      <Button onPress={() => handleSwipe()} title="Swipe left!" />
      <Button onPress={() => handleSwipe()} title="Swipe right!" />
      <Button
        title="Done Voting? Start the Party!"
        onPress={() =>
          navigation.navigate("Recommendation", { movieArr: movieArr })
        }
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
    height: height * 0.7,
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
  tinderCardWrapper: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    overflow: "hidden",
  },
  imagecontainer: {
    width: width * 0.8,
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
    width: width * 0.6,
    height: height * 0.4,
  },
  header: {
    flexWrap: "wrap",
    overflow: "hidden",
    width: width * 0.5,
  },
});

export default MovieCard;
