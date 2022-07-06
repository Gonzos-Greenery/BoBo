import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Pressable,
  Button,
} from 'react-native';

const StreamingOptions = (props) => {
  const userId = props.userId;
  const [netflix, setNetflix] = useState(false);
  const [hbo, setHbo] = useState(false);
  const [hulu, setHulu] = useState(false);
  const [prime, setPrime] = useState(false);
  const [disney, setDisney] = useState(false);

  const updateUser = () => {
    const user = {
      id: userId,
      netflix: netflix,
      hbo: hbo,
      hulu: hulu,
      prime: prime,
      disney: disney,
    };
    // const updatedUser = useMutation(root, user);

    console.log(user);
  };
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Pressable onPress={() => setNetflix(!netflix)}>
          <Image
            source={{
              uri: 'https://www.designmantic.com/blog/wp-content/uploads/2016/07/Netflix-Revamps-Logo.jpg',
            }}
            style={styles.buttonLogo}
          />
        </Pressable>
        <Pressable onPress={() => setPrime(!prime)}>
          <Image
            source={{
              uri: 'https://cdn.wezift.com/assets/apps/amazon-prime-video/logo/_imgSingle/208890/512x512bb.png?mtime=20220129040734',
            }}
            style={styles.buttonLogo}
          />
        </Pressable>
        <Pressable onPress={() => setHulu(!hulu)}>
          <Image
            source={{
              uri: 'https://media.glassdoor.com/sqll/43242/hulu-squarelogo-1561078825650.png',
            }}
            style={styles.buttonLogo}
          />
        </Pressable>
        <Pressable onPress={() => setHbo(!hbo)}>
          <Image
            source={{
              uri: 'https://hbomax-images.warnermediacdn.com/2020-05/square%20social%20logo%20400%20x%20400_0.png',
            }}
            style={styles.buttonLogo}
          />
        </Pressable>
        <Pressable onPress={() => setDisney(!disney)}>
          <Image
            source={{
              uri: 'https://media.wdwnt.com/2020/05/2_disney_logo_29e79241_fbd045f0.png',
            }}
            style={styles.buttonLogo}
          />
        </Pressable>
      </View>
      <Button style={styles.nextButton} onPress={updateUser()}>
        Next
      </Button>
    </View>
  );
};

// React Native Styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonLogo: {
    padding: 10,
    margin: 5,
    height: 50,
    width: 50,
    resizeMode: 'stretch',
  },
  nextButton: {
    padding: 10,
    margin: 5,
    height: '30px',
    width: '100px',
  },
});

export default StreamingOptions;
