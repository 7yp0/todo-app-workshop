// @flow
import type { Dispatch } from 'redux';
import type { AppState } from '../reducers';

export type Action<payload> = {
  type: string,
  payload: payload,
};

export type AsyncAction<F> = (
  dispatch: Dispatch,
  getState: () => AppState,
) => F;
