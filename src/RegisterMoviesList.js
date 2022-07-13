import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, Text, View, Image, Pressable, FlatList, StyleSheet} from 'react-native';
import {
    Input,
    Icon,
    MaterialIcons,
    Label,
    Button,
    VStack,
    FormControl,
    Center,
    Stack,
    useToast,
    WarningOutlineIcon,
} from 'native-base';
import { fetchMovies } from './store/movies';
import Loading from './Loading';
//Need to run a function to create specific genres that are available 
//It then populates individual movies in the list for each one

export default ({navigation}) => {
    const dispatch = useDispatch()
    const {movies} = useSelector((state) => {
        return state
    });
    const [selected, setSelected] = useState([])

    useEffect(() => {
        dispatch(fetchMovies())
    },[])

    const handleSubmit = () => {
        navigation.navigate('Movies')
    }
    //onPress is delayed, missing the inital clicked movie
    return (
        <View>
            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent:'space-between'}}>
                <Button 
                    onPress={() => {navigation.navigate('Movies')}}
                    size="lg"
                    w="1/6"
                >Skip</Button>
                <Button 
                    onPress={handleSubmit}
                    size="lg"
                    w="1/6"
                >Submit</Button>
            </View>
            <ScrollView>
                {movies === undefined ? <Loading /> : 
                    <View style={styles.genreRow}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>ALL MOVIES</Text>
                            <FlatList 
                                horizontal
                                pagingEnabled
                                ItemSeparatorComponent={() => <View style={{width:5}}/>}
                                renderItem = {(movie) => (
                                    <View key={movie}>
                                        <Pressable onPress={() => {navigation.navigate('SingleMovie', {movie: movie.item})}}>
                                            <Image 
                                            style={styles.image} 
                                            source={{uri: movie.item.image}}
                                            />
                                      </Pressable>
                                    </View>
                                )}
                                keyExtractor={(movie,idx) => idx.toString()}
                                data = {movies.all}
                            />
                    </View>
                }
                
                {movies === undefined ? <View /> : 
                    Object.keys(movies.sort).map((genre,idx) => {
                        return (
                            <View key={idx} style={styles.genreRow}>
                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{genre.toUpperCase()}</Text>
                                <FlatList 
                                horizontal
                                ItemSeparatorComponent={() => <View style={{width:5}}/>}
                                renderItem = {(movie) => (
                                    <View key={movie}>
                                        <Pressable onPress={() => {
                                            setSelected([...selected, movie.item.id])
                                            console.log(selected)
                                        }}>
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
      width: 120,
      height: 200,
      borderRadius: 10,
    },
    genreRow: {
        marginTop: 20,
    },
    loading:{
        width:'100%',
        height:'100%'
    }
});

 // const newMovies = await Promise.all(info.getMovies.map(movie => {
        //     const imdbId = movie.imdb_id;
        //     const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
        //     const BASE_URL = "https://api.themoviedb.org/3";

        //     const API_URL =
        //         BASE_URL +
        //         `/find/${imdbId}?` +
        //         API_KEY +
        //         "&language=en-US&external_source=imdb_id";
        //     const IMG_URL = "https://image.tmdb.org/t/p/w500";
        //     const newMovie = {...movie}

        //     const res = fetch(API_URL)
        //         .then(res => res.json())
        //         .then((data) => {
        //             if(!data.success && data.movie_results && data.movie_results.length>0){
        //                 return `${IMG_URL + data.movie_results[0].poster_path}`
        //             } else {
        //                 return "https://media.comicbook.com/files/img/default-movie.png"
        //             }
        //     }).then(info => {
        //         newMovie.link = info
        //     })
        //     console.log(newMovie.link)
        //     return newMovie
        // }))