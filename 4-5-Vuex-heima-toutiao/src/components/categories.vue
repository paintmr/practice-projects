<template>
  <ul class="catagtory">
    <li
      :class="{select: item.id === currentCategoryID }"
      v-for="item in categories"
      :key="item.id"
      @click="$store.commit('categories/updateCurrentCategoryID', item.id)"
    >{{ item.name }}</li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  created () {
    this.$store.dispatch('categories/getCategories')
  },
  computed: {
    ...mapGetters(['categories', 'currentCategoryID'])
  }
}
</script>

<style>

</style>
