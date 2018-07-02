// @flow
import nodeFetch from 'node-fetch';

import { getTokenFromLocalStorage } from './authorization';

async function fetch(uri: string, options: Object): Promise<Object> {
  const { token: newAccessToken } = getTokenFromLocalStorage();

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
