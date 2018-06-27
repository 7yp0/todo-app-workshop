// @flow
import { type ExampleActions, EXAMPLE_1 } from '../actions/example';

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
  const { type, payload } = action;

  switch (type) {
    case EXAMPLE_1:
      if (!payload) {
        return state;
      }

      return {
        ...state,
        example: {
          ...state.example,
          test: payload.test,
        },
      };

    default:
      return state;
  }
}
