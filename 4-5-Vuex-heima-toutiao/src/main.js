import Vue from 'vue'
import App from './App.vue'
import store from './store'
import '@/styles/index.css' // 引入樣式

// 加载dayjs初始化配置
import './utils/dayjs'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
