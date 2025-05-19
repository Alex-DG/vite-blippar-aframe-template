// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

const htmlPlugin = (env) => {
  return {
    name: 'html-transform',
    transformIndexHtml: {
      transform: (html) =>
        html.replace(/%(.*?)%/g, (match, p1) => env[p1] ?? match),
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.')
  return {
    plugins: [basicSsl(), htmlPlugin(env)],
    assetsInclude: [
      '**/*.glb',
      '**/*.gltf',
      '**/*.fbx',
      '**/*.mp4',
      '**/*.webp',
      '**/*.png',
      '**/*.jpg',
    ],
    server: {
      https: true, // Enable HTTPS
      host: true, // Allow LAN IP access (e.g., 192.168.x.x)
      port: 5173, // Optional: specify a port
    },
  }
})
