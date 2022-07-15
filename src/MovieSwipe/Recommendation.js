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
// import { gql, useQuery } from "@apollo/client";
// import { SINGLE_MOVIES_QUERY } from "../graphql/Query";
// import Loading from "../Loading";

export default (route) => {
  // const {movieArr} = useParams(route)
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
        .get(`http://localhost:8080/api/partyrating/${partyId}`)
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
          <View>
            <Text>{movieObj.title}</Text>
            <Image style={styles.image} source={{ uri: movieObj.image }} />
            <Text>{movieObj.description}</Text>
          </View>
        )}
        <Text>Available on: {site}</Text>
      </View>
    </View>
  );
};
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.6,
    height: height * 0.5,
  },
  imagecontainer: {
    // width: width * 0.5,
    height: height * 0.8,
    textAlign: "center",
    borderWidth: 10,
    borderColor: "darkolivegreen",
    borderRadius: 8,
    backgroundColor: "darkseagreen",
    // position: "relative",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
});
