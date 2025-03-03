import { defineStore } from 'pinia';
import { useQuasar } from 'quasar';

export type NotificationType = 'positive' | 'negative' | 'warning' | 'info';

export const useNotificationStore = defineStore('notification', () => {
  // Get Quasar's notification plugin
  const $q = useQuasar();

  /**
   * Show a notification with the given message and type
   * @param message The message to display
   * @param type The type of notification (positive, negative, warning, info)
   * @param timeout How long to display the notification (in ms)
   */
  function showNotification(message: string, type: NotificationType = 'positive', timeout = 2000) {
    $q.notify({
      message,
      color: type,
      position: 'top-right',
      timeout,
      actions: [
        {
          icon: 'close',
          color: 'white',
          handler: () => {
            /* close */
          },
        },
      ],
    });
  }

  return {
    showNotification,
  };
});
