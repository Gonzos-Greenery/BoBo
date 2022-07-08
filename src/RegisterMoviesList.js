import React from 'react';
import { ScrollView, Text, View, Alert, Image, TextInput, FlatList} from 'react-native';
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

import { MOVIES_QUERY } from './graphql/Query';

//Need to run a function to create specific genres that are available 
//It then populates individual movies in the list for each one
const genreList = ['thriller', 'comedy', 'action', 'romance', 'fantasy', 'horror']

export default ({navigation}) => {
    const {data} = useQuery(MOVIES_QUERY);    

    const editMovies = async (info) => {
        console.log(info.getMovies)
        const imdbId = info.getMovie.imdb_id;

        const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
        const BASE_URL = "https://api.themoviedb.org/3";

        const API_URL =
            BASE_URL +
            `/find/${imdbId}?` +
            API_KEY +
            "&language=en-US&external_source=imdb_id";
        const IMG_URL = "https://image.tmdb.org/t/p/w500";
        const searchURL = BASE_URL + "/search/movie?" + API_KEY;
    }

    let updatedMovies
    return (
        <ScrollView>
            <Button 
            onPress={() => {navigation.navigate('Movies')}}
            bg="grey"
            size="lg"
            w="1/6"
            >Skip</Button>
            {/* {
                genreList.map(genre => (
                    <View>
                        <Text style={{fontSize:16}}>{genre}</Text>
                        <FlatList 
                            horizontal
                            ItemSeparatorComponent={() => <View style={{width:5}}/>}
                            renderItem={movie => (
                                <Image />
                            )}
                            data = {data}
                        />
                    </View>                
                ))
            } */}
            <View>
                <FlatList 
                    horizontal
                    data = {data === undefined ? [] : editMovies(data)}
                />
            </View>
        </ScrollView>
    )
}