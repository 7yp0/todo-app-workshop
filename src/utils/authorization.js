// @flow
import localStore from 'store';

export const LOCAL_STORAGE_KEY = 'TEST_TODO_APP';

export function saveTokenToLocalStorage(token: string): boolean {
  localStore.set(LOCAL_STORAGE_KEY, token);

  return true;
}

export function getTokenFromLocalStorage(): ?string {
  return localStore.get(LOCAL_STORAGE_KEY);
}

export function deleteTokenFromLocalStorage(): boolean {
  localStore.remove(LOCAL_STORAGE_KEY);

  return true;
}
