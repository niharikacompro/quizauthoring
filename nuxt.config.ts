// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Quiz App',
      meta: [{ name: 'description', content: 'B2B FASTag Management System' }]
    }
  },
  css: ['@/assets/styles/main.css'],

  plugins: [{ src: '~/plugins/froala.client.js' }],
  compatibilityDate: '2025-03-31',
  modules: ['@nuxtjs/tailwindcss']
})