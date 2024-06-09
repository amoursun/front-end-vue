import {createApp} from 'vue';
import {createPinia} from 'pinia';
import ElementPlus from 'element-plus';
// 需要注意的是，样式文件需要单独引入
import 'element-plus/dist/index.css';
import 'virtual:uno.css';
import router from './router';
import './style.scss';
import App from './app.vue';

const pinia = createPinia();
const app = createApp(App);
// 全局注册 自定义指令(directive)
// setupDirective(app);
// 全局注册 状态管理(store)
// xxx
app.use(ElementPlus)
    .use(router)
    .use(pinia)
    .mount('#app');

let arr = [1, 'two', true]; 
