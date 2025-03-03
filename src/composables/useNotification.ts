import { useQuasar } from 'quasar';

type NotificationType = 'info' | 'positive' | 'negative' | 'warning';

export function useNotification() {
  const $q = useQuasar();

  const showNotification = (message: string, type: NotificationType = 'info') => {
    $q.notify({
      message,
      color: type,
      position: 'top',
      timeout: 2000,
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
  };

  return {
    showNotification,
  };
}
