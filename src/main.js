import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createPinia } from "pinia";
import "vue-material-design-icons/styles.css";
import "./assets/sass/style.scss";

loadFonts();

createApp(App).use(createPinia()).use(router).use(vuetify).mount("#app");
