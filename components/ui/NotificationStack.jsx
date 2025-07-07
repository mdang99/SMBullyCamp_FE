"use client";

import { CheckCircle, XCircle, X } from "lucide-react";
import useNotificationStore from "../../stores/notificationStore";

export default function NotificationStack() {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 w-[300px] max-w-full">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`relative px-4 py-3 pr-10 rounded-lg shadow-lg flex items-center gap-3 text-sm font-medium transition-all
            ${
              n.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
        >
          {n.type === "success" ? (
            <CheckCircle size={18} />
          ) : (
            <XCircle size={18} />
          )}
          <span className="flex-1">{n.message}</span>
          <button
            onClick={() => removeNotification(n.id)}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-800 transition"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
