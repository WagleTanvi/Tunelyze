import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import spotifyReq from './spotifyRequests';
import {set} from 'react-native-reanimated';

function Welcome(props) {
  const [image, setImage] = useState(
    'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y',
  );
  const [user, setUser] = useState('');

  async function getInfo() {
    const resp = await spotifyReq.getProfile();
    if (resp.images != []) {
      setImage(resp.images[0].url);
    }
    setUser(resp.display_name);
  }

  useEffect(() => {
    getInfo();
  }, []);
  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      resizeMode="stretch"
      style={styles.image}
      imageStyle={styles.image_imageStyle}>
      <Image
        source={require('../assets/images/logo_name.png')}
        resizeMode="contain"
        style={styles.image2}
      />
      <Image
        source={{
          uri: image,
        }}
        resizeMode="contain"
        style={styles.image3}
      />
      <Text style={styles.welcomeUser}>Welcome {user}</Text>
      <TouchableOpacity
        style={styles.button1}
        onPress={() => props.navigation.navigate('Genres')}>
        <Text style={styles.startListening}>Start Listening</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
  image_imageStyle: {},
  image2: {
    width: 316,
    height: 84,
    marginTop: 62,
  },
  image3: {
    width: 200,
    height: 200,
    marginTop: 40,
    borderRadius: 100,
  },
  welcomeUser: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    height: '10%',
    textAlign: 'center',
    fontSize: 40,
    marginTop: 46,
    fontWeight: 'bold',
    alignContent: 'center',
    //backgroundColor: 'red',
  },
  button1: {
    height: 75,
    backgroundColor: 'rgba(255,102,153,1)',
    borderRadius: 9,
    shadowOpacity: 1,
    marginTop: 80,
    marginLeft: 26,
    marginRight: 25,
  },
  startListening: {
    // fontFamily: 'amaranth-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 15,
    marginLeft: 31,
    marginRight: 31,
  },
});

export default Welcome;
