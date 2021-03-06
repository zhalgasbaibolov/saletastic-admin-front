/* eslint-disable nuxt/no-cjs-in-config */


// const colors =require('vuetify/es5/util/colors')

module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - saletastic-admin-front',
    title: 'saletastic-admin-front',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script:[
      {
        src:'https://api.memberstack.io/static/memberstack.js?custom',
        'data-memberstack-id':"87d0f6c847a00ecda09485f050a31ddd"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/memberstack.client.js',
    '~/plugins/axios.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '~/io'
  ],

  env: {
    WS_URL: process.env.WS_URL || 'https://saletastic-admin-server.herokuapp.com/'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy:true
  },
  proxy: {
    '/api/': { target: 'https://saletastic-admin-server.herokuapp.com/api', pathRewrite: {'^/api/': ''} },
    '/login': { target: 'https://saletastic-admin-server.herokuapp.com/login', pathRewrite: {'^/login': ''} },
    '/twilioapi': { target: 'https://saletasticdev.herokuapp.com/twilioapi', pathRewrite: {'^/twilioapi': ''} }
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  // vuetify: {
  //   customVariables: ['~/assets/variables.scss'],
  //   theme: {
  //     light: true,
  //     themes: {
  //       light: {
  //         primary: colors.blue.darken2,
  //         accent: colors.grey.darken3,
  //         secondary: colors.amber.darken3,
  //         info: colors.teal.lighten1,
  //         warning: colors.amber.base,
  //         error: colors.deepOrange.accent4,
  //         success: colors.green.accent3
  //       }
  //     }
  //   }
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
