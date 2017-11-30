"user strict"

import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import routes from './routes';
import { postBooks } from './actions/booksActions';

import reducers from './reducers';

// STEP 1 create the store
const middleware = applyMiddleware(thunk, logger);

const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);

// store.dispatch(postBooks());
// store.subscribe(function() {
//   console.log('Current state is: ' + store.getState());
// })

const Routes = (
  <Provider store={store}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>
)

ReactDOM.hydrate(
  Routes,
  document.querySelector('#app')
);
