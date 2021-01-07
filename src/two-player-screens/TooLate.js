import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput
} from 'react-native';
import {connect} from 'react-redux';
import {
  setAccessToken,
  setRefreshToken,
  setExpr,
  setSigingIn,
} from '../redux/authenticationSlice';
import {RFPercentage} from 'react-native-responsive-fontsize';

function TooLate(props) {

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      resizeMode="stretch"
      style={styles.image}>
      <View style={styles.button2Column}>
        <View style={styles.topTitle}>
            <Text style={styles.title}>Too Late!</Text>
            <Text style={styles.subtitle}>Tanvi Buzzed First</Text>
            <Text style={styles.italicsSubtitle}>You can try next round!</Text>
        </View>
        <View style={styles.mainView}>
            <View style={{backgroundColor: 'rgba(0,83,143,1)', width: '100%', height: "60%", marginTop: '5%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '5%'}}>
                <Text style={styles.title}>Waiting for Tanvi to answer...</Text>
            </View>
        </View>
        <View style={styles.filler}>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
  },
  filler: {
    flex: 1,
  },
  textInputStyle:{
    backgroundColor: "white", 
    height: "60%", 
    flex: 4,
    textAlign: 'center',
    fontSize: RFPercentage(2.5),
    borderRadius: 5
  },
  topTitle: {
    marginTop: '5%',
    flex: 2,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    marginVertical: '5%',
    flex: 4,
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 3
  },
  submitButton: {
    marginHorizontal: '5%',
    flex: 3,
    backgroundColor: 'rgba(105,156,252,1)',
    borderRadius: 9,
    shadowOpacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  cancelButton: {
    marginHorizontal: '5%',
    flex: 3,
    backgroundColor: 'rgba(0,83,143,1)',
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
    fontSize: RFPercentage(3),
    textAlign: 'left',
    fontWeight: 'bold',
    flex: 2,
  },
  scoreText: {
    //fontFamily: 'amaranth-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(2.5),
    textAlign: 'right',
    fontWeight: 'bold'
  },
  subtitle: {
    //fontFamily: 'amaranth-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(3.3),
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: '5%'
  },
  italicsSubtitle: {
    //fontFamily: 'amaranth-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(2.7),
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '5%',
    fontStyle: 'italic'
  },
  title: {
    //fontFamily: 'amaranth-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(4.5),
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: '5%'
  },
  button2Column: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    margin: '10%'
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
)(TooLate);
