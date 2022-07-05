import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Alert, Image, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import * as Facebook from 'expo-facebook'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFacebook, faTwitter, faGoogle} from '@fortawesome/free-brands-svg-icons';
// import { useQuery } from '@apollo/client';
// import { USER_QUERY } from './graphql/Query';

export default () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //Regular Authentication with User Database + Auth state 
    // const loginAuth = async function (id = "62c497cbe028cca03375aa53") {
    //     const {data} = useQuery(USER_QUERY(), {
    //         variables:{
    //             id: id
    //         }
    //     })ex
    //     console.log(data)
    // }

    //Facebook Login + Need to hide appId
    const facebookAuth = async function (){
        try{
            await Facebook.initializeAsync({
                appId: '1385087768668468'
            });

            const { type, token, expirationDate, permissions, declinedPermissions } =
            await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
            });
            if (type === 'success') {
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
            } else {
                Alert.alert('Login Unsuccessful');
            }
        } catch({message}){
            alert(`Facebook Login Error Message: ${message}`);
        }
    }

    //Google Login 
    

    return(
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../public/logo.png')} 
            />
            <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={`rgba(255,255,255,0.7)`}
                    onChangeText={(info) => setUsername(info)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={`rgba(255,255,255,0.7)`}
                    onChangeText={(info) => setPassword(info)}
                    secureTextEntry
                />
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => {loginAuth()}}>
                    <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            <Text style={{textAlign:'center', paddingTop: 20}}>or continue with</Text>
            <View style={styles.loginBtnContainer}>
                <View style={styles.loginBtnRow}>
                    <TouchableOpacity onPress={()=>{facebookAuth()}}>
                        <View style={styles.loginBtn}>
                            <FontAwesomeIcon icon={faFacebook} size={50} color={"#4267B2"}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
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
            <Text style={{textAlign:'center', paddingTop: 20}}>Don't have an account?</Text>
            <Text style={{color:'white'}} onPress={() => {}}>Sign up here!</Text>
        </View>
    )
}
//icons are not images
//imgs -> always use just width
const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        width: '100%'
    },
    logo:{
        marginTop:0,
        width: '90%'
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
        height:55,
        borderRadius:10,
        backgroundColor: '#d5e7d0',
        justifyContent: 'center',
        marginTop:20,
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
        marginTop:20
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