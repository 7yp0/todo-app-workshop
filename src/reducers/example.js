// @flow
import { type ExampleActions } from '../actions/example';

export type Example = {
  +test: string,
};

export type ExampleState = {
  +example: ?Example,
};

export const defaultState: ExampleState = {
  example: null,
};

export default function example(
  state?: ExampleState = defaultState,
  action: ExampleActions,
): ExampleState {
  const { type } = action;

  switch (type) {
    // TODO: add cases here for different action types
    default:
      return state;
  }
}
