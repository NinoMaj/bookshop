"use strict"
import axios from 'axios';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';

import reducers from './src/reducers';
import routes from './src/routes';

function handlerRender(req, res) {
  axios.get('http://localhost:3001/books')
    .then((response) => {
      const store = createStore(reducers, { "books": { "books": response.data }});
      const initialState = JSON.stringify(store.getState()).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
      
      const Routes = {
        routes: routes,
        location: req.url
      }
      
      const context = {};
      console.log("How context looks like? ", context.url);
      const reactComponent = ReactDOMServer.renderToString(
        <Provider store={store}>
          <StaticRouter
            location={req.url}
            context={context}>
            {routes}
          </StaticRouter>
        </Provider>
      );

      if (context.url) {
        // can use the `context.status` that 
        // we added in RedirectWithStatus
        redirect(context.status, context.url)
      } else {
        res.status(200).render('index', {reactComponent, initialState})
      }
    })
    .catch((err) => {
      console.error('Initial Server-side rendering error', err)
    })
}

module.exports = handlerRender;
