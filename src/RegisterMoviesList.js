import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, Text, View, Image, Pressable, FlatList, StyleSheet} from 'react-native';
import {Button} from 'native-base';
import { fetchMovies } from './store/movies';
import { registerUpdateWatched } from './store/user';

const MovieItem = (props) => (
    <Pressable
    onPress={() => {
        if(props.selected.includes(props.data.id)){
            props.onSelect(props.selected.filter(id => id !== props.data.id))
        } else {
            props.onSelect([...props.selected, props.data.id])
        }
    }}>
        <Image
            source={{uri: props.data.image}}
            style={props.selected.includes(props.data.id) ? 
                styles.imageSelected : styles.image
            }
        />
    </Pressable>
)

export default ({navigation}) => {
    const dispatch = useDispatch()
    const {auth,movies} = useSelector((state) => {
        return state
    });
    const [selected, setSelected] = useState([])

    useEffect(() => {
        dispatch(fetchMovies())
    },[])

    const handleSubmit = async () => {
        const result = await dispatch(registerUpdateWatched(auth.id, selected))
        navigation.push('LoggedIn')
    }

    return (
        <View>
            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent:'space-between'}}>
                <Button
                    onPress={() => {navigation.navigate('LoggedIn')}}
                    size="lg"
                    _text={{ color: '#404746' }}
                    w="1/6"
                >Skip</Button>
                <Button
                    onPress={handleSubmit}
                    _text={{ color: '#404746' }}
                    size="lg"
                    w="1/6"
                >Submit</Button>
            </View>
            <ScrollView>
                {movies === undefined ? <View /> :
                    Object.keys(movies.sort).map((genre,idx) => {
                        return (
                            <View key={idx} style={styles.genreRow}>
                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{genre.toUpperCase()}</Text>
                                <FlatList
                                    horizontal
                                    ItemSeparatorComponent={() => <View style={{width:5}}/>}
                                    renderItem = {({item}) => (
                                        <MovieItem 
                                            data={item}
                                            selected={selected}
                                            onSelect={setSelected}
                                        /> 
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
    },
    imageSelected: {
        width: 120,
        height: 200,
        borderRadius: 100,
    }
});
