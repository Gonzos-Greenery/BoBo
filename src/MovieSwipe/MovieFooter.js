import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSkull,
  faStar,
  faX,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const MovieFooter = () => {
  return (
    <View style={styles.wrapper}>
      <FontAwesomeIcon icon={faStar} size={32} color={"darkseagreen"} />
      <FontAwesomeIcon icon={faX} size={32} color={"darkseagreen"} />
      <FontAwesomeIcon icon={faHeart} size={32} color={"darkseagreen"} />
      <FontAwesomeIcon icon={faSkull} size={32} color={"darkseagreen"} />
    </View>
  );
};

export default MovieFooter;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: 'center'
  },
});
