// @flow
import nodeFetch from 'node-fetch';
import localStore from 'store';

import { LOCAL_STORAGE_KEY } from './authorization';

async function fetch(uri: string, options: Object): Promise<Object> {
  const { token: newAccessToken } = localStore.get(LOCAL_STORAGE_KEY);

  const newOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `${newAccessToken}`,
    },
  };

  return nodeFetch(uri, newOptions);
}

export default fetch;
