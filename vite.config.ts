import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
  proxy: {
    '/api/naver': {
      target: 'https://nid.naver.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/naver/, '')
    },
    '/api/naveropen': {
      target: 'https://openapi.naver.com',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api\/naveropen/, ''),
    }
  }  
}
});