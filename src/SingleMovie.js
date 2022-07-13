import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
// import { SINGLE_MOVIES_QUERY } from "./graphql/Query";
// import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { fetchMovie } from "./store/movie";

import styles from "./styles";
import Loading from "./Loading";

export default ({ route }) => {
  const [data, setData] = useState();
  const [imdbUrl, setImdbUrl] = useState();
  const [title, setTitle] = useState();
  const [posterUrl, setPosterUrl] = useState("");
  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [thumbsUp, setThumbsUp] = useState(false);
  const [thumbsDown, setThumbsDown] = useState(false);
  const [seen, setSeen] = useState(false);
  const dispatch = useDispatch();
  // const singleMovie = useSelector((state) => state.movie);
  // console.log(singleMovie);

  useEffect(() => {
    // dispatch(fetchMovie(route.params.movie.id));
    const getMovie = async (id) => {
      const res = await axios
        .get(`http://localhost:8080/api/movies/${id}`)
        .catch((err) => {
          console.log(err);
        });
      // const res = dispatch(fetchMovies());

      setData(res.data);
      setImdbUrl(res.data.imdb_id);
      setTitle(res.data.title);
      // showMovies(res.data);
    };

    getMovie(route.params.movie.id);
  }, []);

  // const { data, loading } = useQuery(SINGLE_MOVIES_QUERY, {
  //   variables: { id: route.params.movie.id },
  // });

  // if (loading) {
  //   return <Loading />;
  // }

  const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
  const BASE_URL = "https://api.themoviedb.org/3";

  const API_URL =
    BASE_URL +
    `/find/${imdbUrl}?` +
    API_KEY +
    "&language=en-US&external_source=imdb_id";
  const IMG_URL = "https://image.tmdb.org/t/p/w500";

  function getMovie(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.length !== 0 && data.movie_results.length !== 0) {
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

  const starImgFilled =
    "https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true";
  const starImgEmpty =
    "https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true";

  const RatingBar = () => {
    return (
      <View style={iconstyles.ratingBar}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}
            >
              <Image
                style={iconstyles.stars}
                source={
                  item <= defaultRating
                    ? { uri: starImgFilled }
                    : { uri: starImgEmpty }
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const ThumbsUpHandler = () => {
    if (thumbsUp === false) {
      setThumbsDown(false);
    }
    setThumbsUp(!thumbsUp);
  };
  const ThumbsDownHandler = () => {
    if (thumbsDown === false) {
      setThumbsUp(false);
    }
    setThumbsDown(!thumbsDown);
  };
  const ThumbsRating = () => {
    return (
      <View style={iconstyles.ratingBar}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => ThumbsUpHandler()}>
          <FontAwesomeIcon
            icon={faThumbsUp}
            size={32}
            color={thumbsUp === true ? "green" : "grey"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => ThumbsDownHandler()}
        >
          <FontAwesomeIcon
            icon={faThumbsDown}
            size={32}
            color={thumbsDown === true ? "red" : "grey"}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const seenHandler = () => {
    setSeen(!seen);
  };

  return (
    <View style={iconstyles.imageContainer}>
      <Text style={styles.header}> {title}</Text>
      <Image style={iconstyles.image} source={{ uri: posterUrl }} />

      {seen === true ? (
        <View style={iconstyles.imageContainer}>
          <Text style={styles.header}>How did you like {title}?</Text>
          <View style={iconstyles.stars}>
            <RatingBar />
          </View>
          <Text style={styles.subheader}>Would you watch it again?</Text>
          <View style={iconstyles.thumbs}>
            <ThumbsRating />
          </View>
        </View>
      ) : (
        <Button
          style={styles.subheader}
          title="I've seen this movie"
          onPress={() => seenHandler()}
        />
      )}
    </View>
  );
};

const iconstyles = StyleSheet.create({
  stars: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  thumbs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 32,
  },
  image: {
    width: 300,
    height: 400,
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ratingBar: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
  },
});
