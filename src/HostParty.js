import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// import { gql, useMutation } from '@apollo/client';
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
} from 'native-base';

const HostParty = ({ navigation }) => {
  const [partyName, setPartyName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [time, setTime] = React.useState(new Date(Date.now()));
  const [timePicker, setTimePicker] = React.useState(false);
  const [datePicker, setDatePicker] = React.useState(false);

  const onDateSelected = (event, value) => {
    setDate(value);
    setDatePicker(false);
  };

  const onTimeSelected = (event, value) => {
    setTime(value);
    setTimePicker(false);
  };

  const handleSubmit = async () => {
    //  const data = await createParty({variables: { partyInput: newPartyInput });
    // navigation.push('PartyPage', data.data.partyPage);
    console.log('submitted');
  };

  return (
    <View style={{ flex: 1 }}>
      <VStack space={5} w='100%' alignItems='center'>
        <Center>Host a BOBO Party</Center>
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
                minW='75%'
                alignItems='center'
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
        <VStack w='75%' space={3} alignSelf='center' alignItems='center'>
          <Heading fontSize='lg'>Invite Friends</Heading>
          <HStack alignItems='center'>
            <SearchIcon size='3xl' />
            <Input
              placeholder='Search Friends List'
              width='80%'
              borderRadius='4'
              py='3'
              px='1'
              fontSize='14'
            />
          </HStack>
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
    </View>
  );
};

const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    padding: 6,
    alignItems: 'center',
    backgroundColor: 'white',
  },

  text: {
    fontSize: 25,
    color: 'red',
    padding: 3,
    marginBottom: 10,
    textAlign: 'center',
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
