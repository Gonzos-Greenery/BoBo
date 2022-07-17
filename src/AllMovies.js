import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Text,
  FlatList,
  Pressable,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Box } from 'native-base';
import { fetchMovies } from './store/movies';
import { fetchParties } from './store/parties';
import Loading from './Loading';
import { useFocusEffect } from '@react-navigation/native';

export default ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { movies, auth, userParties } = useSelector((state) => {
    return state;
  });

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchMovies());

      return () => {
        return;
      };
    }, [])
  );

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchParties(auth.id));
    }
  }, [auth]);

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginTop: 30 }}>
        {auth.movies === undefined ? (
          <Text style={{ fontSize: 16 }}>Nothing watched previously</Text>
        ) : (
          <View style={styles.genreRow}>
            <Text style={styles.textMovies}>Previously Watched...</Text>
            <FlatList
              horizontal
              ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
              data={
                movies.all === undefined
                  ? []
                  : movies.all.filter((movie) => auth.movies.includes(movie.id))
              }
              renderItem={(movie) => (
                <View>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('SingleMovie', { movie: movie.item });
                    }}
                  >
                    <Image
                      style={styles.image}
                      source={{ uri: movie.item.image }}
                    />
                  </Pressable>
                </View>
              )}
            />
          </View>
        )}
        <View style={styles.genreRow}>
          <Text style={styles.textMovies}>Upcoming Parties...</Text>
          <FlatList
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
            data={userParties === [] ? [] : userParties}
            renderItem={(party) => (
              <View>
                <Pressable
                  onPress={() =>
                    navigation.navigate('PartyView', { id: party.item.id })
                  }
                >
                  <Image
                    style={styles.image}
                    source={{
                      uri: 'https://thumbs.dreamstime.com/b/film-strip-video-camera-vector-icon-cinema-symbol-film-strip-video-camera-vector-icon-cinema-symbol-photographic-film-135692148.jpg',
                    }}
                  />
                  <Text
                    style={{ textAlign: 'center', fontWeight: 'bold' }}
                  >{`Party #${party.item.id}`}</Text>
                </Pressable>
              </View>
            )}
          />
        </View>
        {movies.all === undefined ? (
          <Loading />
        ) : (
          Object.keys(movies.sort).map((genre, idx) => {
            return (
              <View key={idx} style={styles.genreRow}>
                <Text style={styles.textMovies}>{genre.toUpperCase()}</Text>
                <FlatList
                  horizontal
                  ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                  renderItem={(movie) => (
                    <View key={movie}>
                      <Pressable
                        onPress={() => {
                          navigation.navigate('SingleMovie', {
                            movie: movie.item,
                          });
                        }}
                      >
                        <Image
                          style={styles.image}
                          source={{ uri: movie.item.image }}
                        />
                      </Pressable>
                    </View>
                  )}
                  keyExtractor={(movie, idx) => idx.toString()}
                  data={movies.sort[genre]}
                />
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 240,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  genreRow: {
    marginTop: 35,
  },
  loading: {
    width: '100%',
    height: '100%',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: `rgba(164,198,156,1)`,
  },
  btn: {
    alignContent: 'center',
    width: 100,
    height: 85,
    backgroundColor: '#d5e7d0',
    padding: 10,
    borderRadius: 10,
  },
  textMovies: {
    fontSize: 19,
    marginLeft: 5,
    marginBottom: 5,
    fontFamily: 'AppleSDGothicNeo-Bold',
  },
});
