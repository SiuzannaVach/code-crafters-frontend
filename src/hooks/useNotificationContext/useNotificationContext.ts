import { useContext } from "react";
import { NotificationContext } from "../../context/NotificationContextValue";

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("Error: NotificationProvider missing");
  }
  return context;
};
