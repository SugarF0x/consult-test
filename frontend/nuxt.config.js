import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,
  target: 'server',
  head: {
    titleTemplate: '4kd Test',
    title: '4kd Test',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Тестовое задание Что делать Консалт' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~/assets/global'
  ],
  plugins: [],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxt/content',
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/timezone': 'http://worldtimeapi.org/api',
    '/api': {
      target: process.env.NODE_ENV === 'development' || !process.env.BASE_URL
        ? `http://localhost:1337`
        : process.env.BASE_URL,
      pathRewrite: {'^/api/': ''}
    }
  },
  content: {
    liveEdit: false
  },
  vuetify: {
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  build: {}
}
