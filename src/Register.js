import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import {View, Text,
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
  WarningOutlineIcon, Image
} from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from './store/auth';

const Register = ({ navigation }) => {
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [errors, setErrors] = React.useState('');
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const dispatch = useDispatch();
  const validate = () => {
    if (!email.includes('@') || !email.includes('.')) {
      setErrors('Invalid email type.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validate()) {
      const newUserInput = { username, email, password, name: fullName };
      try {
        const data = await dispatch(authenticate(newUserInput, 'signup'));

        if (data != true) {
          setErrors('Username/email already exists');

        } else {

          navigation.push('StreamingOptions');
        }
      } catch (err) {
        setErrors(err.message);
      }
    } else {
      console.log('**not validated', errors);
    }
  };

  return (
    <View style={styles.container}>
      <VStack space={2} w='100%' alignItems='center'>
        <FormControl>
          <Stack mx='4' alignItems='center'>
            <FormControl.Label py='1' w='75%'>
              Full Name
            </FormControl.Label>
            <Input
              size='2xl'
              variant='underlined'
              maxW='300px'
              w='75%'
              value={fullName}
              onChangeText={setFullName}
              label='fullName'
              placeholder='Full Name'
            ></Input>
          </Stack>
        </FormControl>
        <FormControl isRequired>
          <Stack mx='4' alignItems='center'>
            <FormControl.Label pb='0' w='75%'>
              Username
            </FormControl.Label>
            <Input
              size='2xl'
              variant='underlined'
              maxW='300px'
              w='75%'
              value={username}
              onChangeText={setUsername}
              label='Username'
              placeholder='Username'
            ></Input>
          </Stack>
        </FormControl>
        <FormControl isRequired>
          <Stack mx='4' alignItems='center'>
            <FormControl.Label w='75%'>E-mail</FormControl.Label>
            <Input
              size='2xl'
              variant='underlined'
              maxW='300px'
              w='75%'
              onChangeText={setEmail}
              value={email}
              label='email'
              placeholder='E-mail'
            ></Input>
          </Stack>
        </FormControl>
        <FormControl isRequired>
          <Stack mx='4' alignItems='center'>
            <FormControl.Label w='75%'>Password</FormControl.Label>
            <Input
              type={show ? 'text' : 'password'}
              variant='underlined'
              onChangeText={setPassword}
              size='2xl'
              w='75%'
              maxW='300px'
              InputRightElement={
                <Button
                  size='s'
                  rounded='none'
                  w='1/6'
                  h='full'
                  variant='ghost'
                  colorScheme='green'
                  _text={{ color: '#86A17F' }}
                  onPress={handleClick}
                >
                  {show ? 'Hide' : 'Show'}
                </Button>
              }
              placeholder='Password'
            />
            {errors.length > 1 ? (
              <FormControl.HelperText>
                Unable to register. {errors}
              </FormControl.HelperText>
            ) : (
              <Text> </Text>
            )}
          </Stack>
        </FormControl>
        <Button
          _text={{ color: '#F7F6D4' }}
          w='70%'
          bg='#848B82'
          shadow='4'
          onPress={handleSubmit}
        >
          Register
        </Button>
        <Text _text={{color:'#86A17F'}} py='9'>
          Already signed up?
        </Text>
        <Text
          style={{ color: 'black', textDecorationLine: 'underline' }}
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          Login here!
        </Text>
      </VStack>
    </View>
  );
};
const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      height:'100%',
      width: '100%',
      backgroundColor: `rgba(164,198,156,1)`,
      flex:1
  },logo:{
    marginTop:0,
    height: height * 0.30
},})

export default Register;
