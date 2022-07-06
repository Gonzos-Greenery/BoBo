import React from "react";
import TinderCard from "react-tinder-card";
import { StyleSheet, Text, View, Image } from "react-native";

const MovieCardItem = (card) => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: 300,
      height: 400,
      overflow: "hidden",
      position: "absolute",
      overflow: "hidden",
    },
  });

  return (
    <View style={styles.container}>
      <TinderCard>
        <Image
          style={styles.image}
          source={{
            uri: card.card,
          }}
        />
      </TinderCard>
    </View>
  );
};
export default MovieCardItem;
