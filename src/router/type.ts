import { RouteRecordRaw } from 'vue-router';

export type RouteItem = RouteRecordRaw & {
    parentKey?: string;
    key: string;
    children?: RouteItem[];
}