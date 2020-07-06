import {combineReducers} from 'redux';

import authenticationSlice from './authenticationSlice';
import gameSlice from './gameSlice';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const authenticationConfig = {
  key: 'authentication',
  storage: AsyncStorage,
  blacklist: ['accessToken'],
};
const rootReducer = combineReducers({
  authentication: persistReducer(authenticationConfig, authenticationSlice),
  game: gameSlice,
});

export default rootReducer;
