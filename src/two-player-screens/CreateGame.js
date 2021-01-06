import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {
  setAccessToken,
  setRefreshToken,
  setExpr,
  setSigingIn,
} from '../redux/authenticationSlice';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Slider from '@react-native-community/slider';

function CreateGame(props) {

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      resizeMode="stretch"
      style={styles.image}
      imageStyle={styles.image_imageStyle}>
      <View style={styles.button2Column}>
        <View style={styles.screenTitle}> 
            <Text style={styles.title}>Create Game</Text>
        </View>
        <View style={styles.top}>
            {/* Game Name */}
            <View style={styles.first}> 
                <View style={styles.descView}>
                    <Text style={styles.description}>Enter Game Name</Text>
                </View>
                <TextInput placeholder="Hello" style={styles.TextInput}></TextInput> 
            </View>
            {/* Players */}
            <View style={styles.second}> 
                <View style={styles.descView}>
                    <Text style={styles.description}>Number of Players</Text>
                </View>
                <Slider  minimumValue={2} maximumValue={6} style={styles.slider}></Slider>
                <View style={styles.number}>
                    <Text style={styles.description}>3</Text>
                </View>
            </View>
            {/* Playlist */}
            <View style={styles.playlist}>
                <View style={styles.selectedView}>
                    <Text style={styles.description}>Selected Playlist: None</Text>
                </View>
                <TouchableOpacity
                    style={styles.selectPlaylistButton}
                    onPress={() => {
                    }}>
                    <Text style={styles.buttonText}>Select Playlist</Text>
                </TouchableOpacity>
            </View>
            {/* Generate Code Button */}
            <TouchableOpacity
                style={styles.generateCode}
                onPress={() => {
                }}>
                <Text style={styles.buttonText}>Generate Code</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
            {/* Game Code */}
            <View style={styles.gameCode}> 
                <View style={styles.gameCodeView}>
                    <Text style={styles.title}>Game Code</Text>
                    <Text style={styles.italicsDesc}>Share with your friends!</Text>
                </View>
                <View style={styles.rect}>
                    <Text style={styles.code}>XYZW</Text>
                </View>
            </View>
            {/* Join Game */}
            <TouchableOpacity
                style={styles.joinGameButton}
                onPress={() => {
                }}>
                <Text style={styles.buttonText}>Join Game</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  slider: {
    flex: 2.5,
    
  },
  number: {
    flex: 0.5,
    width: '90%'
  },
  rect: {
    flex: 4,
    width: '100%',
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center'
  },
  code: {
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(5),
    fontWeight: 'bold',
  },
  TextInput: {
    flex: 3,
    backgroundColor: 'white',
    height: '50%',
    textAlign: 'center'
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
  image_imageStyle: {},
  endWrapperFiller: {
    flex: 1,
  },
  selectPlaylistButton: {
    flex: 4,
    backgroundColor: 'gray',
    borderRadius: 9,
    shadowOpacity: 1,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descView: {
    marginVertical: '0.5%',
    flex: 2,
   // width: '80%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // borderWidth: 10,
    // borderColor: 'blue'
  },
  selectedView: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: '3%'
  },
  gameNameView: {
    flex: 3,
   // width: '80%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  gameCodeView: {
    marginBottom: '2%',
    flex: 2,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  first: {
    marginBottom: '2.5%',
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 10,
    // borderColor: 'green',
    flexDirection: 'row'
  },
  second: {
    marginBottom: '2.5%',
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 10,
    // borderColor: 'green',
    flexDirection: 'row'
  },
  screenTitle: {
    flex: 0.5,
    width: '90%',
    justifyContent: 'center',
    // alignItems: 'center',
    // borderWidth: 10,
    borderColor: 'green'
  },
  gameCode: {
    marginBottom: '5%',
    flex: 2,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 10,
    // borderColor: 'green'
  },
  playlist: {
    marginBottom: '5%',
    flex: 1.5,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '2%'
    // borderWidth: 10,
    // borderColor: 'green',
  },
  joinGameButton: {
    marginBottom: '3%',
    flex: 0.7,
    backgroundColor: 'rgba(255,102,153,1)',
    borderRadius: 9,
    shadowOpacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  generateCode: {
    marginBottom: '3%',
    flex: 1,
    backgroundColor: 'rgba(105,156,252,1)',
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
    fontWeight: 'bold',
  },
  italicsDesc: {
    //fontFamily: 'amaranth-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(2.2),
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  title: {
    //fontFamily: 'amaranth-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(3.5),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button2Column: {
    flex: 1,
    width: '100%',
    //backgroundColor: 'red',
    alignItems: 'center',
    marginVertical: '2.5%',
  },
  top: {
    flex: 2.5,
    width: '90%',
    backgroundColor: 'rgba(0,83,143,1)',
    alignItems: 'center',
    marginBottom: '4%',
    borderRadius: 5,
    padding: 5
  },
  bottom: {
    flex: 2.5,
    width: '100%',
    //backgroundColor: 'red',
    alignItems: 'center',
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
)(CreateGame);
