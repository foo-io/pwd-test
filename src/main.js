import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css' // default

// styles
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// components
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const app = createApp(App)

app.use(PrimeVue)
app.component('InputText', InputText)
app.component('Button', Button)

app.mount('#app')
