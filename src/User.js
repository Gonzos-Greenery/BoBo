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

const john = {"name":"John Smith","username":"johnsmith","email":"johnsmith@gmail.com","disney":false,"hbo":false,"hulu":false,"netflix":true,"prime":true}

const User = ({ navigation }) => {
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [show, setShow] = React.useState(false);
    const [errors, setErrors] = React.useState('');

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
    }};

    return (
        <View>
            <Text>{john.username}</Text>
            <Text>{john.email}</Text>
            
            <View style={{flexDirection: 'row', justifyContent:'center'}}>
                <View>
                    <Circle
                        size='100px'
                        borderWidth='1'
                        bg={john.netflix ? 'primary.900' : 'coolGray.100'}
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
                        bg={john.prime ? 'primary.900' : 'coolGray.100'}
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

            <VStack alignItems='center' marginTop={20}>
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
                    Submit
                    </Button>
            </VStack>
        </View>
    );
};
export default User;