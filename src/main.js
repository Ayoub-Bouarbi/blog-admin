require('jquery');
require('popper.js');
require('bootstrap');
require('./css/app.css');

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import sweet from 'vue-sweetalert2';
import quillEditor from 'vue-quill-editor';
import VueIziToast from "vue-izitoast";
import { createProvider } from './vue-apollo'


Vue.config.productionTip = false;

Vue.use(sweet);
Vue.use(quillEditor);
Vue.use(VueIziToast);



new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
