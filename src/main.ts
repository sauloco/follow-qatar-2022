import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faFacebook,
  faWhatsapp,
  faTelegram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { faCopy } from "@fortawesome/free-solid-svg-icons"

/* add icons to the library */
library.add(faCopy, faFacebook, faWhatsapp, faTelegram, faTwitter);

const app = createApp(App);

app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon).mount("#app");
