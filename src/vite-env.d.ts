/// <reference types="vite/client" />

declare namespace NodeJS {
    type Timer = any;
    type Timeout = any;
}
declare module '*.tsx' {
    import {DefineComponent} from 'vue';
    const component: DefineComponent<{}, {}, any>
    export default component;
}

declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}


