// @flow
import nodeFetch from 'node-fetch';

async function fetch(uri: string, options: Object): Promise<Object> {
  // const { token: newAccessToken } = await getAuthoriaztion(); // TODO: get authorization from local storage

  const newAccessToken = '1234';

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
