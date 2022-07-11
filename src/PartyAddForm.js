import React from 'react';
import { View, Text } from 'react-native';
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
  useToast,
  WarningOutlineIcon,
} from 'native-base';

export default ({navigation, route}) => {
    const [friend, setFriend] = React.useState('')
    const currAttendees = route.params.attendees

    const handleSubmit = () => {
        //Send the request to the backend to validate + add user to that party 
        //navigate back to that party 
        console.log(friend)
        navigation.navigate('PartyView')
    }
    return (
        <View>
            {currAttendees.map((user,idx) => (
                <View key={idx}>
                    <Text>
                        {user.name}
                    </Text>
                </View>
            ))}

            <VStack space={2} w="100%" alignItems="center">
                <FormControl>
                    <Stack mx="4" alignItems="center">
                        <FormControl.Label py="1" w="75%">
                            email
                        </FormControl.Label>
                        <Input 
                            size="lg"
                            variant="underlined"
                            maxW="300px"
                            w="75%"
                            onChangeText={(info) => setFriend(info)}
                            autoCapitaliz='none'
                        />
                    </Stack>
                    <Button onPress={handleSubmit}>Submit</Button>
                </FormControl>
            </VStack>
        </View>
    )
}