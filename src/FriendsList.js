import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
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
import { faUser } from '@fortawesome/free-solid-svg-icons';


const FriendsList = ({ navigation }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [search, setSearch] = useState('');
  const [listChange, setListChange] = useState(0);

  const { auth, user } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchUser(auth.id));
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      setTimeout(function () {
        dispatch(fetchUser(auth.id));
      }, 300);
    }
  }, [listChange]);

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
      setListChange(listChange + 1);
    }
  };

  return (
    <SafeAreaView style={styleSheet.container}>
      <ScrollView>
        <VStack space={5} w='100%' alignItems='center'>
          <Heading size='2xl'>Friend List</Heading>
          <View style={{ textAlign: 'center', width: '90%' }}>
            <FlatList
              data={user.friends}
              renderItem={({ item, index }) => {
                return (
                  <View style={styleSheet.user}>
                    <FontAwesomeIcon
                      icon={faUser}
                      size={30}
                      color={'#8A9D8C'}
                      style={{
                        marginRight: 10,
                        marginLeft: 10,
                        alignSelf: 'center',
                      }}
                    />
                    <Text style={{ fontSize: 16, alignSelf: 'center' }}>
                      {`${item.name} @${item.username}`}
                    </Text>
                    <Pressable
                      onPress={() => {
                        dispatch(removeFriend(user.id, item.id));
                        toast.show({
                          description: 'Friend removed',
                        });
                        setListChange(listChange + 1);
                      }}
                    >
                      <CloseIcon
                        size='md'
                        style={{
                          marginRight: 5,
                          marginLeft: 5,
                          alignSelf: 'center',
                        }}
                      />
                    </Pressable>
                  </View>
                );
              }}
            />
          </View>
          <Heading fontSize='lg'>Add Friends</Heading>
          <HStack alignItems='center' space={2} w='75%'>
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
      </ScrollView>
    </SafeAreaView>
  );
};
const styleSheet = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: `rgba(164,198,156,1)`,
  },
  user: {
    height: 60,
    borderRadius: 13,
    width: '75%',
    alignSelf: 'center',
    marginTop: 7,
    textAlign: 'justify',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default FriendsList;
