import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Pressable,
  Button,
} from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { UPDATE_USER_MUTATION } from './graphql/Mutation';

const StreamingOptions = ({ navigation, route }) => {
  const [updateUser, { data }] = useMutation(UPDATE_USER_MUTATION);

  const [netflix, setNetflix] = useState(false);
  const [hbo, setHbo] = useState(false);
  const [hulu, setHulu] = useState(false);
  const [prime, setPrime] = useState(false);
  const [disney, setDisney] = useState(false);

  const handleSubmit = async () => {
    const user = {
      id: route.params.id,
      name: route.params.name,
      username: route.params.username,
      password: route.params.password,
      email: route.params.username,
      netflix: netflix,
      hbo: hbo,
      hulu: hulu,
      prime: prime,
      disney: disney,
    };

    await updateUser({ variables: { updateUserInput: user } });
    navigation.push('GenrePreferences');
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Pressable
          onPress={() => {
            setNetflix(!netflix);
          }}
        >
          <View style={netflix ? styles.btnPress : styles.btnNormal}>
            <Image
              source={{
                uri: 'https://www.designmantic.com/blog/wp-content/uploads/2016/07/Netflix-Revamps-Logo.jpg',
              }}
              style={styles.buttonLogo}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => setPrime(!prime)}>
          <View style={prime ? styles.btnPress : styles.btnNormal}>
            <Image
              source={{
                uri: 'https://cdn.wezift.com/assets/apps/amazon-prime-video/logo/_imgSingle/208890/512x512bb.png?mtime=20220129040734',
              }}
              style={styles.buttonLogo}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => setHulu(!hulu)}>
          <View style={hulu ? styles.btnPress : styles.btnNormal}>
            <Image
              source={{
                uri: 'https://media.glassdoor.com/sqll/43242/hulu-squarelogo-1561078825650.png',
              }}
              style={styles.buttonLogo}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => setHbo(!hbo)}>
          <View style={hbo ? styles.btnPress : styles.btnNormal}>
            <Image
              source={{
                uri: 'https://hbomax-images.warnermediacdn.com/2020-05/square%20social%20logo%20400%20x%20400_0.png',
              }}
              style={styles.buttonLogo}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => setDisney(!disney)}>
          <View style={disney ? styles.btnPress : styles.btnNormal}>
            <Image
              source={{
                uri: 'https://media.wdwnt.com/2020/05/2_disney_logo_29e79241_fbd045f0.png',
              }}
              style={styles.buttonLogo}
            />
          </View>
        </Pressable>
      </View>
      <Pressable onPress={() => handleSubmit()}>
        <Text style={styles.nextButton}>Next</Text>
      </Pressable>
    </View>
  );
};

// React Native Styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyItems: 'space-between',
    justifyContent: 'space-between',
  },
  buttonLogo: {
    padding: 10,
    margin: 5,
    height: 50,
    width: 50,
    resizeMode: 'stretch',
  },
  nextButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: 15,
    width: 75,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'pink',
  },
  btnNormal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: 75,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 20,
    minWidth: '48%',
  },
  btnPress: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: 75,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 20,
    minWidth: '48%',
    backgroundColor: 'grey',
  },
});

export default StreamingOptions;
