import {createStore} from 'redux';
import {persistStore} from 'redux-persist';

import rootReducer from './index';

const store = createStore(rootReducer);

let persistor = persistStore(store);

export {store, persistor};
