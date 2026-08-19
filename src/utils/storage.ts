// src/utils/storage.ts

export const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
};

export const getItem = <T>(key: string, fallbackValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallbackValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return fallbackValue;
  }
};

export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};
