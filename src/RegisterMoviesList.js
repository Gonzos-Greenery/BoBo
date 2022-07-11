import React, {useState, useEffect} from 'react';
import { ScrollView, Text, View, Image, Pressable, FlatList, StyleSheet} from 'react-native';
import { useQuery, useLazyQuery, useMutation} from '@apollo/client';
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
import Loading from './Loading';

import { MOVIES_QUERY } from './graphql/Query';
import { ADD_WATCHED } from './graphql/Mutation';
//Need to run a function to create specific genres that are available 
//It then populates individual movies in the list for each one

export default ({navigation}) => {
    const {data} = useQuery(MOVIES_QUERY);
    const [addWatched] = useMutation(ADD_WATCHED);
    const [movies, setMovies] = useState();
    const [types, setTypes] = useState();
    const [seen, setSeen] = useState();
    const genres = {
        action: [],
        animation: [],
        comedy: [],
        crime: [],
        documentation: [],
        drama: [],    
        european: [],
        family: [],
        fantasy: [],
        history: [],
        horror: [],
        music: [],
        romance: [],
        scifi: [],
        thriller: [],
        war: [],
        western: [],
    }
    

    const editMovies = async (info) => {
        const newMovies = await Promise.all(info.getMovies.map(movie => {
            const imdbId = movie.imdb_id;
            const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
            const BASE_URL = "https://api.themoviedb.org/3";

            const API_URL =
                BASE_URL +
                `/find/${imdbId}?` +
                API_KEY +
                "&language=en-US&external_source=imdb_id";
            const IMG_URL = "https://image.tmdb.org/t/p/w500";

            let res = fetch(API_URL)
            .then(res => res.json())
            .then(({movie_results}) => {
                if(movie_results && movie_results.length>0 && movie_results[0].poster_path){
                    return {
                        link: `${IMG_URL + movie_results[0].poster_path}`,
                        genres: movie.genres,
                        id: movie.id
                    }
                } else {
                    return {
                        link: "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
                        genres: movie.genres,
                        id: movie.id
                    }
                }
            })
            return res;
        }))
        setMovies(newMovies)
        //At this point movies image links have been added. 
        //Filter for each genre
        for(let type in genres){
            const filteredMovies = newMovies.filter(movie => movie.genres[0].includes(type))
            genres[type] = filteredMovies;
        }
        setTypes(genres)
    }

    useEffect(() => {
        if(data){
            editMovies(data)
        }
    }, [data])

    //tried to mutate the queried information to add link -> It appears above but when you try to access it, its undefined.
    //tested mutating over a key that was already there -> It shows up as the link but when you console log it in render -> Its the original info

    return (
        <View>
            <Button 
                onPress={() => {navigation.navigate('Movies')}}
                bg="grey"
                size="lg"
                w="1/6"
            >Skip</Button>
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
                                            source={{uri: movie.item.link}}
                                            />
                                      </Pressable>
                                    </View>
                                )}
                                keyExtractor={(movie,idx) => idx.toString()}
                                data = {movies}
                            />
                    </View>
                }
                
                {types === undefined ? <View /> : 
                    Object.keys(types).map((genre,idx) => {
                        return (
                            <View key={idx} style={styles.genreRow}>
                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{genre.toUpperCase()}</Text>
                                <FlatList 
                                horizontal
                                ItemSeparatorComponent={() => <View style={{width:5}}/>}
                                renderItem = {(movie) => (
                                    <View key={movie}>
                                        <Pressable onPress={() => {navigation.navigate('SingleMovie', {movie: movie.item})}}>
                                            <Image 
                                            style={styles.image} 
                                            source={{uri: movie.item.link}}
                                            />
                                      </Pressable>
                                    </View>
                                )}
                                keyExtractor={(movie,idx) => idx.toString()}
                                data = {types[genre]}
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