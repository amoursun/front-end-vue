declare global {
    interface Window {
        WEB_CONTEXT: string;
        API_CONTEXT: string;
        PROXY_PATH: string;
    }
}

export const WEB_CONTEXT = window.WEB_CONTEXT;
export const API_CONTEXT = window.API_CONTEXT;
export const PROXY_PATH = window.PROXY_PATH;
