<template>
  <div class="list">
    <div class="article_item" v-for="news in currentNewsList" :key="news.art_id">
      <h3 class="van-ellipsis">{{ news.title }}</h3>
      <div class="img_box"  v-if="news.cover.type === 1">
        <img :src="news.cover.images[0]"
        class="w100" />
      </div>
      <div class="img_box" v-else-if="news.cover.type === 3">
        <img :src="news.cover.images[0]"
        class="w33" />
          <img :src="news.cover.images[1]"
        class="w33" />
          <img :src="news.cover.images[2]"
        class="w33" />
      </div>
      <!---->
      <div class="info_box">
        <span>{{ news.aut_name }}</span>
        <span>{{ news.collect_count }}评论</span>
        <span>{{ news.pubdate | standardTimeFormat }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['currentCategoryID', 'currentNewsList'])
  },
  watch: {
    currentCategoryID (newValue) {
      this.$store.dispatch('newslists/getNewsList', newValue)
    }
  }
}
</script>

<style>

</style>
