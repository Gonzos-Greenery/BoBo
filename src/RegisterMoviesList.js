import React, {useState, useEffect} from 'react';
import { ScrollView, Text, View, Image, Alert, TextInput, FlatList, StyleSheet} from 'react-native';
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

//Need to run a function to create specific genres that are available 
//It then populates individual movies in the list for each one
// const genreList = ['thriller', 'comedy', 'action', 'romance', 'fantasy', 'horror']

export default ({navigation}) => {
    const {data} = useQuery(MOVIES_QUERY);
    const [movies, setMovies] = useState()
    
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
        const newMovies = info.getMovies.map(movie => {
            const imdbId = movie.imdb_id;
            const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
            const BASE_URL = "https://api.themoviedb.org/3";

            const API_URL =
                BASE_URL +
                `/find/${imdbId}?` +
                API_KEY +
                "&language=en-US&external_source=imdb_id";
            const IMG_URL = "https://image.tmdb.org/t/p/w500";
            const newMovie = {...movie}
            fetch(API_URL)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if(!data.success && data.movie_results && data.movie_results.length>0){
                        newMovie.link = `${IMG_URL + data.movie_results[0].poster_path}`
                    } else {
                        newMovie.link = "https://media.comicbook.com/files/img/default-movie.png"
                    }
                })
            return newMovie
        })
        //At this point movies image links have been added. 
        //Filter for each genre
        for(let type in genres){
            const filteredMovies = newMovies.filter(movie => movie.genres[0].includes(type))
            genres[type] = filteredMovies;
        }
        console.log(newMovies)
        setMovies(genres)
    }

    useEffect(() => {
        if(data){
            editMovies(data)
        }
    }, [data])

    return (
        <View>
            <Button 
                onPress={() => {navigation.navigate('Movies')}}
                bg="grey"
                size="lg"
                w="1/6"
            >Skip</Button>
            <View>
                {movies === undefined ? <Loading style={styles.loading}/> : 
                    Object.keys(movies).map((type,idx) => {
                        const listOfMoviesWithType = movies[type]
                        if(type === 'comedy'){
                            // console.log(listOfMoviesWithType.every(movie => movie.genres[0].includes(type)))
                            // console.log(listOfMoviesWithType)
                        }
                        return (
                            <View style={styles.genreRow} key={idx}>
                                <Text style={{fontSize: 16}}>{type}</Text>
                                <FlatList 
                                    horizontal
                                    ItemSeparatorComponent={() => <View style={{width:5}}/>}
                                    renderItem = {movie => (
                                        <Image style={styles.image} source={{uri: movie.item.link}}/>
                                    )}
                                    data = {listOfMoviesWithType}
                                />
                            </View>
                        )
                    })
                }
                {/* {movies === undefined ? <Loading /> : 
                    <View style={styles.genreRow} key={200}>
                        <Text style={{fontSize: 16}}>{'Comedy 2.0'}</Text>
                        <FlatList 
                            horizontal
                            ItemSeparatorComponent={() => <View style={{width:5}}/>}
                            renderItem = {movie => (
                                <Image style={styles.image} source={{uri: "https://media.comicbook.com/files/img/default-movie.png"}}/>
                            )}
                            data = {movies.action}
                        />
                        {console.log(movies.action)}
                        <Image style={styles.image} source={{uri: "https://media.comicbook.com/files/img/default-movie.png"}}/>
                    </View>
                } */}
                {/* {movies === undefined ? <Loading /> : 
                    movies.action.map((movie,idx) => {
                        console.log(movie)
                        return (
                            <View key={idx}>
                                <Image style={styles.image} source={{uri: "https://media.comicbook.com/files/img/default-movie.png"}}/>
                            </View>
                        )
                    })
                } */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
      width: 100,
      height: 100,
    },
    genreRow: {
        marginTop: 20,
    },
    loading:{
        width:'100%',
        height:'100%'
    }
});

