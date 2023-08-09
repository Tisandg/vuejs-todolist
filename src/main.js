import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Main view component. Injected into the div wiht id "App"
const app = createApp(App)

app.use(router)

//Mount the app to the DOM
app.mount('#app')
