import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faAngleUp, faSearch } from '@fortawesome/free-solid-svg-icons'

import '@/index.css'
import router from '@/router'
import App from './App.vue'

library.add(faSearch)
library.add(faAngleDown)
library.add(faAngleUp)

const piniaStore = createPinia()

createApp(App)
  .use(piniaStore)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
