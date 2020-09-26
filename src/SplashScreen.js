import React, {Component} from 'react';
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';

function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={{flex: 0.5}} />
      <Image
        source={require('./assets/images/Picture1.png')}
        resizeMode="contain"
        style={{width: '100%', flex: 2}}
      />
      <ActivityIndicator
        style={{flex: 0.5}}
        animating={true}
        color="#bc2b78"
        size="large"
      />
      <View style={{flex: 1.5}} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(74,144,226,1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
