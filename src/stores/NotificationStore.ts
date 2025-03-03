import { defineStore } from 'pinia';
import { useQuasar } from 'quasar';

export type NotificationType = 'positive' | 'negative' | 'warning' | 'info';

export const useNotificationStore = defineStore('notification', () => {
  const $q = useQuasar();

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
