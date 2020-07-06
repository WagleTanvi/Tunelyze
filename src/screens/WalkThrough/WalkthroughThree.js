import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

function WalkthroughThree(props) {
  return (
    <View style={styles.container}>
      <Text
        style={styles.tunelyze1}
        numberOfLines={3}
        adjustsFontSizeToFit={true}>
        {' '}
        Guess the song and/or the artist!
      </Text>
      <Image
        source={require('../../assets/images/guess.png')}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.endWrapperFiller} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(74,144,226,1)',
    padding: 40,
  },
  endWrapperFiller: {
    flex: 1,
  },
  tunelyze1: {
    marginHorizontal: '7%',
    flex: 1.5,
    fontFamily: 'Acme-Regular',
    //paddingVertical: 20,
    marginVertical: 20,
    //fontFamily: 'roboto-700',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(6),
    textAlign: 'center',
    //backgroundColor: 'red',
  },
  image: {
    flex: 3.5,
    //backgroundColor: 'red',
    width: '100%',
    //borderRadius: 70,
  },
});

export default WalkthroughThree;
