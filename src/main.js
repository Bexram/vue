import Vue from 'vue';
import App from './App.vue';
import store from './vuex/store.js';
import router from './components/router/router';
import axios from 'axios';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);
Vue.config.productionTip = false,


new Vue({
  render: h => h(App),
  store,
  router,
  axios,
}).$mount('#app')
