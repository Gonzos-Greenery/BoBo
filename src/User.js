import React from 'react';
import { View, Text } from 'react-native';
import {
  Input,
  Button,
  VStack,
  FormControl,
  Stack,
  HStack,
  Avatar,
  Circle
} from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';

const User = ({ navigation }) => {
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [show, setShow] = React.useState(false);
    const [errors, setErrors] = React.useState('');
    const { auth } = useSelector(state => state);
    
    const handleClick = () => setShow(!show);
    const validate = () => {
        if (!email.includes('@') || !email.includes('.')) {
          setErrors('Invalid email type.');
          return false;
        }
        return true;
      };
    
    const handleSubmit = async () => {
    if (validate()) {
        const newUserInput = { username, email, password };
        try {
        //update user here
        const data = await registerUser({
            variables: { registerInput: newUserInput },
        });
        navigation.push('User');
        } catch (err) {
        setErrors(err.message);
        }
    } else {
        console.log('**not validated', errors);
    }};



    const {netflix, hbo, prime, hulu, disney} = auth
    return (
        <View style={{backgroundColor: `#A4C69C`, height: '100%'}}>
            <VStack alignItems='center' marginTop={20}>
                <FontAwesomeIcon icon={faUserCircle} size={120} color={"#CEE9C5"}/>
                <FormControl isRequired>
                    <Stack mx='4' alignItems='center' marginTop='10'>
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
                        placeholder={auth.username}
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
                        placeholder={auth.email}
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
                <View style={{flexDirection: 'row', justifyContent:'center', margin: 10}}>
                    <View>
                        <Circle
                            size='100px'
                            borderWidth='1'
                            bg={netflix ? 'primary.900' : 'coolGray.100'}
                        >
                        <Avatar
                            source={{
                                uri: 'https://www.designmantic.com/blog/wp-content/uploads/2016/07/Netflix-Revamps-Logo.jpg',
                            }}
                            size='75px'
                        />
                        </Circle>
                    </View>
                    <View>
                        <Circle
                            size='100px'
                            borderWidth='1'
                            bg={prime ? 'primary.900' : 'coolGray.100'}
                        >
                        <Avatar
                            source={{
                                uri: 'https://cdn.wezift.com/assets/apps/amazon-prime-video/logo/_imgSingle/208890/512x512bb.png?mtime=20220129040734',
                            }}
                            size='75px'
                        />
                        </Circle>
                    </View>
                </View>
                <Button
                _text={{ color: '#F7F6D4' }}
                w='70%'
                bg='#86A17F'
                shadow='4'
                onPress={handleSubmit}
                >
                Submit
                </Button>
            </VStack>
        </View>
    );
};
export default User;