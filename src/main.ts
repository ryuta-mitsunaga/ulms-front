import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import './scss/styles.scss';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

createApp(App).use(router).mount('#app');
