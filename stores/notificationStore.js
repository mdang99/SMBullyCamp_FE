import { create } from 'zustand';
import { nanoid } from 'nanoid';

const MAX_NOTIFICATIONS = 3;

const useNotificationStore = create((set, get) => ({
  notifications: [],

  pushNotification: (type, message, duration = 3000) => {
    const id = nanoid();
    const newNotification = { id, type, message, duration };

    set((state) => {
      const sliced = state.notifications.slice(0, MAX_NOTIFICATIONS - 1);
      return { notifications: [newNotification, ...sliced] };
    });

    // Auto remove after duration
    setTimeout(() => {
      get().removeNotification(id);
    }, duration);
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
}));

export default useNotificationStore;
