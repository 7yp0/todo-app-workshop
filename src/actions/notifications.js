// @flow
import type { Action } from '.';

type Toast = {
  +message: string,
};

export type PutToastAction = Action<Toast> & {
  type: 'PUT_TOAST',
};

export type RemoveToastAction = Action<void> & {
  type: 'REMOVE_TOAST',
};

export type ToastActions = PutToastAction | RemoveToastAction;

export const PUT_TOAST = 'PUT_TOAST';
export const REMOVE_TOAST = 'REMOVE_TOAST';

export function addToast(message: string): PutToastAction {
  return {
    type: PUT_TOAST,
    payload: {
      message,
    },
  };
}

export function removeToast(): RemoveToastAction {
  return {
    type: REMOVE_TOAST,
    payload: undefined,
  };
}
