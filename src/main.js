import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Entryform from './components/entryform.vue'
import Entries from './components/entries.vue'
import Viewentry from './components/viewentry.vue'

const app = createApp(App)
app.component('entries', Entries);
app.component('entryform', Entryform)
app.component('currentlyviewing', Viewentry)
app.mount('#app')

// render normally, delete, open, sort by date, save and upload json, 