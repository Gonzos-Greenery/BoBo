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
// import { gql, useMutation } from '@apollo/client';
// import { ADD_GENRE_MUTATION } from './graphql/Mutation';

const GenrePreferences = ({ navigation, route }) => {
  // const [addGenre, { data }] = useMutation(ADD_GENRE_MUTATION);

  // const genreObject = {
  //   action: false,
  //   animation: false,
  //   comedy: false,
  //   crime: false,
  //   documentation: false,
  //   drama: false,
  //   european: false,
  //   family: false,
  //   fantasy: false,
  //   history: false,
  //   horror: false,
  //   music: false,
  //   romance: false,
  //   scifi: false,
  //   thriller: false,
  //   war: false,
  //   western: false,
  // };

  // const [genres, setGenres] = useState(genreObject);

  // const handleSubmit = () => {
  //   addGenre({ variables: { genreInput: genres } });
  //   navigation.push('Movies');
  // };

  return (
    <View style={{ flex: 1 }}>
      {/* <VStack space={2} w='100%' alignItems='center'>
        <Stack>
          <HStack space={5} flexWrap='wrap' justifyContent='space-between'>
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
                    <Center
                      bg={genres[genre] ? 'primary.300' : 'primary.900'}
                      height='50px'
                      width='125px'
                      rounded='md'
                      margin='5'
                      _text={{
                        color: 'white',
                        fontWeight: 'bold',
                      }}
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
            bg='primary.300'
            shadow='4'
            onPress={handleSubmit}
          >
            Next
          </Button>
        </Stack>
      </VStack> */}
    </View>
  );
};

export default GenrePreferences;
