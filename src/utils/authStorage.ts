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
export function saveSession(user: any): void {
  localStorage.setItem("logged_user", JSON.stringify(user));
}

export function getSession(): any {
  const saved = localStorage.getItem("logged_user");
  return saved ? JSON.parse(saved) : null;
}

export function clearSession(): void {
  localStorage.removeItem("logged_user");
}
