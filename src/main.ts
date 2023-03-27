import { createApp } from "vue";
import "./assets/scss/style.scss";
import App from "./App.vue";

import "vuetify/styles";
import { CustomVuetify } from "./vuetify";

import { ApplicationRouter } from "./router";
import { store } from "./store";

createApp(App)
  .use(store)
  .use(CustomVuetify)
  .use(ApplicationRouter)
  .mount("#app");
