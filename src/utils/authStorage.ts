// src/utils/authStorage.ts
// Постоянное хранилище зарегистрированных пользователей.
// Отдельно от "logged_user" (это только текущая сессия).

import { getItem, setItem } from "./storage";

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  password: string;
  role: "espectador" | "organizador";
}

const USERS_KEY = "cc_registered_users";

export function getRegisteredUsers(): StoredUser[] {
  return getItem<StoredUser[]>(USERS_KEY, []);
}

export function findUserByEmail(email: string): StoredUser | undefined {
  const cleanEmail = email.toLowerCase().trim();
  return getRegisteredUsers().find((u) => u.email.toLowerCase() === cleanEmail);
}

export function saveNewUser(user: StoredUser): void {
  const users = getRegisteredUsers();
  users.push(user);
  setItem(USERS_KEY, users);
}
