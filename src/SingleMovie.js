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
import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import styles from "./styles";
import Loading from "./Loading";
import { registerUpdateWatched } from "./store/user";
import { fetchMovies } from "./store/movies";

export default ({ route, navigation }) => {
  const [userID, setUserID] = useState();
  const [data, setData] = useState();
  const [imdbUrl, setImdbUrl] = useState();
  const [title, setTitle] = useState();
  const [posterUrl, setPosterUrl] = useState("");
  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [thumbsUp, setThumbsUp] = useState(false);
  const [thumbsDown, setThumbsDown] = useState(false);
  const [updatedRating, setUpdatedRating] = useState(0);
  const [userRatingID, setUserRatingID] = useState();
  const [seen, setSeen] = useState(false);
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((state) => {
    return state
})
  const starImgFilled =
    "https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true";
  const starImgEmpty =
    "https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true";
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
    const getUser = async (username) => {
      const res = await axios
        .get(`http://localhost:8080/api/users/username/${username}`)
        .catch((err) => {
          console.log(err);
        });

      setUserID(res.data.id);
    };
    getUser(store.auth.username);
    getMovie(route.params.movie.id);
  }, []);

  const getUserRating = async (userid, movieid) => {
    const res = await axios
      .get(`http://localhost:8080/api/userRating/${userid}/${movieid}`)
      .catch((err) => {
        console.log(err);
      });
    if (res && res.data[0]) {
      setUserRatingID(res.data[0].id);
      setUpdate(true);
      setDefaultRating(res.data[0].rating);
      if (res.data[0].watchAgain === true) {
        setThumbsUp(true);
      } else if (res.data[0].watchAgain === false) {
        setThumbsDown(true);
      }
    }
  };
  getUserRating(userID, route.params.movie.id);

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

  const handleRatingBar = (item) => {
    if (defaultRating === 0) {
      setDefaultRating(item);
    } else {
      setUpdatedRating(item);
    }
  };
  const RatingBar = () => {
    return (
      <View style={iconstyles.ratingBar}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => handleRatingBar(item)}
            >
              {!update ? (
                <Image
                  style={iconstyles.stars}
                  source={
                    item <= defaultRating
                      ? { uri: starImgFilled }
                      : { uri: starImgEmpty }
                  }
                />
              ) : (
                <Image
                  style={iconstyles.stars}
                  source={
                    item <= defaultRating
                      ? { uri: starImgFilled }
                      : { uri: starImgEmpty }
                  }
                />
              )}
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
    dispatch(registerUpdateWatched(userID, [route.params.movie.id]))
  };

  const submitHandler = () => {
    let thumbsRating = null;
    if (thumbsDown) {
      thumbsRating = false;
    }
    if (thumbsUp) {
      thumbsRating = true;
    }
    // addUserRating(userID, route.params.movie.id, defaultRating);
    const updateRating = async () => {
      if (update === false) {
        await axios
          .post(
            `http://localhost:8080/api/userRating/${userID}/${route.params.movie.id}`,
            {
              rating: defaultRating,
              watchAgain: thumbsRating,
            }
          )
          .catch((err) => {
            console.log(err);
          });
      } else {
        await axios
          .put(
            `http://localhost:8080/api/userRating/${userID}/${route.params.movie.id}/${userRatingID}`,
            {
              rating: updatedRating,
              watchAgain: thumbsRating,
            }
          )
          .catch((err) => {
            console.log(err);
          });
      }
    };
    updateRating();
    navigation.navigate("Movies");
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
          <Button
            style={styles.subheader}
            title="Submit"
            onPress={() => submitHandler()}
          />
        </View>
      ) : (
          <View 
          style={styles.subheader}>
            <Button
            title="I've seen this movie"
            onPress={() => seenHandler()}
            />
            <Text style={{marginTop: 10}}>{route.params.movie.description}</Text>
          </View>
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
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 2,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 20
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
