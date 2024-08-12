import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import createStore from "./store"; // Si vous utilisez Vuex

const app = createApp(App);

app.use(router);
// app.use(createStore); // Si vous utilisez Vuex

app.mount("#app");
