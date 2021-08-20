import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import routes from "./routes";
import "../css/custom.css";

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes: routes, // short for `routes: routes`
});

const app = createApp({});

app.component("app", App);

app.use(router);

app.mount("#app");
