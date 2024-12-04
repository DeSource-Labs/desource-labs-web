import { meta } from './meta';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/styles/index.css'],
  modules: ['@nuxt/image', '@nuxtjs/sitemap'],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: meta.title,
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
      ],
      // TODO: Add Plausible analytics later
      // script: [
      //   {
      //     key: 'plausible',
      //     defer: true,
      //     src: 'https://plausible.io/js/script.js',
      //     'data-domain': 'desource-labs.org',
      //   },
      // ],
      meta: [
        // TODO: add images for social media sharing
        {
          name: 'description',
          content: meta.description,
        },
        {
          name: 'keywords',
          content: meta.keywords,
        },
        {
          name: 'twitter:title',
          content: meta.title,
        },
        {
          name: 'twitter:description',
          content: meta.description,
        },
        {
          property: 'og:title',
          content: meta.title,
        },
        {
          property: 'og:description',
          content: meta.description,
        },
        {
          property: 'og:url',
          content: 'https://desource-labs.org',
        },
        {
          property: 'og:type',
          content: 'website',
        },
      ],
    },
  },
})
