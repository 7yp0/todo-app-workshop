// @flow
import example, {
  defaultState as exampleState,
  type ExampleState,
} from './example';

export type AppState = {
  +example: ExampleState,
};

export const initialState = {
  example: exampleState,
};

export default {
  example,
};
