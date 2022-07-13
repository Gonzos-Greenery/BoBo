import React from "react";
import TinderCard from "react-tinder-card";
import { StyleSheet, Text, View, Image } from "react-native";
import bo from "../../assets/bo.jpg";
import lobo from "../../assets/lobo.jpg";
import MovieCardItem from "./MovieCardItem";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSkull,
  faStar,
  faX,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

// let cardPics = [
//   bo,
//   lobo,
//   "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//   "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
// ];

const MovieCard = ({route}) => {
  const cardPics = route.params.movies
  const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      color: "green",
    },
    heart: {
      flexDirection: "row",
      justifyContent: "right",
      alignItems: "right",
    },
    skull: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      bottom: 0,
    },
    star: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    ex: {
      flexDirection: "row",
      justifyContent: "left",
      alignItems: "left",
    },
  });

  return (
    <View>
      <View style={{ flex: 1, flexBasis: 100 }}>
        <Text>Hello, World</Text>
        <View style={styles.star}>
          <FontAwesomeIcon icon={faStar} size={32} color={"green"} />
        </View>
      </View>

      <View style={{ flex: 2, flexBasis: 500 }}>
        <View style={styles.ex}>
          <FontAwesomeIcon icon={faX} size={32} color={"green"} />
        </View>
        <View style={styles.container}>
          {cardPics.map((pic) => {
            return <MovieCardItem card={pic.link} key={pic.id} />;
          })}
        </View>
        <View style={styles.heart}>
          <FontAwesomeIcon icon={faHeart} size={32} color={"green"} />
        </View>
      </View>

      <View style={{ flex: 3, flexBasis: 100 }}>
        <View style={styles.skull}>
          <FontAwesomeIcon icon={faSkull} size={32} color={"green"} />
        </View>
      </View>
    </View>
  );
};

export default MovieCard;
