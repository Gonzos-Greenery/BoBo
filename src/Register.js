import React from 'react';
import { View, Text } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { REGISTER_USER_MUTATION } from './graphql/Mutation';
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

const Register = ({ navigation }) => {
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [errors, setErrors] = React.useState('');
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [registerUser, { data }] = useMutation(REGISTER_USER_MUTATION);

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
        const data = await registerUser({
          variables: { registerInput: newUserInput },
        });
        navigation.push('StreamingOptions', data.data.registerUser);
      } catch (err) {
        setErrors(err.message);
      }
    } else {
      console.log('**not validated', errors);
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
          bg='#86A17F'
          shadow='4'
          onPress={handleSubmit}
        >
          Register
        </Button>
        <Text color='#86A17F' py='9'>
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

export default Register;
