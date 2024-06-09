import {defineConfig, UserConfig} from 'vite';
import path from 'path';
import { env } from 'node:process';
import { createVitePlugins } from './vite-plugin/plugins';
import { createViteCss } from './vite-plugin/css';
import { createViteBuild } from './vite-plugin/build';
// 项目信息
import { createViteDefine } from './vite-plugin/define';
import { createViteServer } from './vite-plugin/server';
import { createViteResolve } from './vite-plugin/resolve';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: createViteResolve(),
  define: createViteDefine(),
  plugins: createVitePlugins(),
  server: createViteServer(),
  css: createViteCss(),
  esbuild: {
    pure: env.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
  },
  // 构建配置
  build: createViteBuild(),
} as UserConfig);
