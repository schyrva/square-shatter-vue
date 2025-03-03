import { useNotificationStore } from '../stores/NotificationStore';
import type { NotificationType } from '../stores/NotificationStore';

/**
 * Composable for displaying notifications using the NotificationStore
 * This maintains the same API for backward compatibility
 */
export function useNotification() {
  const notificationStore = useNotificationStore();

  return {
    showNotification: (message: string, type: NotificationType = 'positive', timeout = 2000) =>
      notificationStore.showNotification(message, type, timeout),
  };
}
