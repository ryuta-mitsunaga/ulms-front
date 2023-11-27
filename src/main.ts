import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import './scss/styles.scss';
import 'bootstrap';
import axios from 'axios';

createApp(App).use(router).mount('#app');
axios.defaults.withCredentials = true;
