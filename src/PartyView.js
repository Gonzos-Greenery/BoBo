import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  FlatList,
} from 'react-native';
import axios from 'axios';
import { Button, VStack, Stack, Label, Icon } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { fetchParty } from './store/party';
import { fetchPartyMovies } from './store/movies';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default ({ navigation, route }) => {
  const [votingStatus, setVotingStatus] = useState(); //state of voting period, state of users list, state of users voted status
  const [host, setHost] = useState(); //keeps track of users + adding new users
  const [films, setFilms] = useState(); //storing a collection of 10 films with top scorings that are not seen or is "will watch again movie"
  const dispatch = useDispatch();
  const store = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch(fetchParty(route.params.id));
  }, []);

  useEffect(() => {
    if (store.party.users) {
      const host = store.party.users.filter((user) => user.UserParties.host);
      setHost(host[0] === undefined ? 'Not Assigned' : host[0].username);
    }
  }, [store.party]);

  useEffect(() => {
    if (store.partyMovies) {
      console.log('Party movies selected: ', store.partyMovies);
    }
  }, [store.partyMovies]);

  return (
    <View style={styles.container}>
      {store.party === undefined ? (
        <></>
      ) : (
        <View>
          <View style={{ margin: 10 }}>
            <Text style={styles.textMain}>
              {`Movie Night: ${
                store.party.name ? store.party.name : 'BOBO Party!!!'
              }'s`}
            </Text>
            <Text style={styles.textMain}>
              {`Date: ${
                store.party.date ? store.party.date.slice(0, 10) : 'No date set'
              }`}
            </Text>
            <Text style={styles.textMain}>
              {`Location: ${
                store.party.location ? store.party.location : 'The shire'
              }`}
            </Text>
            <Text style={styles.textMain}>
              {`Host: ${host === undefined ? '' : host}`}
            </Text>
          </View>
          <View style={{ textAlign: 'center', marginBottom: 10 }}>
            <Text style={styles.textMain}>Attendees</Text>
            {store.party.users === undefined ? (
              <></>
            ) : (
              <FlatList
                data={store.party.users}
                keyExtractor={(movie, idx) => idx.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.user}>
                      <FontAwesomeIcon
                        icon={faUser}
                        size={30}
                        color={'#8A9D8C'}
                        style={{
                          marginRight: 30,
                          marginLeft: 10,
                          alignSelf: 'center',
                        }}
                      />
                      <Text style={{ fontSize: 16, alignSelf: 'center' }}>
                        {item.name}
                      </Text>
                    </View>
                  );
                }}
              />
            )}
          </View>
          <Button
            style={{ backgroundColor: '#d5e7d0' }}
            _text={{ color: 'black' }}
            onPress={() => dispatch(fetchPartyMovies(store.party.users))}
          >
            Press to Set Movie Options
          </Button>
          <View style={styles.btnRow}>
            <Button
              style={{ backgroundColor: '#d5e7d0' }}
              _text={{ color: 'black' }}
              onPress={() => navigation.navigate('MovieCard')}
            >
              Press to Vote
            </Button>
            <Button
              style={{ backgroundColor: '#d5e7d0' }}
              _text={{ color: 'black' }}
              onPress={() =>
                navigation.navigate('Party Invites', {
                  attendees: store.party.users,
                })
              }
            >
              Add to group
            </Button>
          </View>
          {store.auth.username !== host ? (
            <></>
          ) : (
            <Pressable>
              <Button
                style={{
                  height: 55,
                  borderRadius: 10,
                  width: '75%',
                  alignSelf: 'center',
                  marginTop: 20,
                  backgroundColor: '#d5e7d0',
                }}
                _text={{ color: 'black' }}
              >
                Recommend
              </Button>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: `rgba(164,198,156,1)`,
  },
  textMain: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#404746',
  },
  btn: {
    height: 55,
    borderRadius: 10,
    width: 100,
    justifyContent: 'center',
    backgroundColor: '#8A9D8C',
    alignSelf: 'center',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    justifyContent: 'space-evenly',
  },
  user: {
    height: 60,
    borderRadius: 13,
    width: '75%',
    alignSelf: 'center',
    marginTop: 7,
    textAlign: 'justify',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});
