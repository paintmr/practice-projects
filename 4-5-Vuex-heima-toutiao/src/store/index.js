import Vue from 'vue'
import Vuex from 'vuex'
import categories from './modules/categories'
import newslists from './modules/newslists'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    categories,
    newslists
  },
  getters: {
    categories: state => state.categories.categories,
    currentCategoryID: state => state.categories.currentCategoryID,
    currentNewsList: state => state.newslists.newsLists[state.categories.currentCategoryID] || []
  }
})
