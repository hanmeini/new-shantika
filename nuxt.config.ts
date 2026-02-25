// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-phosphor-icons',
    '@nuxtjs/i18n',
    '@nuxt/image',
  ],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },

  image: {
    
  },

  i18n: {
    locales: [
      { code: 'id', name: 'Indonesia', file: 'id.json' },
      { code: 'en', name: 'English',   file: 'en.json' },
    ],
    defaultLocale: 'id',
    langDir: '../app/locales/',
    strategy: 'prefix_except_default',
    vueI18n: './i18n.config.ts',
  },
})