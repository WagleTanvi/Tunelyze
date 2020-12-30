import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import {setOnboarding} from '../redux/authenticationSlice';
import {useNavigation} from '@react-navigation/native';
import {RFPercentage} from 'react-native-responsive-fontsize';
Icon.loadFont();

function WalkthroughFour(props) {
  var navigationRef;
  if ('navigation' in props) {
    navigationRef = useNavigation();
  }
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.tunelyze1} numberOfLines={2}>
          At the end, see how you did!
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/score.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View
        style={{
          flex: 1.5,
          width: '100%',
          //backgroundColor: 'purple',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log(props);
            if ('navigation' in props && props.navigation) {
              console.log('navigate');
              navigationRef.goBack();
            }
            props.setOnboarding(true);
            //console.log(props.onboarding);
          }}>
          <View style={styles.startPlayingRow}>
            <Text style={styles.startPlaying}>Start Playing</Text>
            <Icon name="controller-play" style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
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
  tunelyze1: {
    fontFamily: 'Acme-Regular',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(5),
    textAlign: 'center',
    flex: 1.5,
  },
  image: {
    width: '100%',
    height: '100%',
    paddingBottom: 100,
  },
  imageContainer: {
    width: '100%',
    flex: 4,
    //backgroundColor: 'red',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  textContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 20,
    //backgroundColor: 'orange',
  },
  button: {
    resizeMode: 'contain',
    //marginHorizontal: '15%',
    //width: 'contain',
    width: '70%',
    //height: 61,
    backgroundColor: 'rgba(13,60,98,1)',
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //padding: '2%',
    marginTop: '5%',
    shadowOpacity: 1,
    borderWidth: 2,
    borderColor: 'white',
    //paddingHorizontal: '3%',
  },
  startPlaying: {
    //fontFamily: 'roboto-700',
    color: 'rgba(255,255,255,1)',
    flex: 4,
    height: '100%',
    fontSize: RFPercentage(3),
    fontFamily: 'Acme-Regular',
    //top: 5,
    textAlign: 'center',
  },
  icon: {
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(5),
    flex: 2,
    height: '100%',
  },
  startPlayingRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
const mapStateToProps = state => {
  return {
    onboarding: state.authentication.onboarding,
  };
};
const mapDispatchToProps = {
  setOnboarding,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalkthroughFour);
