import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  FlatList
} from 'react-native';
import {connect} from 'react-redux';
import {
  setAccessToken,
  setRefreshToken,
  setExpr,
  setSigingIn,
} from '../redux/authenticationSlice';
import {RFPercentage} from 'react-native-responsive-fontsize';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      username: 'albuswags',
      score: 100
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      username: 'readdonttalk',
      score: 50
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      username: 'harrygoblet4',
      score: 10
    },
  ];
const Item = ({ username, score, index }) => (
    <View style={styles.item}>
      <Text style={styles.description}>{index+1}) {username}   <Text style={styles.scoreText}>+{score}</Text></Text>
    </View>
  );

const renderItem = ({ item, index }) => (
    <Item username={item.username} index={index} score={item.score}/>
);

function Leaderboard(props) {

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      resizeMode="stretch"
      style={styles.image}
      imageStyle={styles.image_imageStyle}>
      <View style={styles.button2Column}>
        <View style={styles.topTextView}>
            <Text style={styles.title}>My Playlist</Text>
        </View>
        <View style={styles.mainView}>
            <View style={{flex:0.5}}>
                <Text style={styles.subtitle}>Leaderboard</Text>
            </View>
            <View style={styles.listView}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={styles.listStyle}
                />
            </View>
        </View>
        <TouchableOpacity
          style={styles.joinGameButton}
          onPress={() =>{
            props.navigation.navigate('Main');
          }}>
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
      </View>
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
  topTextView: {
    marginTop: '2.5%',
    flex: 0.5,
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  mainView: {
    marginVertical: '5%',
    flex: 4,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinGameButton: {
    marginBottom: '3%',
    flex: 0.5,
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
    textAlign: 'left',
    fontWeight: 'bold'
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
    fontSize: RFPercentage(3.5),
    textAlign: 'center',
    fontWeight: 'bold'
  },
  title: {
    //fontFamily: 'amaranth-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(4),
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
    padding: '2%',
    margin: '2%',
    borderRadius: 6,
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
)(Leaderboard);
