import Vue from 'vue'
import App from './App.vue'
import './assets/css/style.css'
import VueHtml2Canvas from './utils/html2canvas.js';
 
Vue.config.productionTip = false
Vue.use(VueHtml2Canvas);

new Vue({
  render: h => h(App),
}).$mount('#app')
