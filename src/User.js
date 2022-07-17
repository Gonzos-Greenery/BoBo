import React, {useEffect} from 'react';
import { View, Text, Pressable } from 'react-native';
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
import { updateUser } from './store/user';

const User = ({ navigation }) => {
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [show, setShow] = React.useState(false);
    const [errors, setErrors] = React.useState('');
    const [services, setServices] = React.useState({
        netflix: false,
        hbo: false,
        hulu: false,
        prime: false,
        disney: false,
        });
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch()
    
    const handleClick = () => setShow(!show);
    const validate = (input) => {
        if (!input.includes('@') || !input.includes('.')) {
          setErrors('Invalid email type');
          return false;
        }
        return true;
    };
    
    const handleSubmit = async () => {
        const user = {
            id: auth.id,
            username: username === '' ? auth.username : username,
            password: password === '' ? auth.password : password,
            email: email === '' ? auth.email : email,
            netflix: services.netflix,
            hbo: services.hbo,
            hulu: services.hulu,
            prime: services.prime,
            disney: services.disney,
        };
        if (validate(user.email)) {
            try {
                await dispatch(updateUser(user))
                navigation.push('Movies')
            } catch (err) {
                setErrors(err.message);
            }
        } else {
            console.log('**not validated', errors);
        }
    };

    const logos = {
        netflix:
          'https://www.designmantic.com/blog/wp-content/uploads/2016/07/Netflix-Revamps-Logo.jpg',
        hbo: 'https://hbomax-images.warnermediacdn.com/2020-05/square%20social%20logo%20400%20x%20400_0.png',
        hulu: 'https://media.glassdoor.com/sqll/43242/hulu-squarelogo-1561078825650.png',
        prime:
          'https://cdn.wezift.com/assets/apps/amazon-prime-video/logo/_imgSingle/208890/512x512bb.png?mtime=20220129040734',
        disney:
          'https://media.wdwnt.com/2020/05/2_disney_logo_29e79241_fbd045f0.png',
    };

    useEffect(() => {
        if(auth.netflix !== undefined){
            const {netflix, hbo, prime, hulu, disney} = auth
            setServices({netflix, hbo, prime, hulu, disney})
        }
    }, [auth]);

    return (
        <View style={{backgroundColor: `#A4C69C`, height: '100%'}}>
            <VStack alignItems='center' marginTop={10}>
                <FontAwesomeIcon icon={faUserCircle} size={120} color={"#CEE9C5"}/>
                <FormControl>
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
                <FormControl>
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
                <FormControl>
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
                <View style={{justifyContent:'center', margin: 15}}>
                    <Stack mx='2' alignItems='center'>
                        <HStack flexWrap='wrap' justifyContent='space-around'>
                            {Object.keys(services).map((service) => {
                                return (
                                <Stack key={service}>
                                    <Pressable
                                    onPress={() => {
                                        let newServicesObj = services;
                                        newServicesObj[service] = !services[service];
                                        setServices({ ...newServicesObj });
                                    }}
                                    >
                                    {() => {
                                        return (
                                        <Circle
                                            size='80px'
                                            borderWidth='1'
                                            bg={
                                            services[service] ? 'primary.900' : 'coolGray.100'
                                            }
                                        >
                                            <Avatar
                                            source={{
                                                uri: logos[service],
                                            }}
                                            size='50px'
                                            {...service}
                                            />
                                        </Circle>
                                        );
                                    }}
                                    </Pressable>
                                </Stack>
                                );
                            })}
                        </HStack>
                    </Stack>
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