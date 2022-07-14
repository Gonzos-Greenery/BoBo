import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable, TouchableOpacity} from 'react-native';
import { Button, VStack, Stack, Label, Icon} from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { fetchParty } from './store/party';


export default ({navigation, route}) => {
    const [votingStatus, setVotingStatus] = useState() //state of voting period, state of users list, state of users voted status
    const [users, setUsers] = useState() //keeps track of users + adding new users 
    const [films, setFilms] = useState() //storing a collection of 10 films with top scorings that are not seen or is "will watch again movie"
    const dispatch = useDispatch()
    const store = useSelector((state) => {
        return state
    })
    //needs to take an a parameter for party ID to load in the information. 

    //pull in list -> check different attributes to see for that party
    //voted + not yet will be checked in status for each user
    //used buttons for users so you can press to see each profile maybe
    //press to vote button 
    //Add to group
    //recommend button closes out voting status and makes a recommendation ONLY if you're host
    useEffect(() => {
        dispatch(fetchParty(route.params.id))
    },[])
    return(
        <View style={styles.container}>
            {store.party === undefined ? <></> : 
                <View>
                    <View style={{textAlign:'center', marginBottom: 10}}>
                        <Text style={styles.textMain}>
                            {`Movie Night: ${store.party.name}'s`}
                        </Text>
                        <Text style={styles.textMain}>
                            {`Date: ${store.party.date}`}
                        </Text>
                        <Text style={styles.textMain}>
                            {`Location: ${store.party.location}`}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.textMain}>Attendees</Text>
                        {store.party.users === undefined ? <></> : 
                            store.party.users.map((person,idx) => {
                                return (
                                    <Button style={styles.user} key={idx}>{person.name}</Button>
                                )
                            })
                        }
                    </View>
                    <View style={styles.btnRow}>
                        <Button 
                            onPress={() => navigation.push('MovieCard')}
                        >Press to Vote</Button>
                        <Button
                            onPress={() => navigation.push('PartyAddForm', {attendees: store.party.users})}
                        >Add to group</Button>
                    </View>
                    <Button style={{height: 55, borderRadius: 10, width: '75%', alignSelf:'center', marginTop: 20}}>Recommend</Button>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      height:'100%',
      width: '100%',
      backgroundColor: `rgba(164,198,156,1)`
    },
    textMain: {
        fontSize: 20,
        fontWeight:'bold'
    }
    ,
    btn:{
        height: 55, 
        borderRadius: 10,
        width: 100,
        justifyContent: 'center',
        backgroundColor: '#8A9D8C',
        alignSelf:'center'
    },
    btnRow:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:20,
        justifyContent:'space-evenly'
    },
    user:{
        height: 55, 
        borderRadius: 10, 
        width: '75%', 
        alignSelf:'center',
        marginTop: 7,
        textAlign: 'justify'
    }
});