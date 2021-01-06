import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import './registerServiceWorker'
import messagePlugin from '@/utils/message.plugin.js'
import router from './router'
import store from './store'
import Loader from '@/components/app/Loader'
import 'bootstrap/dist/js/bootstrap.min.js'
import VueBootstrapToasts from "vue-bootstrap-toasts"
import Axios from 'axios'


Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}


Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.use(VueBootstrapToasts)

Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)


new Vue({
  router,
  store,  
  render: h => h(App)
}).$mount('#app')
