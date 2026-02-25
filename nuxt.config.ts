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
  app: {
    head: {
      title: 'New Shantika - Kenyamanan Perjalanan Anda',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Solusi perjalanan bus terpercaya dengan fasilitas lengkap dan pelayanan profesional.' },
        { property: 'og:title', content: 'New Shantika - Solusi Perjalanan Terpercaya' },
        { property: 'og:description', content: 'Pesan tiket bus New Shantika dengan mudah. Fasilitas lengkap, rute beragam, dan kenyamanan terjamin.' },
        { property: 'og:image', content: '/images/rutehero.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'New Shantika - Solusi Perjalanan Terpercaya' },
        { name: 'twitter:description', content: 'Pesan tiket bus New Shantika dengan mudah. Fasilitas lengkap, rute beragam, dan kenyamanan terjamin.' },
        { name: 'twitter:image', content: '/images/rutehero.png' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/New Shantika Logo.png' }
      ]
    }
  },
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