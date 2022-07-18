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
  TouchableOpacity
} from 'react-native';
import { fetchMovies } from './store/movies';
import { fetchParties } from './store/parties';
import Loading from './Loading';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';

export default ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { movies, auth, userParties } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchParties(auth.id));
    }
  }, [auth]);

    return (
      <View style={styles.container}>
        <ScrollView style={{marginTop: 30}}>
            {auth.movies === undefined ? <Text style={{fontSize: 16}}>Nothing watched previously</Text> :
            <View style={styles.genreRow}>
                <Text style={styles.textMovies}>Previously Watched...</Text>
                <FlatList 
                    horizontal
                    ItemSeparatorComponent={() => <View style={{width:5}}/>}
                    data={movies.all === undefined ? [] : movies.all.filter(movie => auth.movies.includes(movie.id))}
                    renderItem={(movie) => (
                        <View>
                            <Pressable onPress={() => {navigation.navigate('SingleMovie', {movie: movie.item})}}>
                                <Image style={styles.image} source={{uri: movie.item.image}}/>
                            </Pressable>
                        </View>
                    )}
                />
            </View>
            }
            <View style={styles.genreRow}>
                <Text style={styles.textMovies}>Upcoming Parties...</Text>
                <FlatList 
                    horizontal
                    ItemSeparatorComponent={() => <View style={{width:10}}/>}
                    data={userParties === [] ? [] : userParties}
                    renderItem={(party) => (
                        <View style={{height:100}}>
                            <TouchableOpacity style={styles.btn}
                              onPress={() => navigation.navigate('PartyView', {id: party.item.id})}>
                              <FontAwesomeIcon icon={faTicket} size={70} color={'#8A9D8C'}/>
                              <Text style={{fontFamily: 'AppleSDGothicNeo-Bold', fontSize: 14}}>{`${party.item.name}`}</Text>   
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
            {movies.all === undefined ? <Loading /> : 
                Object.keys(movies.sort).map((genre,idx) => {
                    return (
                        <View key={idx} style={styles.genreRow}>
                            <Text style={styles.textMovies}>{genre.toUpperCase()}</Text>
                            <FlatList 
                            horizontal
                            ItemSeparatorComponent={() => <View style={{width:10}}/>}
                            renderItem = {(movie) => (
                                <View key={movie}>
                                    <Pressable onPress={() => {
                                    navigation.navigate('SingleMovie', {movie: movie.item})}}>
                                    <Image 
                                        style={styles.image} 
                                        source={{uri: movie.item.image}}
                                    />
                                    </Pressable>
                                </View>
                            )}
                            keyExtractor={(movie,idx) => idx.toString()}
                            data = {movies.sort[genre]}
                            />
                        </View>
                    )
                })
            }
            </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 240,
    borderRadius: 15,
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
  btn:{
    alignItems:'center',
    width: 100,
    height: 95,
    backgroundColor: "#d5e7d0",
    padding: 5,
    borderRadius: 10, 
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textMovies: {
    fontSize: 19, 
    marginLeft: 5,
    marginBottom: 5,
    fontFamily: 'AppleSDGothicNeo-Bold'
  }, 
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }
});