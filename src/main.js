import { createApp } from 'vue'
import App from './App.vue'
import router from './route/router'
import index from './store/index'
// import jQuery from 'jquery'

const app = createApp(App)
global.$ = jQuery;
app.use(router).use(index).mount('#app')