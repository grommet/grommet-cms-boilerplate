import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import configureStore from '../src/js/store';
import createLocation from 'history/lib/createLocation';
import env from 'node-env-file';
import path from 'path';
import { getRoutes } from '../src/js/routes';
import { match } from 'react-router';
import GrommetCmsConfigProvider from 'grommet-cms/containers/GrommetCmsConfigProvider';

// Load environment variables
env(path.join(__dirname, '..', '.env'));

export default function isomorphicRender(req, res) {
  const location = createLocation(req.url);
  const authStatus = req.isAuthenticated();
  const store = configureStore({
    api: {
      url: process.env.API_URL
    },
    login: {
      loggedIn: authStatus,
      loginRequest: false,
      loginError: ''
    }
  });

  match({
    routes: getRoutes(store),
    location
  }, function(err, redirectLocation, renderProps) {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return res.status(404).end('Not found...');
    }

    const promises = renderProps.components.map((component, index) => {
      if (!component || !component.fetchData) {
        return false;
      }

      const title = (renderProps.params.title)
        ? renderProps.params.title
        : null;

      return store.dispatch(component.fetchData(title));
    });

    Promise.all(promises).then(() => {
      const initialState = JSON.stringify(store.getState());
      const InitialComponent = (
        <Provider store={store}>
          <GrommetCmsConfigProvider>
            <RouterContext {...renderProps} />
          </GrommetCmsConfigProvider>
        </Provider>
      );

      const componentHTML = renderToString(InitialComponent);
      let head = Helmet.rewind();

      res.render('index.ejs', {
        title: head.title.toString(),
        content: componentHTML,
        meta: head.meta.toString(),
        initialState: initialState
      });
    });
  });
};
