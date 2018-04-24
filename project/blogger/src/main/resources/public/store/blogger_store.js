import { createStore, applyMiddleware, compose } from 'redux';
import logger from "../middlewere/logger.js";
import authenticator from "../middlewere/authenticator.js";
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
// import storageLocal from 'redux-persist/lib/storage/local';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../reducers/rootReducer.js';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['blogs'],
    whitelist: ['user', 'auth'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk, logger, authenticator));
const { getState, dispatch, subscribe } = store;
export default store;
