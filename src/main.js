import Vue from 'vue';
import MainGame from './MainGame';

Vue.config.productionTip = false;

new Vue({
  render: h => h(MainGame),
}).$mount('#app');
