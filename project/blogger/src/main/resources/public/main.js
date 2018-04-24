import "./styles/blogger.css";
import React from "react";
import ReactDOM from 'react-dom';
import Blogger from "./Blogger.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
// import store from './store/blogger_store';
import { Provider } from 'react-redux';

// import the two exports from the last code snippet.
import store from './store/blogger_store.js';
// import persistor from './store/blogger_store.js';
// import persistor from './store/store_persistor.js';
// import your necessary custom components.
import LoadingView from './components/LoadingView.js';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore, persistReducer } from 'redux-persist'

const persistor = persistStore(store);

function render() {

ReactDOM.render(<Provider store={store}>
                    <PersistGate loading={<LoadingView />} persistor={persistor}>
                        <Blogger />
                    </PersistGate>
                </Provider>, document.getElementById('bloggerId'));
}
const bloggerStore = store;
store.subscribe(render);
render();
