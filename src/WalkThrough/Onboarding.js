import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';

import Swiper from 'react-native-swiper';
import WalkthroughOne from './WalkthroughOne';
import WalkthroughTwo from './WalkthroughTwo';
import WalkthroughThree from './WalkthroughThree';
import WalkthroughFour from './WalkthroughFour';

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 50,
  },
});

function Onboarding(props) {
  var first = true;
  var screenFour = <WalkthroughFour />;
  if ('route' in props) {
    first = false;
    screenFour = <WalkthroughFour navigation={props.route.params.navigation} />;
  }
  return (
    <Swiper
      showsButtons={true}
      nextButton={<Text style={styles.buttonText}>›</Text>}
      prevButton={<Text style={styles.buttonText}>‹</Text>}
      dotColor="white"
      activeDotColor="blue"
      //   dot={() => {
      //     return (
      //       <View
      //         style={{
      //           backgroundColor: 'rgba(0,0,0,.2)',
      //           width: 8,
      //           height: 8,
      //           borderRadius: 4,
      //           marginLeft: 3,
      //           marginRight: 3,
      //           marginTop: 3,
      //           marginBottom: 3,
      //         }}
      //       />
      //     );
      //   }}>
      loop={false}>
      <WalkthroughOne first={first} />
      <WalkthroughTwo first={first} />
      <WalkthroughThree first={first} />
      {screenFour}
    </Swiper>
  );
}
export default Onboarding;
