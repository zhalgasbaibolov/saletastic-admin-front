/* eslint-disable no-console */
export const state = () => ({
  shop: {},
 })
  
 export const mutations = {
  setShop(state, data) {
    state.shop = data;
  },
 }

 export const getters = {
   getShop(state){
     return state.shop
   }
 }
 export const actions = {
   loadShopifyInfo({commit}){
    return this.$axios
      .post('/api/shopify/getinfo')
      .then((res) => {
        console.log('/api/shopify/getinfo:',res.data)
        commit('setShop', res.data.shop)
      })
      .catch((err) => console.log('/api/shopify/getinfo', err))
   }
 }