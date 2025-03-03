import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

import './styles/main.scss';

import { Quasar, ClosePopup, Notify, Dialog } from 'quasar';
import * as QuasarComponents from 'quasar';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';

const app = createApp(App);

const pinia = createPinia();

app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err);
  console.error('Component:', instance);
  console.error('Error Info:', info);
};

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

app.mount('#app');
