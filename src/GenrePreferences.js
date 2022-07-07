import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
  Pressable,
  Button,
  Stack,
  VStack,
  HStack,
  Box,
  Center,
} from 'native-base';
import { gql, useMutation } from '@apollo/client';
import { ADD_GENRE_MUTATION } from './graphql/Mutation';

const GenrePreferences = ({ navigation, route }) => {
  const [addGenre, { data }] = useMutation(ADD_GENRE_MUTATION);

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
    addGenre({ variables: { genreInput: genres } });
    navigation.push('Movies');
  };

  return (
    <View style={{ flex: 1 }}>
      <VStack space={2} w='100%' alignItems='center'>
        <Stack>
          <HStack space={10} justifyContent='center' flexWrap='wrap'>
            {Object.keys(genreObject).map((genre) => {
              return (
                <Stack key={genre}>
                  <Pressable
                    onPress={() => {
                      let newGenreObj = genres;
                      newGenreObj[genre] = !genres[genre];
                      setGenres({ ...newGenreObj });
                    }}
                  >
                    {/* <View style={genres[genre] ? styles.btnPress : styles.btnNormal}> */}
                    <Center
                      bg={genres[genre] ? 'primary.300' : 'primary.900'}
                      h='30px'
                      w='110px'
                      rounded='md'
                      _text={{
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                      marginTop='15px'
                    >
                      {genre}
                    </Center>
                  </Pressable>
                </Stack>
              );
            })}
          </HStack>
        </Stack>
        <Stack>
          <Button
            _text={{ color: 'white' }}
            w='100%'
            bg='primary.300'
            shadow='4'
            onPress={handleSubmit}
            marginTop='50px'
          >
            Next
          </Button>
        </Stack>
      </VStack>
    </View>
  );
};

// React Native Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },
//   iconContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyItems: 'space-between',
//     justifyContent: 'space-between',
//   },
//   buttonLogo: {
//     padding: 10,
//     margin: 5,
//     height: 50,
//     width: 50,
//     resizeMode: 'stretch',
//   },
//   nextButton: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     textAlign: 'center',
//     height: 15,
//     width: 75,
//     borderColor: 'grey',
//     borderWidth: 1,
//     borderRadius: 10,
//     backgroundColor: 'pink',
//   },
//   btnNormal: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 75,
//     width: 125,
//     borderColor: 'grey',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 8,
//     paddingVertical: 8,
//     alignSelf: 'flex-start',
//     marginHorizontal: 20,
//     marginVertical: 20,
//     minWidth: '48%',
//   },
//   btnPress: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 75,
//     width: 125,
//     borderColor: 'grey',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 8,
//     paddingVertical: 8,
//     alignSelf: 'flex-start',
//     marginHorizontal: 20,
//     marginVertical: 20,
//     minWidth: '48%',
//     backgroundColor: 'grey',
//   },
// });

export default GenrePreferences;
