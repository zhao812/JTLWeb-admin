//es6 promise
require('es6-promise').polyfill();  

import Vue from 'vue'
import router from './router'    //路由配置
// import store from './store'
import App from './pages/main'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'static/reset.css'

Vue.use(ElementUI)

//将router加入并生成应用
new Vue({
    // store,
    router,
    el: '#main',
    render: h => h(App)
});