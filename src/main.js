import "./assets/css/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router/routes";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// import Loading from "./components/Loading.vue";

import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

// app.component("Loading", Loading);

app.use(pinia);
app.use(router);
app.use(Toast);

app.mount("#app");
