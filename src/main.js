import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

import "./assets/main.css"
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import 'animate.css';

createApp(App).use(router).use(store).mount("#app");
