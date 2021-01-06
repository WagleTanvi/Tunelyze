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

function JoinGame(props) {

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      resizeMode="stretch"
      style={styles.image}
      imageStyle={styles.image_imageStyle}>
      <View style={styles.button2Column}>
        <View style={styles.screenTitle}> 
            <Text style={styles.title}>Join Game</Text>
        </View>
        <View style={styles.descView}>
            <Text style={styles.description}>Did your friend send you a code?</Text>
        </View>
        <View style={styles.code}>
            <View style={styles.gameCode}> 
                <Text style={styles.label}>Enter Game Code Here:</Text>
            </View>
            <TextInput placeholder="WXYZ" style={styles.TextInput}></TextInput> 
        </View>
        <TouchableOpacity
          style={styles.submit}
          onPress={() =>{
            
          }}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.endWrapperFiller} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  TextInput:{
      flex:4,
      backgroundColor: 'white',
      fontSize: RFPercentage(5),
      textAlign: 'center',
      marginBottom: '5%',
      width: '90%'
  },
  gameCode:{
    flex: 2,
    justifyContent: 'center'
  },
  code:{
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '5%'
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
  image_imageStyle: {},
  endWrapperFiller: {
    flex: 1,
  },
  screenTitle: {
    flex: 0.5,
    width: '90%',
    justifyContent: 'center',
    marginTop: '5%'
  },
  title: {
    //fontFamily: 'amaranth-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(4),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  descView: {
    marginVertical: '2.5%',
    flex: 0.7,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // borderColor: 'green',
    // borderWidth: 2,
  },
  submit: {
    marginBottom: '3%',
    flex: 1,
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
    fontSize: RFPercentage(2.7),
    textAlign: 'center',
  },
  button2Column: {
    flex: 2,
    width: '90%',
    //backgroundColor: 'red',
    alignItems: 'center',
  },
  label: {
    //fontFamily: 'amaranth-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(3),
    textAlign: 'center',
    fontWeight: 'bold'
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
)(JoinGame);
