// 前端网址
const navigationUrls = [
    {
        category: '搜索',
        children: [
            {
                title: 'MDN',
                link: 'https://developer.mozilla.org/zh-CN/',
            },
            {
                title: 'GitHub',
                link: 'https://github.com/search?q=',
            },
            {
                title: 'NPM',
                link: 'https://www.npmjs.com/',
            },
            {
                title: 'Stackoverflow',
                link: 'https://stackoverflow.com/search?q=',
            },
            {
                title: '开发者搜索',
                link: 'https://kaifa.baidu.com/',
            },
            {
                title: '菜鸟工具',
                link: 'https://www.jyshare.com/',
            },
        ],
    },
    {
        category: '文档',
        children: [
            {
                title: 'Vue',
                link: 'https://cn.vuejs.org/api/',
            },
            {
                title: 'NodeJS',
                link: 'https://nodejs.org/docs/latest-v15.x/api/',
            },
            {
                title: '网道',
                link: 'https://wangdoc.com/',
            },
            {
                title: 'TS',
                link: 'https://www.typescriptlang.org/docs/',
            },
            {
                title: 'Webpack',
                link: 'https://yk2012.github.io/sgg_webpack5/base/optimizeCss.html#_2-%E9%85%8D%E7%BD%AE',
            },
            {
                title: 'Vitest',
                link: 'https://cn.vitest.dev/api/expect.html',
            },
            {
                title: 'Tailwindcss',
                link: 'https://tailwindcss.com/',
            },
            {
                title: 'Nuxt',
                link: 'https://nuxt.com/',
            },
        ],
    },
    {
        category: '工具',
        children: [
            {
                title: 'DeepSeek',
                link: 'https://chat.deepseek.com',
            },
            {
                title: '智谱GPT',
                link: 'https://chatglm.cn/main/detail',
            },
            {
                title: 'ChatGPT',
                link: 'https://chat.openai.com/',
            },
            {
                title: 'Kimi',
                link: 'https://kimi.moonshot.cn/chat',
            },
            {
                title: 'ClaudeGPT',
                link: 'https://claude.ai/new',
            },
            {
                title: 'DeepL翻译',
                link: 'https://www.deepl.com/translator',
            },
            {
                title: '英语学习',
                link: 'https://qwerty.kaiyi.cool/',
            },
            {
                title: '口语练习',
                link: 'https://earthworm.cuixueshe.com/',
            },
            {
                title: '滴答清单',
                link: 'https://www.dida365.com/',
            },
        ],
    },
    {
        category: '技术',
        children: [
            {
                title: '稀土掘金',
                link: 'https://juejin.cn/',
            },
            {
                title: '吾爱破解',
                link: 'https://www.52pojie.cn/',
            },
            {
                title: '思否',
                link: 'https://segmentfault.com/',
            },
            {
                title: 'V2EX',
                link: 'https://www.v2ex.com/',
            },
            {
                title: 'Fly63',
                link: 'https://www.fly63.com/',
            },
        ],
    },
    {
        category: '博客',
        children: [
            {
                title: '阮一峰',
                link: 'http://ruanyifeng.com/',
            },
            {
                title: '每日 Github',
                link: 'https://github.com/Wechat-ggGitHub/Awesome-GitHub-Repo',
            },
            {
                title: '前端周刊',
                link: 'https://github.com/ascoders/weekly',
            },
        ],
    },
    {
        category: '其它',
        children: [
            {
                title: '掘金文章',
                link: 'https://juejin.cn/user/2708815556129406/posts',
            },
            {
                title: 'My GitHub',
                link: 'https://github.com/liudewa888',
            },
        ],
    },
];

// 搜索引擎
const searchEngines = [
    {
        name: '谷 歌',
        link: 'https://www.google.com/search',
        key: 'q',
    },
    {
        name: '必 应',
        link: 'https://www.bing.com/search',
        key: 'q',
    },
    {
        name: 'duck',
        link: 'https://duckduckgo.com/',
        key: 'q',
    },
    {
        name: '百 度',
        link: 'https://www.baidu.com/s',
        key: 'wd',
    },
    {
        name: 'F 搜',
        link: 'https://fsoufsou.com/search',
        key: 'q',
    },
];
// 包含网址
const includes = [
    {
        title: '掘金',
        link: 'juejin.cn',
    },
    {
        title: '知乎',
        link: 'zhihu.com',
    },
    {
        title: '吾爱',
        link: '52pojie.cn',
    },
    {
        title: '思否',
        link: 'segmentfault.com',
    },
    {
        title: 'stackoverflow',
        link: 'stackoverflow.com',
    },
    {
        title: 'GitHub',
        link: 'github.com',
    },
];

// 排除网址
const excludes = [
    {
        title: 'CSDN',
        link: 'csdn.net',
    },
    {
        title: '脚本之家',
        link: 'jb51.net',
    },
    {
        title: '腾讯云',
        link: 'cloud.tencent.com',
    },
    {
        title: '华为云',
        link: 'huaweicloud.com',
    },
    {
        title: '阿里云',
        link: 'developer.aliyun.com',
    },
];

export {navigationUrls, searchEngines, includes, excludes};
