import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { createHtmlPlugin } from 'vite-plugin-html'
import envCompatible from 'vite-plugin-env-compatible'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isPWAEnabled =
    env.VITE_ENABLE_PWA_OFFLINE_MODE === 'true' ||
    env.REACT_APP_ENABLE_PWA_OFFLINE_MODE === 'true'

  return {
    plugins: [
      react(),
      envCompatible({
        prefix: 'REACT_APP',
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            REACT_APP_WORDLE_GAME_NAME:
              env.VITE_WORDLE_GAME_NAME ||
              env.REACT_APP_WORDLE_GAME_NAME ||
              'Wordle',
            REACT_APP_WORDLE_GAME_DESCRIPTION:
              env.VITE_WORDLE_GAME_DESCRIPTION ||
              env.REACT_APP_WORDLE_GAME_DESCRIPTION ||
              'Without Limits',
            REACT_APP_WORDLE_GOOGLE_MEASUREMENT_ID:
              env.VITE_WORDLE_GOOGLE_MEASUREMENT_ID ||
              env.REACT_APP_WORDLE_GOOGLE_MEASUREMENT_ID ||
              '',
            REACT_APP_PLAUSIBLE_DOMAIN:
              env.VITE_PLAUSIBLE_DOMAIN ||
              env.REACT_APP_PLAUSIBLE_DOMAIN ||
              '',
            NODE_ENV: mode,
          },
        },
      }),
      ...(isPWAEnabled
        ? [
            VitePWA({
              registerType: 'autoUpdate',
              workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
                runtimeCaching: [
                  {
                    urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                    handler: 'CacheFirst',
                    options: {
                      cacheName: 'google-fonts-cache',
                      expiration: {
                        maxEntries: 10,
                        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                      },
                      cacheableResponse: {
                        statuses: [0, 200],
                      },
                    },
                  },
                ],
              },
              manifest: {
                name: env.REACT_APP_WORDLE_GAME_NAME || 'Wordle',
                short_name: env.REACT_APP_WORDLE_GAME_NAME || 'Wordle',
                description:
                  env.REACT_APP_WORDLE_GAME_DESCRIPTION || 'Without Limits',
                theme_color: '#000000',
                icons: [
                  {
                    src: '/static/images/logo192.png',
                    sizes: '192x192',
                    type: 'image/png',
                  },
                  {
                    src: '/static/images/logo512.png',
                    sizes: '512x512',
                    type: 'image/png',
                  },
                ],
              },
            }),
          ]
        : []),
    ],
    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            inversify: ['inversify', 'reflect-metadata'],
          },
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    preview: {
      port: 8080,
    },
    define: {
      'process.env': env,
    },
  }
})
