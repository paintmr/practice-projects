import axios from 'axios'

export default {
  namespaced: true,
  state: {
    categories: [],
    currentCategoryID: ''
  },
  mutations: {
    updateCategories (state, payload) {
      state.categories = payload
    },
    updateCurrentCategoryID (state, payload) {
      state.currentCategoryID = payload
    }
  },
  actions: {
    async getCategories (context) {
      const { data: { data: { channels } } } = await axios.get('http://toutiao-app.itheima.net/v1_0/channels')
      context.commit('updateCategories', channels)
      context.commit('updateCurrentCategoryID', channels[0].id)
    }
  }
}
