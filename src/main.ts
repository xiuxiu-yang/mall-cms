import { createApp, App } from 'vue'
import { globalRegister } from './gloab'
import 'normalize.css'
import 'animate.css'
import './assets/css/index.less'

import rootApp from './App.vue'

import router from './router'
import store from './store'
// import { setupLocal } from './store'

const app: App = createApp(rootApp)

app.use(globalRegister)
app.use(store)
// setupLocal()
app.use(router)

app.mount('#app')
