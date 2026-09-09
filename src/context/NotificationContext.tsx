import { useState, useEffect } from "react";
import {
  NotificationContext,
  type NotificationItem,
} from "./NotificationContextValue";

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "default-attendee",
    title: "Centro de notificaciones",
    message: "Nuevo participante se registró en Global Web3 Hackathon",
    isRead: false,
  },
  {
    id: "default-review",
    title: "Centro de notificaciones",
    message: "Un usuario dejó una reseña sobre el evento",
    isRead: false,
  },
];

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Persist notifications across page reloads.
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem("cc_notifs");
    return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem("cc_notifs", JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Add a notification directly.
  const addNotification = (title: string, message: string) => {
    const newNotif: NotificationItem = {
      id: `n_${Date.now()}`,
      title,
      message,
      isRead: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAllAsRead,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
