import {RouteRecordRaw} from 'vue-router';

const pages = import.meta.glob('../pages/**/page.ts', {eager: true, import: 'default'});
const comps = import.meta.glob('../pages/**/index.vue', {eager: true, import: 'default'});
export const routes = Object.entries(pages).map(([path, meta]) => {
    const compPath = path.replace('page.ts', 'index.vue');
    path = path.replace('../pages', '').replace('/page.ts', '') || '/';
    const name = path.split('/').filter(Boolean).join('-');

    return {
        path,
        name,
        component: comps[compPath],
        meta,
    };
}) as RouteRecordRaw[];

export const firstRoute = routes.find(({meta}) => meta?.isRedirect) || routes[0];
export default routes;
