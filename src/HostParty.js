import React, { useState, useEffect, Select } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
// import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
// import { gql, useMutation } from '@apollo/client';
import axios from 'axios';
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
  useToast,
} from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createNewParty } from './store/party';
import { fetchUser, fetchUserByUsername } from './store/user';

const Invitee = (props) => {
  const friend = props.friend;

  return (
    <Box
      bg='primary.100'
      w='75%'
      rounded='md'
      shadow={3}
      justifyContent='center'
      alignItems='center'
    >
      {`${friend.name} ( @${friend.username} )`}
    </Box>
  );
};

const HostParty = ({ navigation }) => {
  const [partyName, setPartyName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date(Date.now()));
  const [timePicker, setTimePicker] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [search, setSearch] = useState('');
  const [invitees, setInvitees] = useState([]);
  const dispatch = useDispatch();
  const toast = useToast();
  const { auth, user } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchUser(auth.id));
    }
  }, [auth]);

  const onDateSelected = (event, value) => {
    setDate(value);
    setDatePicker(false);
  };

  const onTimeSelected = (event, value) => {
    setTime(value);
    setTimePicker(false);
  };

  const handleSearchSubmit = async () => {
    //Send the request to the backend to validate + add user to that party
    //navigate back to that party
    const { data } = await axios.get(
      `http://localhost:8080/api/users/username/${search}`
    );

    if (data) {
      toast.show({
        description: 'Added',
      });
      const newInvitees = invitees;
      newInvitees.push(data);
      setInvitees(newInvitees);
    } else {
      toast.show({
        description: 'User did not exist, Try Again',
      });
    }
    setSearch('');
  };

  const handleSubmit = () => {
    const location = address;
    dispatch(createNewParty(user.id, partyName, location, date, invitees));
    navigation.push('Movies');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <VStack space={5} w='100%' alignItems='center'>
          <Heading size='2xl'>Host a BOBO Party</Heading>
          <FormControl isRequired>
            <Stack mx='4' alignItems='center'>
              <FormControl.Label py='1' w='75%'>
                Party Name
              </FormControl.Label>
              <Input
                size='2xl'
                variant='underlined'
                w='75%'
                value={partyName}
                onChangeText={setPartyName}
                label='partyName'
                placeholder='Party Name'
              ></Input>
            </Stack>
          </FormControl>
          <FormControl isRequired>
            <Stack mx='4' alignItems='center'>
              <FormControl.Label pb='0' w='75%'>
                Where
              </FormControl.Label>
              <Input
                size='2xl'
                variant='underlined'
                w='75%'
                value={address}
                onChangeText={setAddress}
                label='address'
                placeholder='Party Address'
              ></Input>
            </Stack>
          </FormControl>
          <FormControl isRequired>
            <Stack mx='4' alignItems='center'>
              <FormControl.Label pb='0' w='75%'>
                Date
              </FormControl.Label>
              <Pressable onPress={() => setDatePicker(!datePicker)}>
                <Box
                  borderWidth='1'
                  borderColor='coolGray.300'
                  shadow='3'
                  bg='coolGray.100'
                  p='5'
                  rounded='8'
                  alignItems='center'
                  w='100%'
                >
                  {date.toDateString()}
                </Box>
              </Pressable>
            </Stack>
          </FormControl>
          {datePicker && (
            <DateTimePicker
              value={date}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onDateSelected}
              style={styleSheet.datePicker}
            />
          )}
          <FormControl isRequired>
            <Stack mx='4' alignItems='center'>
              <FormControl.Label pb='0' w='75%'>
                Time
              </FormControl.Label>
              <Pressable onPress={() => setTimePicker(!timePicker)}>
                <Box
                  borderWidth='1'
                  borderColor='coolGray.300'
                  shadow='3'
                  bg='coolGray.100'
                  p='5'
                  rounded='8'
                  minW='75%'
                  alignItems='center'
                >
                  {time.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Box>
              </Pressable>
            </Stack>
          </FormControl>
          {timePicker && (
            <DateTimePicker
              value={time}
              mode={'time'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={false}
              onChange={onTimeSelected}
              style={styleSheet.datePicker}
            />
          )}
          <VStack space={3} alignSelf='center' alignItems='center' w='75%'>
            <Heading fontSize='lg'>Invite Friends</Heading>
            <HStack alignItems='center' space={2}>
              <SearchIcon size='3xl' />
              <Input
                placeholder='Search By Username'
                width='75%'
                borderRadius='4'
                py='3'
                px='1'
                fontSize='14'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Pressable onPress={handleSearchSubmit}>
                <Box>Invite</Box>
              </Pressable>
            </HStack>
          </VStack>
          <VStack space={3} alignSelf='center' alignItems='center' w='100%'>
            {invitees.map((invitee) => {
              return <Invitee friend={invitee} key={invitee.username} />;
            })}
          </VStack>
          <Button
            _text={{ color: '#F7F6D4' }}
            w='80%'
            bg='primary.900'
            shadow='4'
            onPress={handleSubmit}
          >
            Create Party
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    padding: 6,
    alignItems: 'center',
    backgroundColor: 'white',
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});

export default HostParty;
