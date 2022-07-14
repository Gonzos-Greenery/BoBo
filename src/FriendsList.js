import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, SafeAreaView } from 'react-native';
import { fetchUser, addFriend, removeFriend } from './store/user';
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
  useToast,
} from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons/faFaceSmile';

const Friend = (props) => {
  const friend = props.friend;
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => {
    return state;
  });

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
      <Pressable
        onPress={() => {
          dispatch(removeFriend(user.id, friend.id));
          toast.show({
            description: 'Friend removed',
          });
        }}
      >
        <CloseIcon size='xl' />
      </Pressable>
    </HStack>
  );
};

const FriendsList = ({ navigation }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [search, setSearch] = useState('');

  const { auth, user } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchUser(auth.id));
    }
  }, [auth]);

  const handleSubmit = () => {
    const result = dispatch(addFriend(user.id, search));
    if (!result) {
      toast.show({
        description: 'Username not found',
      });
    } else {
      toast.show({
        description: 'Friend added!',
      });
      setSearch('');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack space={5} w='100%' alignItems='center'>
        <Heading size='3xl'>Friend List</Heading>
        {user.friends &&
          user.friends.map((friend) => {
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
              placeholder='Search By Username'
              width='80%'
              borderRadius='4'
              py='3'
              px='1'
              fontSize='14'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Pressable onPress={handleSubmit}>
              <Box>Submit</Box>
            </Pressable>
          </HStack>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default FriendsList;
