import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {
  setAccessToken,
  setRefreshToken,
  setExpr,
  setSigingIn,
} from '../redux/authenticationSlice';
import {RFPercentage} from 'react-native-responsive-fontsize';

function MainMultiPlayer(props) {

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      resizeMode="stretch"
      style={styles.image}
      imageStyle={styles.image_imageStyle}>
      <Image
        source={require('../assets/images/Picture1.png')}
        resizeMode="contain"
        style={styles.image2}
      />
      <View style={styles.button2Column}>
        <View style={styles.descView}>
            <Text style={styles.description}>Want to Play with Friends?</Text>
        </View>
        <TouchableOpacity
          style={styles.createGameButton}
          onPress={() => {
            console.log("CreateGame")
            props.navigation.navigate('CreateGame');
          }}>
          <Text style={styles.buttonText}>Create Game</Text>
        </TouchableOpacity>
        <View style={styles.descView}>
            <Text style={styles.description}>Already have a code?</Text>
        </View>
        <TouchableOpacity
          style={styles.joinGameButton}
          onPress={() =>{
            console.log("CreateGame")
            props.navigation.navigate('TooLate');
          }}>
          <Text style={styles.buttonText}>Join Game</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.endWrapperFiller} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
  },
  image_imageStyle: {},
  endWrapperFiller: {
    flex: 1,
  },
  createGameButton: {
    marginBottom: '2%',
    flex: 1.5,
    backgroundColor: 'rgba(0,83,143,1)',
    borderRadius: 9,
    shadowOpacity: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descView: {
    marginVertical: '2.5%',
    flex: 0.7,
    width: '80%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  joinGameButton: {
    marginBottom: '3%',
    flex: 1.5,
    backgroundColor: 'rgba(255,102,153,1)',
    borderRadius: 9,
    shadowOpacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    //fontFamily: 'amaranth-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(3),
    textAlign: 'center',
  },
  description: {
    //fontFamily: 'amaranth-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(2.5),
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button2Column: {
    flex: 2,
    width: '90%',
    //backgroundColor: 'red',
    alignItems: 'center',
  },
  image2: {
    flex: 3,
    height: '100%',
    width: '100%',
  },
});

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
  };
};
const mapDispatchToProps = {
  setAccessToken,
  setRefreshToken,
  setExpr,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainMultiPlayer);
