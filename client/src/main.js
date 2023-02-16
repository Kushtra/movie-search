import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import './libs/axios';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
