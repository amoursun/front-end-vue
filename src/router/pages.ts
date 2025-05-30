import {RouteItem, RouteMeta} from './type';
import {routesToTree} from './util-tree';

const pages = import.meta.glob('../pages/**/page.ts', {eager: true, import: 'default'});
const comps = import.meta.glob('../pages/**/index.vue', {eager: true, import: 'default'});
const tsxComps = import.meta.glob('../pages/**/index.tsx', {eager: true, import: 'default'});
export const routes = Object.entries(pages).map(([path, meta]) => {
    const {fileSuffix = 'vue', pathFileName = 'index'} = meta as RouteMeta;
    const compPath = path.replace('page.ts', `${pathFileName}.${fileSuffix}`);
    path = path.replace('../pages', '').replace('/page.ts', '') || '/';
    const name = path.split('/').filter(Boolean).join('-');

    const parentPath = path.split('/').slice(0, -1).join('/');
    return {
        path,
        key: path,
        name,
        component: comps[compPath] || tsxComps[compPath],
        meta,
        /**
         * /parent/child => /parent
         * /parent => /
         * /parent/child/x => /parent/child
         * / => null
         */
        parentKey: path === '/' ? undefined : (parentPath || '/'),
    };
}) as RouteItem[];
export const menuRoutes = routesToTree(routes);
// console.log('routes', routes);
export const firstRoute = menuRoutes.find(({meta}) => meta?.isRedirect) || menuRoutes[0];
export default routes;
