import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import TinderCard from "react-tinder-card";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import bo from "../../assets/bo.jpg";
import lobo from "../../assets/lobo.jpg";
import { addPartyRating } from "../store/partyRatings";
import { fetchPartyMovies } from "../store/partyMovies";
import { fetchPartyRatings } from "../store/partyRatings";

const alreadyRemoved = [];

const MovieCard = ({ navigation }) => {
  const [empty, setEmpty] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const hateopacity = useState(new Animated.Value(0))[0];
  const dislikeopacity = useState(new Animated.Value(0))[0];
  const likeopacity = useState(new Animated.Value(0))[0];
  const loveopacity = useState(new Animated.Value(0))[0];

  const store = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  const userId = store.auth.id;

  function fade(opacity) {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }

  useEffect(() => {
    dispatch(fetchPartyRatings());
    dispatch(fetchPartyMovies(store.party.users));
  }, []);

  useEffect(() => {
    haveVoted();
  }, [store]);

  const haveVoted = () => {
    let id = store.auth.id;
    let partyId = store.party.id;
    let voted = store.partyRatings.filter(
      (rating) => rating.userId === id && rating.partyId === partyId
    );
    if (voted.length >= 10) {
      setHasVoted(true);
    } else {
      setHasVoted(false);
    }
  };

  const childRefs = useMemo(
    () =>
      Array(store.partyMovies.length)
        .fill(0)
        .map((i) => React.createRef()),
    [store.partyMovies]
  );

  const swipe = async (dir) => {
    const cardsLeft = store.partyMovies.filter(
      (movie) => !alreadyRemoved.includes(movie.id)
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].id;
      const index = store.partyMovies
        .map((movie) => movie.id)
        .indexOf(toBeRemoved);
      if (childRefs[index] && childRefs[index].current.swipe) {
        await childRefs[index].current.swipe(dir);
      }
    }
  };

  const onSwipe = async (dir, movieId) => {
    alreadyRemoved.push(movieId);

    if (dir === "right") {
      fade(likeopacity);
      dispatch(addPartyRating(store.party.id, userId, movieId, 3));
    }
    if (dir === "left") {
      fade(dislikeopacity);
      dispatch(addPartyRating(store.party.id, userId, movieId, 2));
    }
    if (dir === "up") {
      fade(loveopacity);
      dispatch(addPartyRating(store.party.id, userId, movieId, 4));
    }
    if (dir === "down") {
      fade(hateopacity);
      dispatch(addPartyRating(store.party.id, userId, movieId, 1));
    }
    if (alreadyRemoved.length === 10) {
      setEmpty(true);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <View style={styles.cardMain}>
          <View style={styles.swipesContainer}>
            {store.partyMovies.map((movie, index) => {
              return (
                <TinderCard
                  ref={childRefs[index]}
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
                      <Text
                        numberOfLines={5}
                        ellipsizeMode="tail"
                        style={styles.header}
                      >
                        {movie.description}
                      </Text>
                    </View>
                  </View>
                </TinderCard>
              );
            })}
          </View>
        </View>
        {!hasVoted ? (
          <View>
            <View>
              <View style={styles.buttonWrapper}>
                <View style={styles.buttonColumn}>
                  <Animated.Text
                    style={{
                      opacity: hateopacity,
                      padding: 10,
                      color: "red",
                      fontSize: 30,
                    }}
                  >
                    -2
                  </Animated.Text>
                  <TouchableOpacity
                    style={styles.hate}
                    onPress={() => swipe("down")}
                  >
                    <Text style={{ color: "white" }}>HATE</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonColumn}>
                  <Animated.Text
                    style={{
                      opacity: dislikeopacity,
                      padding: 10,
                      color: "red",
                      fontSize: 30,
                    }}
                  >
                    -1
                  </Animated.Text>
                  <TouchableOpacity
                    style={styles.dislike}
                    onPress={() => swipe("left")}
                  >
                    <Text style={{ color: "white" }}>DISLIKE</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonColumn}>
                  <Animated.Text
                    style={{
                      opacity: likeopacity,
                      padding: 10,
                      color: "limegreen",
                      fontSize: 30,
                    }}
                  >
                    +1
                  </Animated.Text>
                  <TouchableOpacity
                    style={styles.like}
                    onPress={() => swipe("right")}
                  >
                    <Text style={{ color: "black" }}>LIKE</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonColumn}>
                  <Animated.Text
                    style={{
                      opacity: loveopacity,
                      padding: 10,
                      color: "limegreen",
                      fontSize: 30,
                    }}
                  >
                    +2
                  </Animated.Text>
                  <TouchableOpacity
                    style={styles.love}
                    onPress={() => swipe("up")}
                  >
                    <Text style={{ color: "black" }}>LOVE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.rec}
              onPress={() =>
                navigation.navigate("PartyView", { id: store.party.id })
              }
            >
              <Text style={{ color: "black" }}>You've Finished Voting</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  tag: {
    position: "absolute",
    top: -55,
    transform: "translateX(-50)",
    fontSize: 50,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonColumn: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  love: {
    backgroundColor: "#CEE9C5",
    padding: 10,
    borderRadius: 13,
  },
  like: {
    backgroundColor: "#A4C69C",
    padding: 10,
    borderRadius: 13,
  },
  dislike: {
    backgroundColor: "#8A9D8C",
    padding: 10,
    borderRadius: 13,
  },
  hate: {
    backgroundColor: "#404746",
    padding: 10,
    borderRadius: 13,
  },
  rec: {
    width: width,
    color: "black",
    height: 55,
    borderRadius: 10,
    backgroundColor: "#d5e7d0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  wrapper: {
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "grey",
    height: height,
  },
  cardMain: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height * 0.74,
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
    height: height * 0.7,
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
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: "contain",
  },
  header: {
    flexWrap: "wrap",
    overflow: "hidden",
    width: width * 0.5,
  },
});

export default MovieCard;
