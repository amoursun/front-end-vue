import {PluginOption} from 'vite';
import path from 'path';
import { env } from 'node:process';
import UnoCSS from 'unocss/vite';

// 配置icon相关的
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import {FileSystemIconLoader} from 'unplugin-icons/loaders';
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
// 自动导入 vue 等的 相关的函数
import AutoImport from 'unplugin-auto-import/vite';
// 自动导入第三方组件 和项目组件
import Components from 'unplugin-vue-components/vite';
import {AntDesignVueResolver, ElementPlusResolver} from 'unplugin-vue-components/resolvers';

// px-vw
// import {postcssPxToViewportConfig} from './vite-plugin/postcss-px-to-viewport-config';

// 路由自动导入和布局组件自动合成
import { resolve } from 'path';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';

// 导入 vite-plugin-html 根据环境变量修改标题
import { createHtmlPlugin } from 'vite-plugin-html';
// 配置gzip压缩插件
import viteCompression from 'vite-plugin-compression';

/** 本地svg图标集合名称 */
const collectionName = env.VITE_ICON_LOCAL_PREFIX?.replace(
  `${env.VITE_ICON_PREFIX}-`,
  ''
);

// https://vitejs.dev/plugins/
/**
 * 创建 vite 插件
 * @param viteEnv
 */
export const createVitePlugins = (): (PluginOption | PluginOption[])[] => {
	return [
		vue(),
		// MOCK 服务，开启 MOCK 放开注释即可
		// mockDevServerPlugin(), // vite-plugin-mock-dev-server
		vueJsx(),
		UnoCSS({
			hmrTopLevelAwait: false,
		}),
		AutoImport({
			// 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
			imports: ['vue', '@vueuse/core', 'pinia', 'vue-router'],
			// 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
			resolvers: [
				ElementPlusResolver(),
				IconsResolver({
					// 修改Icon组件前缀，不设置则默认为i,禁用则设置为false
					prefix: 'Icon',
					// 指定collection，默认为全部
					// enabledCollections: [],
				})
			],
			// 解决eslint报错问题
			eslintrc: {
				enabled: true,
				filepath: './.eslintrc-auto-import.json',
				globalsPropValue: true,
			},
			vueTemplate: true,
			// 配置文件生成位置(false:关闭自动生成)
			dts: false,
			// dts: 'src/typings/auto-imports.d.ts',
			// dts: mode === "development" ? "src/typings/auto-imports.d.ts" : false,
		}),
		Components({
			// 第三方组件库 例如 vant element 等
			resolvers: [
				AntDesignVueResolver({
					importStyle: false // 动态主题需配置
				}),
				ElementPlusResolver(), // 自动导入 Element Plus 相关函数
				IconsResolver({
					// 修改Icon组件前缀，不设置则默认为i,禁用则设置为false
					prefix: 'Icon',
					// 指定collection，默认为全部
					// enabledCollections: [],
				}),
			],
			// dirs: ['src/components', 'src/**/components'], // 自定义的组件位置
			// dts: mode === 'development' ? 'src/typings/components.d.ts' : false, // 生成声明文件位置
		}),
		Pages({
			pagesDir: 'src/pages', //需要生成路由的文件目录，默认就是识别src下面的pages文件
			extensions: ['vue'],
			exclude: ['**/components/*.vue'], // 忽略的文件夹
			importMode: 'async', // 是否是异步路由
		}),
		Layouts({
			// 如果是默认 layouts文件夹，默认 default.vue文件，则不需要配置
			layoutsDirs: 'src/layout', // 布局文件存放目录
			defaultLayout: 'default', // 对应 src/layout/default.vue
		}),
		createHtmlPlugin({
			minify: true,
			/**
			 * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
			 * @default src/main.ts
			 */
			entry: '/src/main.ts',
			/**
			 * 需要注入 index.html ejs 模版的数据
			 */
			inject: {
				data: {
					// 查找.env 等环境变量文件里面的VITE_PROJECT_TITLE，请以VITE_标识开头
					title: env.VITE_PROJECT_TITLE,
					injectScript: `<script src="/inject.js"></script> `,
					ENABLE_ERUDA: env.VITE_ENABLE_ERUDA || 'false',
				},
			},
		}),
		viteCompression(),
		// Icons({
		//   autoInstall: true, // 自动安装
		//   compiler: 'vue3', // 支持vue3
		//   scale: 1, // 图标大小
		//   defaultClass: 'inline-block', // 插入icon的类名
		//   defaultStyle: 'marginTop:-0.1875em', // 插入icon的样式
		//   customCollections: {
		//     [collectionName]: FileSystemIconLoader(pathSvgIcon, (svg) =>
		//       svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
		//     ),
		//   },
		// }),
		createSvgIconsPlugin({
			// 指定需要缓存的图标文件夹
			iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
			// 指定symbolId格式
			symbolId: 'icon-[name]',
		}),
	];
};
