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
} from 'native-base';
import { gql, useMutation } from '@apollo/client';
import { UPDATE_USER_MUTATION } from './graphql/Mutation';

const StreamingOptions = ({ navigation, route }) => {
  const [updateUser, { data }] = useMutation(UPDATE_USER_MUTATION);

  const [netflix, setNetflix] = useState(false);
  const [hbo, setHbo] = useState(false);
  const [hulu, setHulu] = useState(false);
  const [prime, setPrime] = useState(false);
  const [disney, setDisney] = useState(false);

  const handleSubmit = async () => {
    const user = {
      id: route.params.id,
      name: route.params.name,
      username: route.params.username,
      password: route.params.password,
      email: route.params.username,
      netflix: netflix,
      hbo: hbo,
      hulu: hulu,
      prime: prime,
      disney: disney,
    };

    await updateUser({ variables: { updateUserInput: user } });
    navigation.push('GenrePreferences');
  };

  return (
    <View style={{ flex: 1 }}>
      <VStack space={5} w='100%' alignItems='center' justifyContent='center'>
        <Stack mx='4' alignItems='center'>
          <HStack
            space={2}
            w='100%'
            alignItems='center'
            flexWrap='wrap'
            justifyContent='center'
          >
            <Stack>
              <Pressable
                onPress={() => {
                  setNetflix(!netflix);
                }}
              >
                {() => {
                  return (
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
                        Netflix
                      />
                    </Circle>
                  );
                }}
              </Pressable>
            </Stack>
            <Stack>
              <Pressable onPress={() => setPrime(!prime)}>
                {() => {
                  return (
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
                        Prime
                      />
                    </Circle>
                  );
                }}
              </Pressable>
            </Stack>
            <Stack>
              <Pressable onPress={() => setHulu(!hulu)}>
                {() => {
                  return (
                    <Circle
                      size='100px'
                      borderWidth='1'
                      bg={hulu ? 'primary.900' : 'coolGray.100'}
                    >
                      <Avatar
                        source={{
                          uri: 'https://media.glassdoor.com/sqll/43242/hulu-squarelogo-1561078825650.png',
                        }}
                        size='75px'
                        Hulu
                      />
                    </Circle>
                  );
                }}
              </Pressable>
            </Stack>
            <Stack>
              <Pressable onPress={() => setHbo(!hbo)}>
                {() => {
                  return (
                    <Circle
                      size='100px'
                      borderWidth='1'
                      bg={hbo ? 'primary.900' : 'coolGray.100'}
                    >
                      <Avatar
                        source={{
                          uri: 'https://hbomax-images.warnermediacdn.com/2020-05/square%20social%20logo%20400%20x%20400_0.png',
                        }}
                        size='75px'
                        HBO
                      />
                    </Circle>
                  );
                }}
              </Pressable>
            </Stack>
            <Stack>
              <Pressable onPress={() => setDisney(!disney)}>
                {() => {
                  return (
                    <Circle
                      size='100px'
                      borderWidth='1'
                      bg={disney ? 'primary.900' : 'coolGray.100'}
                    >
                      <Avatar
                        source={{
                          uri: 'https://media.wdwnt.com/2020/05/2_disney_logo_29e79241_fbd045f0.png',
                        }}
                        size='75px'
                        Disney
                      />
                    </Circle>
                  );
                }}
              </Pressable>
            </Stack>
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
