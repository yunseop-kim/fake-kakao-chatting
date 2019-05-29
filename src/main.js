import Vue from 'vue'
import App from './App.vue'
import './assets/css/style.css'
import VueAnalytics from 'vue-analytics';
import VueHtml2Canvas from './utils/html2canvas.js';
 
Vue.config.productionTip = false
Vue.use(VueHtml2Canvas);
Vue.use(VueAnalytics, {
  id: 'UA-141063701-1'
});

new Vue({
  render: h => h(App),
}).$mount('#app')
