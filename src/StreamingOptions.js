import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
  Pressable,
  Stack,
  VStack,
  Circle,
  HStack,
  Avatar,
  Image,
  Button,
  Heading,
} from 'native-base';
// import { gql, useMutation } from '@apollo/client';
// import { UPDATE_USER_MUTATION } from './graphql/Mutation';

const StreamingOptions = ({ navigation, route }) => {
  // const [updateUser, { data }] = useMutation(UPDATE_USER_MUTATION);
  const servicesObj = {
    netflix: false,
    hbo: false,
    hulu: false,
    prime: false,
    disney: false,
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

  const [services, setServices] = useState(servicesObj);

  const handleSubmit = async () => {
    const user = {
      id: route.params.id,
      name: route.params.name,
      username: route.params.username,
      password: route.params.password,
      email: route.params.username,
      netflix: services.netflix,
      hbo: services.hbo,
      hulu: services.hulu,
      prime: services.prime,
      disney: services.disney,
    };

    await updateUser({ variables: { updateUserInput: user } });
    navigation.push('GenrePreferences');
  };

  return (
    <View style={{ flex: 1 }}>
      <VStack space={5} w='100%' alignItems='center' justifyContent='center'>
        <Heading>
          Please select all streaming services that you subscribe to:
        </Heading>
        <Stack mx='4' alignItems='center'>
          <HStack
            space={2}
            w='100%'
            alignItems='center'
            flexWrap='wrap'
            justifyContent='center'
          >
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
                          size='100px'
                          borderWidth='1'
                          bg={
                            services[service] ? 'primary.900' : 'coolGray.100'
                          }
                        >
                          <Avatar
                            source={{
                              uri: logos[service],
                            }}
                            size='75px'
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

        <Stack>
          <Button
            _text={{ color: 'white' }}
            bg='primary.900'
            shadow='4'
            onPress={handleSubmit}
          >
            Next
          </Button>
        </Stack>
      </VStack>
    </View>
  );
};

export default StreamingOptions;
