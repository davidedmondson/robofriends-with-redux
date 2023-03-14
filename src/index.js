import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import './index.css';
import App from './containers/App.js';
import { searchRobots, requestRobots } from './reducers';
import 'tachyons';
// import registerServiceWorker from './registerServiceWorker';

const logger = createLogger();
const rootReducer = combineReducers({ searchRobots, requestRobots });
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });
 
const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
)

// If using React version lower than 18:
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
