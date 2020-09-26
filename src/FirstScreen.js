import React, {Component, useEffect, useState} from 'react';

import LoginScreen from './loginScreen';
import Main from './screens/Main';
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {Provider, connect} from 'react-redux';
import {store, persistor} from './redux/store';
import Welcome from './screens/Welcome';
import Genre from './screens/Genres';
import PlaylistPicker from './screens/PlaylistPicker';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Quiz from './screens/Quiz';
import ScoreBoard from './screens/ScoreBoard';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Onboarding from './screens/Onboarding';
import {setOnboarding} from './redux/authenticationSlice';
import {RFPercentage} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from './SplashScreen';
Icon.loadFont();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function FirstScreen(props) {
  const [loading, setLoading] = useState(true);
  // async function checkOnboarding() {
  //   var data;
  //   try {
  //     console.log(await AsyncStorage.getAllKeys());
  //     data = await AsyncStorage.getItem('persist:authentication');
  //   } catch (e) {
  //     console.log('ERROR');
  //     console.log(e);
  //   }
  //   console.log('Onboarding: ');
  //   data = JSON.parse(data);
  //   console.log(!data.onboarding);
  //   setLoading(!data.onboarding);
  // }
  // useEffect(() => {
  //   checkOnboarding();
  // }, []);
  //console.log(loading);
  // if (loading) {
  //   return <SplashScreen />;
  // }
  if (!props.onboarding) {
    return <Onboarding />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Main}
            options={{
              swipeEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Genres"
            component={Genre}
            options={{
              title: 'Tunelyze',
              headerStyle: {
                backgroundColor: 'rgba(14,134,226,0.9)',
                borderColor: 'white',
                borderBottomWidth: 0,
                //opacity: 0.9,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                color: 'white',
                fontWeight: 'bold',
                fontSize: RFPercentage(4.5),
              },
              //headerTitle: props => <LogoTitle {...props} />,
            }}
            //options={{headerTitle: props => <LogoTitle {...props} />}}
          />
          <Stack.Screen
            name="Playlist"
            component={PlaylistPicker}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Quiz"
            component={Quiz}
            options={{
              title: 'Tunelyze',
              headerStyle: {
                backgroundColor: 'rgba(14,134,226,0.9)',
                borderColor: 'white',
                borderBottomWidth: 0,
                //opacity: 0.9,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                color: 'white',
                fontWeight: 'bold',
                fontSize: RFPercentage(4.5),
              },
              gestureEnabled: false,
              headerLeft: null,
            }}
          />
          <Stack.Screen
            name="ScoreBoard"
            component={ScoreBoard}
            options={{
              title: 'Tunelyze',
              headerStyle: {
                backgroundColor: 'rgba(14,134,226,0.9)',
                borderColor: 'white',
                borderBottomWidth: 0,
                //opacity: 0.9,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                color: 'white',
                fontWeight: 'bold',
                fontSize: RFPercentage(4.5),
              },
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="Walkthrough"
            component={Onboarding}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    // alignItems: 'center',
  },
  image2: {
    // width: '95%',
    // height: 60,
    //marginTop: 62,
    //marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(105,156,252,1)',
    //backgroundColor: 'rgba(13,60,98,1)',
    //backgroundColor: 'rgba(255,102,153,1)',
    flexDirection: 'row',
    //borderRadius: 10,
    //shadowOpacity: 1,
    // justifyContent: 'space-between',
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
)(FirstScreen);
