import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import reduxThunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import apiMiddleware from './apiMiddleware';
import rootReducer from '../reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const configureStore = () => {
  const middlewares = [reduxThunk, apiMiddleware];

  const config = {
    key: 'primary',
    whitelist: ['auth', 'user'],
    storage,
    stateReconciler: autoMergeLevel2,
  };

  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const reducer = persistReducer(config, rootReducer);

  const store = createStore(reducer, undefined, process.env.NODE_ENV === 'development'
    ? composeEnhancers(applyMiddleware(...middlewares)) : compose(applyMiddleware(...middlewares)));

  const persistor = persistStore(store);

  return { persistor, store };
};

export default configureStore;
