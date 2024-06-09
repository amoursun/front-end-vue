import type { App } from 'vue';
import {createPinia} from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();

// piniaPersist(持久化)
pinia.use(piniaPluginPersistedstate);
// 全局注册 store
export function setupStore(app: App<Element>) {
    app.use(pinia);
}

export {pinia};