import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {setOnboarding} from '../../redux/authenticationSlice';
import {connect} from 'react-redux';
function WalkthroughThree(props) {
  var Skip;
  var filler = <View style={styles.endWrapperFiller} />;
  if (props.first) {
    Skip = (
      <View
        style={{
          justifyContent: 'flex-start',
          //backgroundColor: 'red',
          width: '100%',
          flex: 0.7,
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity
          style={{
            marginEnd: '0%',
            backgroundColor: 'rgba(105,156,252,1)',
            padding: '2%',
            borderRadius: 5,
          }}
          onPress={() => {
            props.setOnboarding(true);
          }}>
          <Text
            style={{
              fontFamily: 'Acme',
              color: 'rgba(255,255,255,1)',
              //width: '90%',
              fontSize: RFPercentage(2.7),
            }}>
            SKIP
          </Text>
        </TouchableOpacity>
      </View>
    );
    filler = <View style={styles.endWrapperFillerSkip} />;
  }
  return (
    <View style={styles.container}>
      <Text
        style={styles.tunelyze1}
        numberOfLines={3}
        adjustsFontSizeToFit={true}>
        {' '}
        Guess the song and/or the artist!
      </Text>
      <View style={styles.box}>
        <Image
          source={require('../../assets/images/guess.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      {filler}
      {Skip}
      {/* <View style={styles.endWrapperFiller} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(74,144,226,1)',
    padding: 35,
  },
  endWrapperFiller: {
    flex: 0.7,
  },
  endWrapperFillerSkip: {
    flex: 0.5,
  },
  tunelyze1: {
    marginHorizontal: '5%',
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
    //backgroundColor: 'red',
    height: '100%',
    width: '100%',
    // borderRadius: 70,
    // borderColor: 'yellow',
    // borderWidth: 10,
  },
  box: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 3.0,
    //backgroundColor: 'red',
    width: '100%',
    paddingBottom: '10%',
    //borderRadius: 70,
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
)(WalkthroughThree);
