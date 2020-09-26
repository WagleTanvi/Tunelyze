import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
function QuitModal(props) {
  return (
    <View style={styles.content}>
      <Text
        numberOfLines={3}
        style={{
          flex: 2.5,
          fontSize: RFPercentage(3),
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 5,
        }}>
        Are you sure you want to quit?
      </Text>
      <Text
        style={{
          flex: 1,
          fontSize: RFPercentage(2),
          textAlign: 'center',
        }}>
        All your progress will be lost.
      </Text>
      {/* <View
        style={{
          //height: 400,
          //height: '100%',
          width: '100%',
          flex: 4,
          //backgroundColor: '#CCCCCC',
        }}
      /> */}
      <View style={{flexDirection: 'row', flex: 1.5, paddingHorizontal: '10%'}}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => {
            props.quitFunction();
            props.toggle();
          }}>
          <Text style={styles.howToPlay}>OK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={props.toggle}>
          <Text style={styles.howToPlay}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    paddingHorizontal: '5%',
    //padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: '90%',
    //marginHorizontal: '10%',
    height: '20%',
  },
  button2: {
    //height: 27,
    width: '50%',
    justifyContent: 'center',
    backgroundColor: 'rgba(153,153,153,1)',
    borderRadius: 9,
    shadowOpacity: 0.5,
    paddingHorizontal: 30,
    margin: 10,
  },
  button1: {
    //height: 27,
    width: '50%',
    justifyContent: 'center',
    backgroundColor: 'rgba(105,156,252,1)',
    borderRadius: 9,
    shadowOpacity: 0.5,
    paddingHorizontal: 30,
    margin: 10,
  },
  howToPlay: {
    //fontFamily: 'amaranth-regular',
    color: 'rgba(0,0,0,1)',
    fontSize: RFPercentage(2),
    textAlign: 'center',
  },
});

export default QuitModal;
