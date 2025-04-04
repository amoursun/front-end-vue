// ? 全局不动配置项 只做导出不做修改

// * 首页地址（默认）
export const HOME_URL: string = '/home';

// * 登录页地址（默认）
export const LOGIN_URL: string = '/login';

// * 默认主题颜色
export const DEFAULT_PRIMARY: string = '#2449ff';

// * 路由白名单地址（必须是本地存在的路由 staticRouter.ts）
export const ROUTER_WHITE_LIST: string[] = ['/500'];

export const defaultSettings = {
    language: 'zh-cn',
    size: 'md',
};