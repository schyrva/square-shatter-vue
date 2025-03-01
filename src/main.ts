import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

// Импорт Quasar
import { Quasar } from "quasar";
import * as QuasarComponents from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/dist/quasar.css";

const app = createApp(App);
app.use(router);
app.use(Quasar, {
  components: QuasarComponents,
  plugins: {},
});
app.mount("#app");
