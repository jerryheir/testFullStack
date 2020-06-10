import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import mainReducer from "../Reducers";
import {
  persistReducer
} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

const persistConfig = {
  key: 'testApp',
  storage: AsyncStorage,
  blacklist:[]
};

const initialState = {};

const middleWare = [thunk];

const middlewareDev = [
    applyMiddleware(...middleWare),
    ...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : [])
];

const persistedReducer = persistReducer(persistConfig, mainReducer);

export const store = createStore(
    persistedReducer,
    initialState,
    compose(
        ...middlewareDev
    )
);
