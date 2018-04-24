import store from './blogger_store.js';
import { persistStore } from 'redux-persist';

const persistor = persistStore(store);
export default persistor;
