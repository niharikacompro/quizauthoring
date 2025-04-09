// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'FASTag B2B Platform',
      meta: [{ name: 'description', content: 'B2B FASTag Management System' }]
    }
  },

  plugins: [{ src: '~/plugins/froala.client.js' }],
  compatibilityDate: '2025-03-31'
})