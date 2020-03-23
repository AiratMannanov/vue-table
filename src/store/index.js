import Vue from 'vue'
import Vuex from 'vuex'
import navbar from './Navbar/navbarStore'
import products from "./api/products";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    navbar,
    products,
  }
})
