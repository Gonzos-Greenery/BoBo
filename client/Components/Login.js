import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Dimensions, TouchableOpacity} from 'react-native';

export default () => {
    return(
        <>
            <View>
                <Image source={require('../logo.png')}/>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Enter Email Here'}
                    placeholderTextColor={`rgba(255,255,255,0.7)`}
                />
                <Text style={styles.textStyle}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Enter Password Here'}
                    placeholderTextColor={`rgba(255,255,255,0.7)`}
                />
            </View>
            <View>
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{textAlign:'center', paddingTop: 20}}>Don't have an account?</Text>
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.text}>Register</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    input: {
        width: width,
        height: 50,
        fontSize: 16,
        backgroundColor: `rgba(164,198,156,1)`,
        color: `black`,
    },
    container: {
        padding: '20',
        alignItems: 'center',
    },
    inputContainer:{
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        broderRadius: 5,
    },
    textStyle:{
        backgroundColor: "#A4C69C",
    },
    loginBtn:{
        width: width * 0.75,
        height:55,
        borderRadius:10,
        backgroundColor: '#d5e7d0',
        justifyContent: 'center',
        marginTop:20
    },
    text:{
        textAlign:'center',
        fontSize: 16,
    }
})