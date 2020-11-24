require('jquery');
require('popper.js');
require('bootstrap');
require('./css/app.css');

// window.axios = require('axios');
// axios.defaults.baseURL = 'http://127.0.0.1:8000';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import sweet from 'vue-sweetalert2';
import quillEditor from 'vue-quill-editor';
import VueIziToast from "vue-izitoast";
import { createProvider } from './vue-apollo'


Vue.config.productionTip = false
Vue.use(sweet);
// Vue.use(Ramada);
Vue.use(quillEditor);
Vue.use(VueIziToast);




// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');





















new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
