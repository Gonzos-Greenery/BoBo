import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, FlatList, Pressable, View, Image, Button, StyleSheet, ScrollView} from 'react-native';
import { fetchMovies } from './store/movies';
import Loading from './Loading';


export default ({navigation, route}) => {
    const dispatch = useDispatch()
    const {movies, auth} = useSelector((state) => {
        return state
    });

    useEffect(() => {
        dispatch(fetchMovies())
    },[])

    //tried to mutate the queried information to add link -> It appears above but when you try to access it, its undefined.
    //tested mutating over a key that was already there -> It shows up as the link but when you console log it in render -> Its the original info

    return (
      <View style={styles.container}>
        {/* {window.localStorage.getItem('username') ? <Text style={{fontSize: 20, fontWeight: 'bold'}}>{`Welcome Back, ${window.localStorage.getItem('username')}`}</Text> : <Text>Welcome!</Text> } */}
        <ScrollView>
            {auth.movies === undefined ? <Text style={{fontSize: 16}}>Nothing watched previously</Text> :
            <View style={styles.genreRow}>
                <Text style={{fontSize:16, fontWeight: 'bold'}}>Previously Watched...</Text>
                <FlatList 
                    horizontal
                    ItemSeparatorComponent={() => <View style={{width:5}}/>}
                    data={movies.all === undefined ? [] : movies.all.filter(movie => auth.movies.includes(movie.id))}
                    renderItem={(movie) => (
                        <View>
                            <Image style={styles.image} source={movie.item.image}/>
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
            {movies === undefined ? <Loading /> : 
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
