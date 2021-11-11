import axios from 'axios'

export default {
  namespaced: true,
  state: {
    newsLists: {}
  },
  mutations: {
    updateNewsList (state, { currentCategoryID, newsList }) {
      // state.newsLists[currentCategoryID] = newsList // 這樣寫是錯的。因為不是響應式的，數據雖然變化了，但是不會通知組件重新渲染。
      // state.newsLists = {} 新開了一個空白實例對象，然後把...state.newsLists和新的newsList放進去
      state.newsLists = { ...state.newsLists, [currentCategoryID]: newsList } // 這段代碼含義：新對象在拿到原有鍵值對的基礎上，獲得了一個新的鍵值對
    }
  },
  actions: {
    async getNewsList (context, categoryId) {
      const { data: { data: { results } } } = await axios.get(`http://toutiao-app.itheima.net/v1_1/articles?channel_id=${categoryId}&timestamp=${Date.now()}&with_top=1`)
      context.commit('updateNewsList', { currentCategoryID: categoryId, newsList: results })
    }
  }
}
