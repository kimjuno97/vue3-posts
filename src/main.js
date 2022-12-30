import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { createApp } from 'vue';
import router from '@/router';
import App from './App.vue';

import globalDirectives from './plugins/global-directives';
import dayjs from './plugins/dayjs';

import funcPlugins from './plugins/func';
import objPlugins from './plugins/obj';
import person from './plugins/person';

const app = createApp(App);
app.use(router);
app.use(funcPlugins);
app.use(person);
app.use(globalDirectives);
app.use(dayjs);
// 이름 바꿀 수 있음
// app.use(person, { name: '김준호' });
app.use(objPlugins);
app.mount('#app');

import 'bootstrap/dist/js/bootstrap.js';
