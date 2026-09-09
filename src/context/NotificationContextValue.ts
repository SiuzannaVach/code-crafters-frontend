import { createContext } from "react";

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
};

export type NotificationContextType = {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (title: string, message: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
};

export const NotificationContext =
  createContext<NotificationContextType | null>(null);
