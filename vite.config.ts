import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import path from 'path'
// https://vitejs.dev/config/
import { viteMockServe } from 'vite-plugin-mock'


export default defineConfig({
  base: './',
  plugins: [
      vue(), 
    //   viteMockServe({
    //     supportTs: true,
    //     mockPath: './src/mock'
    //   })
 ],
  envDir: './env',
  resolve: {
    // 路径别名配置
    alias: [
      {
        find: 'src',
        replacement: '/src/'
      },
      {
        find: 'assets',
        replacement: '/src/assets/'
      },
      {
        find: 'components',
        replacement: '/src/components/'
      },
      {
        find: 'pages',
        replacement: '/src/pages/'
      },
      {
        find: 'router',
        replacement: '/src/router/'
      },
      {
        find: 'apis',
        replacement: '/src/apis/'
      },
      {
        find: 'utils',
        replacement: '/src/utils/'
      }
      // {
      //   find: 'components',
      //   replacement: path.resolve(__dirname, 'src/components')
      // },
      // {
      //   '/@/': path.resolve(__dirname, 'src'),
      //   '/assets/': path.resolve(__dirname, 'src/assets'),
      //   '/components/': path.resolve(__dirname, 'src/components'),
      //   '/pages/': path.resolve(__dirname, 'src/pages'),
      //   '/router/': path.resolve(__dirname, 'src/router'),
      // }
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true // 使用 less 编写样式的 UI 库（如 antd）时建议加入这个设置
      }
    }
  },
  build: {
      target: 'modules',
      emptyOutDir: true, // 清空存在的dist
      brotliSize: true, // 压缩
      chunkSizeWarningLimit: 500, // chunk大于500提示
  }
})
