import React, {Component} from 'react';

import Main from './src/one-player-screens/Main';
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {Provider, connect} from 'react-redux';
import {store, persistor} from './src/redux/store';
import Welcome from './src/one-player-screens/Welcome';
import Genre from './src/one-player-screens/Genres';
import PlaylistPicker from './src/one-player-screens/PlaylistPicker';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Quiz from './src/one-player-screens/Quiz';
import ScoreBoard from './src/one-player-screens/ScoreBoard';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import FirstScreen from './src/FirstScreen';
import {PersistGate} from 'redux-persist/integration/react';
Icon.loadFont();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class App extends Component {
  constructor() {
    super();
    //Text.defaultProps.allowFontScaling = false; // Disallow dynamic type on iOS
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <FirstScreen />
        </PersistGate>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default App;
