import Vue from 'vue'
import App from './App.vue'
import io from "socket.io-client"
import VueSocket from "vue-socket.io"

import {router} from "./router/router"
Vue.config.productionTip = false

Vue.use(new VueSocket({
  connection: io("http://localhost:3000/", { transports: ['websocket'] }),
}))


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
