import React, { useState, useEffect, Select } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import axios from 'axios';
import { faUser } from '@fortawesome/free-solid-svg-icons';
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
  KeyboardAvoidingView,
} from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createNewParty } from './store/party';
import { fetchUser, fetchUserByUsername } from './store/user';

const HostParty = ({ navigation }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [partyName, setPartyName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date(Date.now()));
  const [timeString, setTimeString] = useState('');
  const [timePicker, setTimePicker] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [search, setSearch] = useState('');
  const [invitees, setInvitees] = useState([]);
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
      `https://bobo-server.herokuapp.com/api/users/username/${search}`
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
        description: 'User not found, please try again',
      });
    }
    setSearch('');
  };

  const handleSubmit = () => {
    const location = address;
    if (!timeString) {
      setTimeString(
        time.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    }
    dispatch(
      createNewParty(user.id, partyName, location, date, timeString, invitees)
    );
    navigation.push('LoggedIn');
  };

  return (
    <SafeAreaView style={styleSheet.container}>
      <VStack space={3} w='100%' alignItems='center'>
        <Heading size='xl' color='#EFEECE'>
          Host a BOBO Party
        </Heading>
        <FormControl isRequired>
          <Stack mx='3' alignItems='center'>
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
                minW='75%'
                alignItems='center'
              >
                {date.toDateString()}
              </Box>
            </Pressable>
          </Stack>
        </FormControl>
        {datePicker &&
          (Platform.OS !== 'web' ? (
            <DateTimePicker
              value={date}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onDateSelected}
              style={styleSheet.datePicker}
            />
          ) : (
            <Input
              type='date'
              placeholder='MM/DD/YYYY'
              onSubmitEditing={(e) => {
                setDate(new Date(e.target.value));
                setDatePicker(false);
              }}
            />
          ))}
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
                {timeString
                  ? timeString
                  : time.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
              </Box>
            </Pressable>
          </Stack>
        </FormControl>
        {timePicker &&
          (Platform.OS !== 'web' ? (
            <DateTimePicker
              value={time}
              mode={'time'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={false}
              onChange={onTimeSelected}
              style={styleSheet.datePicker}
            />
          ) : (
            <Input
              type='text'
              placeholder='ex: 8:00 PM'
              onSubmitEditing={(e) => {
                setTimeString(e.target.value);
                setTimePicker(false);
              }}
            />
          ))}
        <Heading alignSelf='center' fontSize='lg'>
          Invite Friends
        </Heading>
        <KeyboardAvoidingView>
          <ScrollView>
            <HStack justifyItems='center' alignItems='center' space={2} w='75%'>
              <SearchIcon size='3xl' />
              <Input
                placeholder='Search By Username'
                width='75%'
                borderRadius='4'
                py='3'
                px='1'
                fontSize='14'
                value={search}
                onChangeText={setSearch}
              />
              <Pressable onPress={handleSearchSubmit}>
                <Box>Invite</Box>
              </Pressable>
            </HStack>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={{ textAlign: 'center', width: '75%' }}>
          <FlatList
            data={invitees}
            renderItem={({ item, index }) => {
              return (
                <View style={styleSheet.user}>
                  <FontAwesomeIcon
                    icon={faUser}
                    size={30}
                    color={'#8A9D8C'}
                    style={{
                      marginRight: 30,
                      marginLeft: 10,
                      alignSelf: 'center',
                    }}
                  />
                  <Text style={{ fontSize: 16, alignSelf: 'center' }}>
                    {item.name}
                  </Text>
                </View>
              );
            }}
          />
        </View>
        <Button
          _text={{ color: '#F7F6D4' }}
          w='80%'
          bg='primary.900'
          shadow='4'
          onPress={handleSubmit}
          marginTop='50'
        >
          Create Party
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

const styleSheet = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: `rgba(164,198,156,1)`,
    flex: 1,
  },
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
  user: {
    height: 60,
    borderRadius: 13,
    width: '100%',
    alignSelf: 'center',
    marginTop: 7,
    textAlign: 'justify',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});

export default HostParty;
