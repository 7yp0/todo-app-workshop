// @flow
import example, {
  defaultState as exampleState,
  type ExampleState,
} from './example';

import notifications, {
  type NotificationState,
  defaultState as notificationsState,
} from './notifications';

export type AppState = {
  +example: ExampleState,
  +notifications: NotificationState,
};

export const initialState = {
  example: exampleState,
  notifications: notificationsState,
};

export default {
  example,
  notifications,
};
