import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-auth-session/providers/google';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  Input,
  Button,
  VStack,
  FormControl,
  Stack,
  useToast,
} from 'native-base';
import {
  faFacebook,
  faTwitter,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from './store';
import logo from '../assets/logo.png';
import { fetchMovies } from './store/movies';

export default ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => {
    return state;
  });

  //Facebook Login + Need to hide appId
  const facebookAuth = async function () {
    try {
      await Facebook.initializeAsync({
        appId: '1385087768668468',
      });

      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile'],
        });
      if (type === 'success') {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        Alert.alert('Login Unsuccessful');
      }
    } catch ({ message }) {
      alert(`Facebook Login Error Message: ${message}`);
    }
  };

  //Google Login
  const googleAuth = () => {
    const [request, response, promptAsync] = Google.useAuthRequest({
      iosClientId:
        '616067821868-rq45l8ujq8vr2n7atj3ekc617uadg6ce.apps.googleusercontent.com',
    });
    if (response?.type === 'success') {
      console.log(response.authentication.accessToken);
    }
  };

  const handleSubmit = async () => {
    const data = { username, password };
    const result = await dispatch(authenticate(data, 'login'));
    if (!result) {
      toast.show({
        description: 'Incorrect Username Or Password',
      });
    } else {
      navigation.navigate('LoggedIn');
    }
  };

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <VStack space={2} w='100%' alignItems='center' marginTop={2}>
        <FormControl>
          <Stack mx='4' alignItems='center'>
            <FormControl.Label py='1' w='75%'>
              Username
            </FormControl.Label>
            <Input
              size='lg'
              variant='underlined'
              maxW='300px'
              w='75%'
              onChangeText={(info) => setUsername(info)}
              autoCapitaliz='none'
            />
            <FormControl.Label py='1' w='75%'>
              Password
            </FormControl.Label>
            <Input
              size='lg'
              variant='underlined'
              maxW='300px'
              w='75%'
              onChangeText={(info) => setPassword(info)}
              secureTextEntry
              autoCapitalize='none'
            />
          </Stack>
        </FormControl>
      </VStack>
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <Text style={{ textAlign: 'center', paddingTop: 20 }}>
        or continue with
      </Text>
      <View style={styles.loginBtnContainer}>
        <View style={styles.loginBtnRow}>
          <TouchableOpacity onPress={facebookAuth}>
            <View style={styles.loginBtn}>
              <FontAwesomeIcon icon={faFacebook} size={50} color={'#4267B2'} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={googleAuth}>
            <View style={styles.loginBtn}>
              <FontAwesomeIcon icon={faGoogle} size={50} color={'#1aa260'} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.loginBtn}>
              <FontAwesomeIcon icon={faTwitter} size={50} color={'#1DA1F2'} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ textAlign: 'center', paddingTop: 20, fontSize: 16 }}>
        Don't have an account?
      </Text>
      <Button
        style={styles.btn}
        _text={{ color: 'black' }}
        onPress={() => {
          navigation.navigate('RegisterStack');
        }}
      >
        Sign Up Here
      </Button>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: `rgba(164,198,156,1)`,
  },
  logo: {
    marginTop: 0,
    width: width,
    height: height * 0.35,
    borderRadius: 25,
    marginBottom: 10,
  },
  textStyle: {
    backgroundColor: '#A4C69C',
  },
  input: {
    width: width,
    height: 50,
    fontSize: 16,
    backgroundColor: `rgba(164,198,156,1)`,
    color: `black`,
  },
  inputContainer: {
    width: width * 0.9,
    borderColor: 'rgba(164,198,156,1)',
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 5,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.6,
  },
  btn: {
    width: width * 0.75,
    color: 'black',
    height: 55,
    borderRadius: 10,
    backgroundColor: '#d5e7d0',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  btnText: {
    textAlign: 'center',
    fontSize: 16,
  },
  loginBtnContainer: {
    width: width,
    maxWidth: 280,
  },
  loginBtnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
});
