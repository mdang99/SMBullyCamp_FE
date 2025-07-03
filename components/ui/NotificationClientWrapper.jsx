"use client";

import NotificationStack from "./NotificationStack";
import useNotificationStore from "@stores/notificationStore";

export default function NotificationClientWrapper() {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <NotificationStack
      notifications={notifications}
      onRemove={removeNotification}
    />
  );
}
