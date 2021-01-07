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
import Svg, { Circle, Text as SvgText } from "react-native-svg";

function Buzzed(props) {

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      resizeMode="stretch"
      style={styles.image}>
      <View style={styles.button2Column}>
        <View style={styles.topTitle}>
            <Text style={styles.title}>You buzzed first!</Text>
        </View>
        <View style={styles.topTextView}>
            <Text style={styles.title}>15 seconds</Text>
        </View>
        <View style={styles.mainView}>
            <View style={{backgroundColor: 'rgba(255,255,255,1)', width: '100%', height: "65%", marginTop: '5%', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{backgroundColor: 'rgba(255,102,153,1)', width: '90%', height: "90%", borderRadius: 10, padding: "5%"}}>
                    <View style={{flexDirection: 'row', marginHorizontal: '5%', flex: 2.5, justifyContent: 'center', alignItems: 'center'}}> 
                        <Text style={styles.description}>Song</Text>
                        <TextInput placeholder="Song Name" style={styles.textInputStyle}></TextInput>
                    </View>
                    <View style={{flexDirection: 'row', marginHorizontal: '5%', flex: 2.5, justifyContent: 'center', alignItems: 'center', marginBottom: "3%"}}> 
                        <Text style={styles.description}>Artist</Text>
                        <TextInput placeholder="Artist Name" style={styles.textInputStyle}></TextInput>
                    </View> 
                    <View style={{flexDirection: 'row', marginHorizontal: '5%', flex: 1, justifyContent: 'center'}}> 
                        <TouchableOpacity style={styles.submitButton}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
  topTextView: {
    marginTop: '2.5%',
    flex: 0.5,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,83,143,1)',
    borderRadius: 4
  },
  topTitle: {
    marginTop: '5%',
    flex: 0.5,
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
    fontSize: RFPercentage(3),
    textAlign: 'center',
    fontWeight: 'bold'
  },
  title: {
    //fontFamily: 'amaranth-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(4.5),
    textAlign: 'center',
    fontWeight: 'bold'
  },
  gameTitle: {
    color: 'rgba(255,102,153,1)',
    fontSize: RFPercentage(5),
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button2Column: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    margin: '10%'
  },
  item:{
    backgroundColor: 'rgba(0,83,143,1)',
    justifyContent: 'center',
    //alignItems: 'center',
    padding: '5%',
    margin: '2%',
    borderRadius: 6,
    flexDirection: 'row',
    shadowOpacity: 1
  },
  listStyle:{
      flex: 1, 
      width: "100%", 
      backgroundColor:'rgba(255,102,153,1)',
      borderRadius: 6,
  },
  listView:{
    flex:4, 
    width: "100%",
    marginBottom: '5%',
  }
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
)(Buzzed);
