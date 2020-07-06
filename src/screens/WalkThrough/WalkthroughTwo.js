import React, {Component, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RFPercentage} from 'react-native-responsive-fontsize';
Icon.loadFont();
function WalkthroughTwo(props) {
  const animatedValue = new Animated.Value(0);
  animate = () => {
    console.log('hola');
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 150,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    animate();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.tunelyze1}>Select a song length excerpt</Text>
      <Text style={styles.clickToListen}>Click to listen!</Text>
      <View style={styles.middle}>
        {/* <View style={styles.group}>
          <Text style={styles.loremIpsum5}>+5</Text>
          <Text style={styles.loremIpsum5}>+4</Text>
          <Text style={styles.loremIpsum5}>+3</Text>
          <Text style={styles.loremIpsum5}>+2</Text>
          <Text style={styles.loremIpsum5}>+1</Text>
        </View> */}
        <Image
          source={require('../../assets/images/time.png')}
          resizeMode="contain"
          style={styles.image}
        />
        {/* <Animated.View
          style={{
            //marginLeft,
            height: 84,
            width: 84,
            backgroundColor: 'red',
            transform: [
              {
                translateX: 0,
              },
            ],
          }}> */}
        <View style={styles.icon}>
          <Icon name="hand-pointer-o" color="white" size={RFPercentage(10)} />
        </View>
        {/* </Animated.View> */}
      </View>
      <Text style={styles.tunelyze2}>
        DOUBLE your score if you get the song AND Artist!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(74,144,226,1)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: '20%',
  },
  image: {
    width: '90%',
    //backgroundColor: 'yellow',
  },
  middle: {
    width: '100%',
    flex: 2,
    //backgroundColor: 'red',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    color: 'rgba(255,255,255,1)',
    fontSize: 84,
    // position: 'absolute',
    // bottom: '40%',
    // left: '25%',
    //top: 0,
    //backgroundColor: 'red',
  },
  group: {
    //backgroundColor: 'pink',
    width: '85%',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loremIpsum5: {
    //fontFamily: "roboto-700",
    color: 'rgba(255,255,255,1)',
    height: 36,
    width: 53,
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  tunelyze1: {
    //fontFamily: "roboto-700",
    color: 'rgba(255,255,255,1)',
    width: '100%',
    fontSize: RFPercentage(5),
    textAlign: 'center',
    flex: 1,
    fontWeight: 'bold',
    fontFamily: 'Acme-Regular',
    //backgroundColor: 'purple',
  },
  tunelyze2: {
    //fontFamily: "roboto-700",
    color: 'rgba(255,255,255,1)',
    flex: 1.5,
    width: '100%',
    fontSize: RFPercentage(5),
    textAlign: 'center',
    paddingHorizontal: '10%',
    fontFamily: 'Acme-Regular',
    //backgroundColor: 'orange',
  },
  clickToListen: {
    //fontFamily: "roboto-700",
    //backgroundColor: 'green',
    color: 'rgba(255,255,255,1)',
    width: '100%',
    fontSize: RFPercentage(4),
    textAlign: 'center',
    flex: 0.5,
    fontFamily: 'Acme-Regular',
  },
});

export default WalkthroughTwo;
