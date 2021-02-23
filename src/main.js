import Vue from 'vue'
import App from './App'
import api from './api/index'
import store from './store/index'


// import moment from 'moment' // 时间日期转换

// Vue.filter('dateformat', function(dataStr, pattern) {
//   return moment(dataStr).format(pattern)
// })

Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(api)
Vue.prototype.$store=store;
const app = new Vue(App)
app.$mount()
