import React, {Component, useEffect, useState} from 'react';
import analytics, {firebase} from '@react-native-firebase/analytics';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import authHandler from '../authenticationHandler';
import {connect} from 'react-redux';
import {
  setAccessToken,
  setRefreshToken,
  setExpr,
  setSigingIn,
} from '../redux/authenticationSlice';
import Modal from 'react-native-modal';
import {RFPercentage} from 'react-native-responsive-fontsize';

function Main(props) {
  // const resetAction = StackActions.reset({
  //   index: 0,
  //   actions: [NavigationActions.navigate({routeName: 'Home'})],
  // });
  const [activityLoading, setActivityLoading] = useState(false);
  //this.props.navigation.dispatch(resetAction);
  return (
    <ImageBackground
      source={require('../assets/images/james-owen-c-NBiJrhwdM-unsplash.jpg')}
      resizeMode="stretch"
      style={styles.image}
      imageStyle={styles.image_imageStyle}>
      <Image
        source={require('../assets/images/Picture1.png')}
        resizeMode="contain"
        style={styles.image2}
      />
      <Modal isVisible={activityLoading}>
        <ActivityIndicator
          animating={activityLoading}
          color="#bc2b78"
          size="large"
        />
      </Modal>
      <View style={styles.endWrapperFiller} />
      <View style={styles.button2Column}>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await analytics().logEvent('button_press');
            setActivityLoading(true);
            //console.log(props);
            var authenticated = null;
            var authenticationObject;
            // if there is no refresh and access token = user is logging in for first time
            if (
              props.authentication.refreshToken == null &&
              props.authentication.accessToken == null
            ) {
              authenticationObject = await authHandler.onLogin();
              if ('message' in authenticationObject) {
                setActivityLoading(false);
                alert('You could not be authenticated!');
              } else {
                authenticated = 'login';
              }
            } else if (
              props.authentication.refreshToken != null &&
              props.authentication.accessToken == null
            ) {
              authenticationObject = await authHandler.refreshLogin(
                props.authentication.refreshToken,
              );
              if ('message' in authenticationObject) {
                setActivityLoading(false);
                alert('You could not be authenticated!');
              } else {
                authenticated = 'refresh';
              }
            } else {
              // have both access and refresh
              setActivityLoading(false);
              props.navigation.navigate('Genres');
            }
            if (authenticated != null) {
              props.setAccessToken({
                accessToken: authenticationObject.accessToken,
              });
              props.setRefreshToken({
                refreshToken: authenticationObject.refreshToken,
              });
              props.setExpr({
                expirationDate: authenticationObject.accessTokenExpirationDate,
              });
              setActivityLoading(false);
              if (authenticated == 'login') {
                props.navigation.navigate('Welcome');
              } else {
                props.navigation.navigate('Genres');
              }
            }
          }}>
          <Text style={styles.onePlayer}>One Player</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button1}
          onPress={() =>
            props.navigation.push('Walkthrough', {
              navigation: true,
            })
          }>
          <Text style={styles.howToPlay}>How to Play</Text>
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
  button: {
    marginVertical: '3%',
    flex: 3,
    backgroundColor: 'rgba(105,156,252,1)',
    borderRadius: 9,
    shadowOpacity: 1,
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onePlayer: {
    //fontFamily: 'amaranth-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(3),
    textAlign: 'center',
    letterSpacing: 0,
  },
  button1: {
    marginVertical: '3%',
    flex: 3,
    backgroundColor: 'rgba(255,102,153,1)',
    borderRadius: 9,
    shadowOpacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '65%',
  },
  howToPlay: {
    //fontFamily: 'amaranth-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(3),
    textAlign: 'center',
  },
  button2Column: {
    flex: 1,
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
)(Main);
