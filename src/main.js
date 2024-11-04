import '@/styles.css';

import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router.js';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const app = createApp(App);

app.config.globalProperties.$toastr = toastr;

app.use(router);
app.mount('#app');
