import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './rootReducer';

const loggerMiddleware = createLogger();

let middlewares = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
    middlewares = [...middlewares, loggerMiddleware];
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['profile', 'upload'],
    keyPrefix: '',
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middlewares))
);
export const persistor = persistStore(store);
