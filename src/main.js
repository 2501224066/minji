import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



Vue.config.productionTip = false

// 引入基础样式
import '@/assets/css/base.css'
import '@/assets/js/flexible'
import '@/assets/css/icon.css'


// 全局导入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import {
  Dialog
} from 'vant';
Vue.use(Dialog);

import {
  Lazyload
} from 'vant';

Vue.use(Lazyload);

// 引入修改标题
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

// 字体
import "@/assets/css/font.css";

// 组件之间传值
// export const eventBus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')