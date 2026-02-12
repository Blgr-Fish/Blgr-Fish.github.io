import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

if (window.location.pathname !== '/') {
	window.location.replace('/')
} else {
	createApp(App).mount('#app')
}
