import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Import base styles
import "./styles/base.css";

// Import Quasar
import { Quasar } from "quasar";
import * as QuasarComponents from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/dist/quasar.css";

// Create app instance
const app = createApp(App);

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  // Log the error
  console.error("Global error:", err);
  console.error("Component:", instance);
  console.error("Error Info:", info);

  // You could also send to an error tracking service
  // errorTrackingService.captureException(err);
};

// Register plugins
app.use(router);
app.use(Quasar, {
  components: QuasarComponents,
  plugins: {},
});

// Mount the app
app.mount("#app");
