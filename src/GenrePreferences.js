import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from 'react-native';
import {
  Pressable,
  Button,
  Stack,
  VStack,
  HStack,
  Box,
  Center,
  Circle,
} from 'native-base';
import { addUserGenre } from './store/genrePref';

const GenrePreferences = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.auth);

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

  const handleSubmit = () => {
    const userId = userAuth.id;
    dispatch(addUserGenre(userId, genres));
    navigation.push('RegisterMovies');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <VStack alignItems='center'>
          <Stack>
            <Center
              bg='primary.100'
              alignItems='center'
              rounded='8'
              p='4'
              margin='4'
              _text={{
                color: 'primary.900',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              Which genres are you interested in?
            </Center>
          </Stack>
          <HStack flexWrap='wrap' justifyContent='space-around'>
            {Object.keys(genreObject).map((genre) => {
              return (
                <Stack key={genre} p='3'>
                  <Pressable
                    onPress={() => {
                      let newGenreObj = genres;
                      newGenreObj[genre] = !genres[genre];
                      setGenres({ ...newGenreObj });
                    }}
                  >
                    <Circle
                      size='120px'
                      borderWidth={genres[genre] ? '3' : '1'}
                      bg={genres[genre] ? 'primary.100' : 'primary.500'}
                      _text={{
                        color: 'primary.900',
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                    >
                      {genre}
                    </Circle>
                  </Pressable>
                </Stack>
              );
            })}
          </HStack>
          <Stack>
            <Button
              _text={{ color: '#404746' }}
              bg='primary.300'
              shadow='4'
              onPress={handleSubmit}
            >
              Next
            </Button>
          </Stack>
        </VStack>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: `rgba(164,198,156,1)`,
    flex: 1,
  },
});

export default GenrePreferences;
