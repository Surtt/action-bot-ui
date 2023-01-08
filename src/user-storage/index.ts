import { IUser } from "types";

const USER_LOCALSTORAGE_KEY = "action_bot_user";

export const getStoredUser = (): IUser | null => {
  const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

export const setStoredUser = (token: string): void => {
  localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(token));
};

export const clearStoredUser = (): void => {
  localStorage.removeItem(USER_LOCALSTORAGE_KEY);
};
