// @flow
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
  type Store,
} from 'redux';
import thunk from 'redux-thunk';
import ApolloClient from 'apollo-client/ApolloClient';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import config from './config';
import reducers, { type AppState } from './reducers';
import graphqlFetch from './utils/graphqlFetch';
import { runsInServer } from './utils/environment';

const { graphqlUrl } = config;

export const configureClient = (): ApolloClient =>
  new ApolloClient({
    link: new HttpLink({
      uri: graphqlUrl,
      graphqlFetch,
    }),
    cache: new InMemoryCache(),
    ssrMode: false,
    connectToDevTools: true,
  });
const middlewares = [thunk];
const rootReducer = combineReducers({
  ...reducers,
});

function createDevToolsExtension(): Function {
  if (!runsInServer) {
    const { devToolsExtension } = window;

    return devToolsExtension();
  }

  return (f: any): any => f;
}

const composeEnhancers = compose(
  applyMiddleware(...middlewares),
  createDevToolsExtension(),
);

export const configureStore = (initialState: AppState): Store =>
  createStore(rootReducer, initialState, composeEnhancers);
