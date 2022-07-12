import React, {useState, useEffect} from "react";
import { ScrollView, Text, View, Image, Alert, Pressable, FlatList, StyleSheet} from 'react-native';
import { gql, useQuery } from "@apollo/client";
import { MOVIES_QUERY } from "./graphql/Query";
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
import MovieCard from "./MovieSwipe/MovieCard";
import Loading from './Loading'


export default ({navigation, route}) => {
  const {data} = useQuery(MOVIES_QUERY);
  const [movies, setMovies] = useState()
  const [types, setTypes] = useState()

  const editMovies = async (info) => {
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
      <View style={styles.container}>
        {window.localStorage.getItem('username') ? <Text style={{fontSize: 20, fontWeight: 'bold'}}>{`Welcome Back, ${window.localStorage.getItem('username')}`}</Text> : <Text>Welcome!</Text> }
        <ScrollView>
            {route.params.user.watched === undefined ? <Text style={{fontSize: 16}}>Nothing watched previously</Text> :
            <View style={styles.genreRow}>
                <Text style={{fontSize:16, fontWeight: 'bold'}}>Previously Watched...</Text>
                <FlatList 
                    horizontal
                    ItemSeparatorComponent={() => <View style={{width:5}}/>}
                    data={movies === undefined ? [] : movies.filter(movie => route.params.user.watched.includes(movie.id))}
                    renderItem={(movie) => (
                        <View>
                            <Image style={styles.image} source={movie.item.link}/>
                        </View>
                    )}
                />
            </View>
            }
            <View style={styles.genreRow}>
                <Text style={{fontSize:16, fontWeight: 'bold'}}>Upcoming Parties</Text>
                <FlatList 
                    horizontal
                    ItemSeparatorComponent={() => <View style={{width:5}}/>}
                    keyExtractor={(movie,idx) => idx.toString()}
                    data={[1,2]}
                    renderItem={() => (
                        <View>
                            <Pressable 
                                onPress={() => navigation.navigate('PartyView')}>
                                <Image style={styles.image} source={"https://thumbs.dreamstime.com/b/film-strip-video-camera-vector-icon-cinema-symbol-film-strip-video-camera-vector-icon-cinema-symbol-photographic-film-135692148.jpg"}/>        
                            </Pressable>
                        </View>
                    )}
                />
            </View>
            {types === undefined ? <Loading /> : 
                Object.keys(types).map((genre,idx) => {
                    return (
                        <View key={idx} style={styles.genreRow}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{genre.toUpperCase()}</Text>
                            <FlatList 
                            horizontal
                            ItemSeparatorComponent={() => <View style={{width:5}}/>}
                            renderItem = {(movie) => (
                                <View key={movie}>
                                    <Pressable onPress={() => {
                                    navigation.navigate('SingleMovie', {movie: movie.item})}}>
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
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.2,
    elevation: 6,
    shadowRadius: 15 ,
  },
  genreRow: {
      marginTop: 20,
  },
  loading:{
      width:'100%',
      height:'100%'
  },
  container: {
    height:'100%',
    width: '100%',
    backgroundColor: `rgba(164,198,156,1)`
}
});



// const MovieItem = ({ movie, onPress }) => {
//   const { title, description } = movie;
//   let header, subheader;

//   if (title) {
//     header = `Title ${title}`;
//     subheader = description;
//   } else {
//     header = description;
//   }

//   return (
//     <Pressable style={styles.item} onPress={onPress} >
//       <Text style={styles.header}>{header}</Text>
//       {!!subheader && <Text style={styles.subheader}>{subheader}</Text>}
//     </Pressable>
//   );
// };

// export default ({ navigation }) => {
//   const { data, loading } = useQuery(MOVIES_QUERY);

//   if (loading) {
//     return <Loading />
//   }

//   return (
//     <View>
//       <Button title="Vote" onPress={() => navigation.navigate("MovieCard")} />
//       <FlatList
//         data={data.getMovies}
//         renderItem={({ item }) => (
//           <MovieItem
//             movie={item}
//             onPress={() => navigation.navigate("SingleMovie", { movie: item })}
//           />
//         )}
//         keyExtractor={(movie) => movie.id.toString()}
//       />
//     </View>
//   );
// };
