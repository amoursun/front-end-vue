import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import NProgress from '@/utils/nprogress';

// @ts-ignore
const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        redirect: (_) => {
            return {path: '/home'};
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: import('@/pages/home.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/pages/about.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/login.vue'),
    },
    {
        path: '/:currentPath(.*)*', // 路由未匹配到，进入这个
        redirect: (_) => {
            return {path: '/404'};
        }
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return {
            el: '#app',
            top: 0,
            behavior: 'smooth'
        };
    }
});
// 导航守卫
router.beforeEach((to, from, next) => {
    // 进度条
    NProgress.start();
    // 动态修改标题
    if (to.meta.title) {
        document.title = `${to.meta.title || ''}`;
    }
    next();
});
// 后置守卫
router.afterEach((to) => {
    document.title = `${to.meta?.title || ''}`;
    NProgress.done();
});
export default router;

