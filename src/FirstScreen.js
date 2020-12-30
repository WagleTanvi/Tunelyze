import React, {Component, useEffect, useState} from 'react';

import Main from 'Main';
import {Provider, connect} from 'react-redux';
import {store, persistor} from './redux/store';
import Welcome from './one-player-screens/Welcome';
import Genre from './one-player-screens/Genres';
import PlaylistPicker from './one-player-screens/PlaylistPicker';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Quiz from './one-player-screens/Quiz';
import ScoreBoard from './one-player-screens/ScoreBoard';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Onboarding from './WalkThrough/Onboarding';
import {setOnboarding} from './redux/authenticationSlice';
import {RFPercentage} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-community/async-storage';
Icon.loadFont();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

/* Toggles Between onboarding and home screen */
function FirstScreen(props) {
  /* If onboarding is false  - show the screens */
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
