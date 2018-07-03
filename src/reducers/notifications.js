// @flow
import {
  PUT_TOAST,
  REMOVE_TOAST,
  type ToastActions,
} from '../actions/notifications';

export type Toast = {
  +message: string,
  +uid: number,
};

export type NotificationState = {
  +count: number,
  +toasts: Array<Toast>,
};

export const defaultState = {
  count: 0,
  toasts: [],
};

function incrementCount(count: number): number {
  if (count < Number.MAX_SAFE_INTEGER) {
    return count + 1;
  }

  return 1;
}

function decrementCount(count: number): number {
  if (count > 0) {
    return count - 1;
  }

  return 0;
}

export default function notifications(
  state?: NotificationState = defaultState,
  action: ToastActions,
): NotificationState {
  const { type, payload } = action;

  switch (type) {
    case REMOVE_TOAST:
      return {
        ...state,
        count: decrementCount(state.count),
        toasts: state.toasts.slice(1),
      };

    case PUT_TOAST:
      if (!payload) {
        return state;
      }

      if (
        payload &&
        state.toasts.find(item => item.message === payload.message)
      ) {
        return state;
      }

      const count = incrementCount(state.count);

      return {
        ...state,
        count,
        toasts: [
          ...state.toasts,
          {
            ...payload,
            uid: count,
          },
        ],
      };

    default:
      return state;
  }
}
