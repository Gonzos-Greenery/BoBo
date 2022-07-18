import React from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Text,
  Input,
  Icon,
  MaterialIcons,
  Label,
  Button,
  VStack,
  FormControl,
  Center,
  Stack,
  useToast,
  WarningOutlineIcon,
} from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { addFriendToParty } from './store/party';

export default ({ navigation, route }) => {
  const [friend, setFriend] = React.useState('');
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSubmit = async () => {
    //Send the request to the backend to validate + add user to that party
    //navigate back to that party
    const data = await dispatch(addFriendToParty(friend, store.party.id));

    if (data === true) {
      navigation.navigate('PartyView', { id: store.party.id });
    } else {
      toast.show({
        description: 'User did not exist, Try Again',
      });
    }
  };
  return (
    <View >
       
      <Text style={styles.textMain}> Current Attendees: </Text>
      {route.params.attendees.map((user, idx) => (
        <View key={idx}>
          <Text style={styles.textMain}>{user.name}</Text>
        </View>
      ))}
      <VStack space={2} w="100%" alignItems="center">
        <FormControl>
          <Stack mx="4" alignItems="center">
            <FormControl.Label py="1" w="75%">
              username
            </FormControl.Label>
            <Input
              size="lg"
              variant="underlined"
              maxW="300px"
              backgroundColor={'white'}
              w="75%"
              onChangeText={(info) => setFriend(info)}
              autoCapitaliz="none"
            />
          </Stack>
        </FormControl>
      </VStack>
      <Button onPress={handleSubmit}>Submit</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: `rgba(164,198,156,1)`,
    alignItems: 'center',
  },
  textMain: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#404746'
  },
  btn: {
    height: 55,
    borderRadius: 10,
    width: '75%',
    justifyContent: 'center',
    backgroundColor: '#8A9D8C',
    bottom: 0,
    color: '#404746',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    justifyContent: 'space-evenly',
    color:'#404746'
  },
  user: {
    height: 55,
    borderRadius: 10,
    width: '75%',
    alignSelf: 'center',
    marginTop: 7,
    textAlign: 'justify',
  },
});
