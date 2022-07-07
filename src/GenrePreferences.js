import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Pressable,
  Button,
} from 'react-native';

const GenrePreferences = (props) => {
  const userId = props.userId;

  const genreObject = {
    action: false,
    animation: false,
    comedy: false,
    crime: false,
    documentation: false,
    drama: false,
    european: false,
    family: false,
    fantasy: false,
    history: false,
    horror: false,
    music: false,
    romance: false,
    scifi: false,
    thriller: false,
    war: false,
    western: false,
  };

  const [genres, setGenres] = useState(genreObject);

  const updateUser = () => {
    const outputGenre = { ...genres };
    // const updatedUser = useMutation(ADD_GENRE_MUTATION);
    console.log(user);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {Object.keys(genreObject).map((genre) => {
          return (
            <Pressable
              onPress={() => {
                let newGenreObj = genres;
                newGenreObj[genre] = !genres[genre];
                setGenres({ ...newGenreObj });
              }}
              key={genre}
            >
              <View style={genres[genre] ? styles.btnPress : styles.btnNormal}>
                <Text>{genre}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
      <Pressable onPress={() => updateUser()}>
        <Text style={styles.nextButton}>Next</Text>
      </Pressable>
    </View>
  );
};

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyItems: 'space-between',
    justifyContent: 'space-between',
  },
  buttonLogo: {
    padding: 10,
    margin: 5,
    height: 50,
    width: 50,
    resizeMode: 'stretch',
  },
  nextButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: 15,
    width: 75,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'pink',
  },
  btnNormal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: 125,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 20,
    minWidth: '48%',
  },
  btnPress: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: 125,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 20,
    minWidth: '48%',
    backgroundColor: 'grey',
  },
});

export default GenrePreferences;
