import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from 'element-ui'

import '@/styles/index.scss' // global css
import './styles/element-variables.scss'
import './styles/common.scss'

import './icons' // icon
import './assets/icon/iconfont.css'
import regexp from "./assets/js/regexp";

// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
Vue.prototype.$regexp = regexp;
// import './permission' // permission control
Vue.use(Element, {
  size: 'medium' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
