// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Quiz App',
      meta: [{ name: 'description', content: 'Quiz Authoring App' }]
    }
  },
  css: ['@/assets/styles/main.css'],

  plugins: [{ src: '~/plugins/froala.client.js' }],
  compatibilityDate: '2025-03-31',
  modules: ['@nuxtjs/tailwindcss']
})