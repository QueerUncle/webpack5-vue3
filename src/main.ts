/*
  @Author: lize
  @Date: 2021/4/15
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/4/15
 */
import { createApp } from 'vue';
import store from './store';
import router from './router';
import App from './App.vue';
import './assets/css/index.less';

createApp(App).use(store).use(router).mount('#app');
