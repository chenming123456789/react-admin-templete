import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    port: 3000,
    host: true, // 这一行很关键，能解决大部分“访问不到”的问题
    open: true, // 启动后自动弹出浏览器页面
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
