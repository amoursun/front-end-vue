import {createApp} from 'vue';
import {createPinia} from 'pinia';
import ElementPlus from 'element-plus';
// 需要注意的是，样式文件需要单独引入
import 'element-plus/dist/index.css';
import 'virtual:uno.css';

// antd icons
import * as Icons from '@ant-design/icons-vue';
// vue i18n
import I18n from '@/i18n/index';

import router from '@/router/index';
import App from './app.vue';
// custom directives
import directives from '@/directives/index';
// pinia store
import {pinia} from '@/stores/index';


import './style.scss';
import { registerGlobComp } from './register';

// svg icons
import 'virtual:svg-icons-register';

// iconfont css
// import '@/assets/iconfont/iconfont.scss';
// font css
// import '@/assets/fonts/font.scss';


const app = createApp(App);
// 全局注册 自定义指令(directive)
// setupDirective(app);
// 全局注册 状态管理(store)
// xxx

// 注册antd Icons组件
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons]);
});
// 注册全局组件
registerGlobComp(app);

app.use(ElementPlus)
    .use(directives)
    .use(router)
    .use(I18n)
    .use(pinia)
    .mount('#app');
