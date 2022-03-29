import { createApp } from 'vue'
import App from './App.vue'
import router from './route/router'
import index from './store/index'

const app = createApp(App)

app.use(router).use(index).mount('#app')
