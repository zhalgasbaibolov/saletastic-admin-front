/* eslint-disable no-console */

export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    config.headers.common['shopify-access-token'] = localStorage.getItem('shopify-access-token')
    console.log(config)
  })
}