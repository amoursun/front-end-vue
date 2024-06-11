import { RouteRecordRaw } from 'vue-router';
import { HOME_URL, LOGIN_URL } from '@/config';

/**
 * staticRouter(静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
	// {
	// 	path: '/',
	// 	redirect: HOME_URL
	// },
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
        path: LOGIN_URL,
        name: 'Login',
        component: () => import('@/pages/login.vue'),
		meta: {
			title: '登录'
		}
    },
	// {
	// 	path: '/layout',
	// 	name: 'layout',
	// 	component: () => import('@/layout/index.vue'),
	// 	// redirect: HOME_URL,
	// 	children: []
	// }
];

/**
 * errorRouter(错误页面路由)
 */
export const errorRouter: RouteRecordRaw[] = [
	{
		path: '/403',
		name: '403',
		component: () => import('@/components/error/403.vue'),
		meta: {
			title: '403页面'
		}
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/components/error/404.vue'),
		meta: {
			title: '404页面'
		}
	},
	{
		path: '/500',
		name: '500',
		component: () => import('@/components/error/500.vue'),
		meta: {
			title: '500页面'
		}
	},
	// 解决刷新页面，路由警告
	{
		path: '/:pathMatch(.*)*',
		component: () => import('@/components/error/404.vue')
	},
	// 路由未匹配到，进入这个
	{
        path: '/:currentPath(.*)*',
        redirect: (_) => {
            return {path: '/404'};
        }
    }
];
