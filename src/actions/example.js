// @flow
import type { Action } from '.';

type ExamplePayload = {
  +test: string,
};

// * The content in the brackets defines the Payload to be send
export type ExampleAction1 = Action<ExamplePayload> & {
  type: 'EXAMPLE_1',
};

// * Action<null> is also valid
export type ExampleAction2 = Action<null> & {
  type: 'EXAMPLE_2',
};

export const EXAMPLE_1 = 'EXAMPLE_1';
export const EXAMPLE_2 = 'EXAMPLE_2';

// * All action types can be listed here with a | (ExampleToastAction1 | ExampleToastAction2 | ...)
export type ExampleActions = ExampleAction1 | ExampleAction2;

export function doExampleOne(test: string): ExampleAction1 {
  return {
    type: EXAMPLE_1,
    payload: {
      test,
    },
  };
}

export function doExampleTwo(): ExampleAction2 {
  return {
    type: EXAMPLE_2,
    payload: null,
  };
}
