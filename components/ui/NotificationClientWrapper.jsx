"use client";

import useNotificationStore from "../../stores/notificationStore";
import NotificationStack from "./NotificationStack";


export default function NotificationClientWrapper() {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <NotificationStack
      notifications={notifications}
      onRemove={removeNotification}
    />
  );
}
