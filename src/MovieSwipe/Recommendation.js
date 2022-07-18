import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  Image,
  Dimensions,
} from "react-native";
import { fetchPartyRatings } from "../store/partyRatings";
import axios from "axios";
import Loading from "../Loading";


export default (route) => {

  const dispatch = useDispatch();
  const store = useSelector((state) => {
    return state;
  });
  const [ratingArr, setRatingArr] = useState([]);
  const [movieId, setMovieId] = useState();
  const [movieObj, setMovieObj] = useState({});
  const [isBusy, setBusy] = useState(true);
  const [site, setSite] = useState();

  useEffect(() => {
    const getRatings = async (partyId) => {
      const res = await axios
        .get(`https://bobo-server.herokuapp.com/api/partyrating/${partyId}`)
        .catch((err) => {
          console.log(err);
        });
      setRatingArr(res.data);
    };
    dispatch(fetchPartyRatings());
    getRatings(store.party.id);
  }, []);

  const findRating = (array) => {
    let scoreTable = {};
    array.map((rating) => {
      if (!scoreTable[rating.movieId]) {
        scoreTable[rating.movieId] = rating.rating;
      } else {
        scoreTable[rating.movieId] += rating.rating;
      }
    });
    const maxValue = Object.entries(scoreTable).sort((x, y) => y[1] - x[1])[0];
    if (maxValue) {
      setMovieId(Number(maxValue[0]));
    }
  };

  useEffect(() => {
    findRating(ratingArr);
  }, [ratingArr]);

  // useEffect(() => {
  //   findRating(store.partyRatings);
  // }, [store]);

  const findMovie = (array, id) => {
    array.some((el) => {
      if (el.id === id) {
        setMovieObj(el);
      }
    });
  };

  useEffect(() => {
    findMovie(store.movies.all, movieId);
  }, [movieId]);

  const findStreaming = (array) => {
    for (let keys in array) {
      if (array[keys] === true) {
        setSite(keys.toUpperCase());
      }
    }
  };

  useEffect(() => {
    findStreaming(movieObj);
    setBusy(false);
  }, [movieObj]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Your BoBo Recommendation:</Text>
      <View style={styles.imagecontainer}>
        {isBusy ? (
          <Loading />
        ) : (
          <View style={styles.moviewrapper}>
            <Text>{movieObj.title}</Text>
            <Image style={styles.image} source={{ uri: movieObj.image }} />
            <Text style={styles.header}>{movieObj.description}</Text>
            <Text>Available on: {site}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  moviewrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height * .9,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    overflow: "hidden",
    width: width * 0.6,
  },
  image: {
    flex: 1,
    height: height * 0.6,
    width: width * 0.7,
    resizeMode: "contain",
  },
  imagecontainer: {
    width: width,
    height: height,
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
