// @flow
import React, { type Node } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import Router from 'react-router-dom/BrowserRouter';

import { configureStore, configureClient } from './configures';
import config from './config';
import { initialState } from './reducers';
import App from './App';

async function render(): Promise<void> {
  const element = document.getElementById('root');

  if (!element) {
    return;
  }

  const store = configureStore(initialState);
  const client = configureClient();

  const Wrapper = (): Node => (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <App />
        </Router>
      </ApolloProvider>
    </Provider>
  );

  // $FlowFixMe - hydrate is part of ReactDOM
  ReactDOM.render(<Wrapper />, element);

  // Webpack Hot Module Replacement
  // $FlowFixMe - module.hot provided by webpack
  if (!config.isHotModuleReplacement && module.hot) {
    // $FlowFixMe - hot.accept provided by webpack
    module.hot.accept(
      Wrapper,
      (): Node => {
        render();
      },
    );
  }
}

render();
