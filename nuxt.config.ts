// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt', '@nuxt/eslint', 'motion-v/nuxt'],
  css: ['~/assets/css/main.css'],
  // Vite configuration
  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 24678,
      },
    },
  },

  // Enable TypeScript checking in dev
  typescript: {
    typeCheck: false,
    strict: false,
  },

  colorMode: {
    preference: 'light',
    classSuffix: '',
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3017', // Backend API base URL
    },
  },

  ui: {
    theme: {
      colors: [
        'primary',
        'secondary',
        'tertiary',
        'info',
        'success',
        'warning',
        'error',
      ],
    },
  },
})
