import { useQuasar } from 'quasar';

/**
 * Composable for displaying notifications using Quasar's notify plugin
 */
export function useNotification() {
  const $q = useQuasar();

  /**
   * Show a notification with the given message and type
   * @param message The message to display
   * @param type The type of notification (positive, negative, warning, info)
   * @param timeout How long to display the notification (in ms)
   */
  function showNotification(
    message: string,
    type: 'positive' | 'negative' | 'warning' | 'info' = 'positive',
    timeout = 2000
  ) {
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
}
