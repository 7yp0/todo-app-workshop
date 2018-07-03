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
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import config from './config';
import reducers, { type AppState } from './reducers';
import { runsInServer } from './utils/environment';
import { getTokenFromLocalStorage } from './utils/authorization';

const { graphqlUrl } = config;

const httpLink = new HttpLink({
  uri: graphqlUrl,
});

const authLink = setContext((_: any, { headers }: Object) => {
  const token = getTokenFromLocalStorage();

  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  };
});

export const configureClient = (): ApolloClient =>
  new ApolloClient({
    link: authLink.concat(httpLink),
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
