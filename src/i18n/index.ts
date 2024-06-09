import { createI18n } from 'vue-i18n';
// import { useAppStore } from '@/stores/modules/app';

// 本地语言包
import enLocale from './en-us/common';
import zhCnLocale from './zh-cn/common';

// const appStore = useAppStore();
const appStore = {language:'zh-cn'};


const messages = {
    'zh-cn': {
        ...zhCnLocale,
    },
    'en': {
        ...enLocale,
    },
};

export const i18n = createI18n({
    legacy: false,
    locale: appStore.language,
    messages: messages,
    globalInjection: true,
});

export default i18n;