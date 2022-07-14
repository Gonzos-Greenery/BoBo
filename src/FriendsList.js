import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, SafeAreaView } from 'react-native';
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
  Pressable,
  Box,
  Heading,
  HStack,
  SearchIcon,
  CloseIcon,
} from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons/faFaceSmile';

const Friend = (props) => {
  const friend = props.friend;
  const removeFriend = (friendId) => {
    //Need route for unfriending
    console.log('Unfriend friend with ID: ', friendId);
  };
  return (
    <HStack alignItems='center' space={4}>
      <Box
        w='70%'
        h='60px'
        bg='primary.300'
        rounded='md'
        shadow={3}
        justifyContent='center'
        alignItems='center'
      >
        <HStack space={5} alignItems='center'>
          <FontAwesomeIcon icon={faFaceSmile} />
          <Box w='60px' fontWeight='bold'>
            {friend.username}
          </Box>
          <Box w='150px'>{friend.email}</Box>
        </HStack>
      </Box>
      <Pressable onPress={() => removeFriend(friend.id)}>
        <CloseIcon size='xl' />
      </Pressable>
    </HStack>
  );
};

const friends = [
  { id: 1, username: 'Lauren', email: 'laurens@email.com' },
  { id: 2, username: 'David', email: 'davids@email.com' },
  { id: 3, username: 'Alli', email: 'allis@email.com' },
  { id: 4, username: 'Sam', email: 'sams@email.com' },
];

const FriendsList = ({ navigation }) => {
  const dispatch = useDispatch();

  // Need to create store
  // const friends = useSelector((state) => { state.friends;
  // });

  // useEffect(() => {
  //   dispatch(fetchFriends());
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack space={5} w='100%' alignItems='center'>
        <Heading size='3xl'>Friend List</Heading>
        {friends.map((friend) => {
          return <Friend friend={friend} key={friend.username} />;
        })}
        <VStack
          w='75%'
          space={3}
          alignSelf='center'
          alignItems='center'
          justifyItems='center'
        >
          <Heading fontSize='lg'>Add Friends</Heading>
          <HStack alignItems='center' w='100%'>
            <SearchIcon size='xl' />
            <Input
              placeholder='Search By Email'
              width='80%'
              borderRadius='4'
              py='3'
              px='1'
              fontSize='14'
            />
          </HStack>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default FriendsList;
