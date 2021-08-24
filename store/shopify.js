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