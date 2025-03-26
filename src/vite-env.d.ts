/// <reference types="vite/client" />

declare namespace NodeJS {
    type Timer = any;
    type Timeout = any;
}
declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
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

declare module 'sortablejs';

declare module '*.module.scss' {
    const classes: { readonly [key: string]: string };
    export default classes;
}
