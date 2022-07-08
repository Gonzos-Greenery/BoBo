import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-auth-session/providers/google';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFacebook, faTwitter, faGoogle} from '@fortawesome/free-brands-svg-icons';
import { useQuery, useLazyQuery, useMutation} from '@apollo/client';
import { LOGIN_AUTH } from './graphql/Mutation';
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
import {
  faFacebook,
  faTwitter,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { LoginAuth } from './graphql/Mutation';

export default ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Regular Authentication with User Database + Auth state
  //useQuery -> takes in a lot of parameters -> returns a lot of data and actions
  //useLazyQuery -> stops the automatic render of useQuery. It allows for execution upon event
  //reset will void the data so that each time the page rerenders, the information isn't persistent
  const [fetchUser, { reset }] = useMutation(LoginAuth);

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

  //Twitter Login

    return(
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../public/logo.png')} 
            />
            <VStack space={2} w="100%" alignItems="center">
                <FormControl>
                    <Stack mx="4" alignItems="center">
                        <FormControl.Label py="1" w="75%">
                            Email
                        </FormControl.Label>
                        <Input 
                            size="lg"
                            variant="underlined"
                            maxW="300px"
                            w="75%"
                            onChangeText={(info) => setEmail(info)}
                            autoCapitaliz='none'
                        />
                        <FormControl.Label py="1" w="75%">
                            Password
                        </FormControl.Label>
                        <Input 
                            size="lg"
                            variant="underlined"
                            maxW="300px"
                            w="75%"
                            onChangeText={(info) => setPassword(info)}
                            secureTextEntry
                            autoCapitalize='none'
                        />
                    </Stack>
                </FormControl>
            </VStack>
            <TouchableOpacity style={styles.btn} onPress={
                async () => {
                    const {data} = await fetchUser({
                        variables:{loginInput: {email,password}},
                        errorPolicy: 'all'
                    });
                    if(data.loginUser){
                        reset()
                        navigation.navigate('Movies')
                    } else {
                        Alert.alert('Incorrect Email/Password, Try Again')
                    }
                }}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            <Text style={{textAlign:'center', paddingTop: 20}}>or continue with</Text>
            <View style={styles.loginBtnContainer}>
                <View style={styles.loginBtnRow}>
                    <TouchableOpacity onPress={facebookAuth}>
                        <View style={styles.loginBtn}>
                            <FontAwesomeIcon icon={faFacebook} size={50} color={"#4267B2"}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={googleAuth}>
                        <View style={styles.loginBtn}>
                            <FontAwesomeIcon icon={faGoogle} size={50} color={"#1aa260"}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.loginBtn}>
                            <FontAwesomeIcon icon={faTwitter} size={50} color={"#1DA1F2"}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={{textAlign:'center', paddingTop: 20, fontSize:16}}>Don't have an account?</Text>
            <Button 
                style={styles.btn} 
                _text={{ color: 'black' }}
                onPress={() => {
                    navigation.navigate('Register')
                }}
                >Sign Up Here</Button>
        </View>
    )
}

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height:'100%',
        width: '100%',
        backgroundColor: `rgba(164,198,156,1)`
    },
    logo:{
        marginTop:0,
        height: height * 0.40
    },
    textStyle:{
        backgroundColor: "#A4C69C",
    },
    input: {
        width: width,
        height: 50,
        fontSize: 16,
        backgroundColor: `rgba(164,198,156,1)`,
        color: `black`,
    },
    inputContainer:{
        width: width*0.9,
        borderColor: 'rgba(164,198,156,1)',
        borderWidth: 1,
        borderRadius: 5,
        paddingTop: 5,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.6
    },
    btn:{
        width: width * 0.75,
        color: 'black',
        height:55,
        borderRadius:10,
        backgroundColor: '#d5e7d0',
        justifyContent: 'center',
        marginTop:10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13},
    },
    btnText:{
        textAlign: 'center',
        fontSize: 16,
    },
    loginBtnContainer:{
        width: width,
        maxWidth:280,
    },
    loginBtnRow:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:20
    },
    loginBtn:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60, 
        marginHorizontal: 12,
        borderWidth: 1,
        borderColor: '#E7E7E7',
        backgroundColor:'white',
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13},
    }
})
