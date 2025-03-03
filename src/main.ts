import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

// Import styles
import './styles/base.css';
import './styles/components.css';
import './styles/utilities.css';
import './styles/ui-components.css';
import './styles/animation.css';
import './styles/layout.css';
import './styles/cart.css';
import './styles/footer.css';
import './styles/catalog.css';

// Import Quasar
import { Quasar, ClosePopup, Notify, Dialog } from 'quasar';
import * as QuasarComponents from 'quasar';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';

// Create app instance
const app = createApp(App);

// Initialize Pinia
const pinia = createPinia();

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  // Log the error
  console.error('Global error:', err);
  console.error('Component:', instance);
  console.error('Error Info:', info);

  // You could also send to an error tracking service
  // errorTrackingService.captureException(err);
};

// Register plugins
app.use(router);
app.use(pinia);
app.use(Quasar, {
  components: QuasarComponents,
  directives: {
    ClosePopup,
  },
  plugins: {
    Notify,
    Dialog,
  },
});

// Mount the app
app.mount('#app');
