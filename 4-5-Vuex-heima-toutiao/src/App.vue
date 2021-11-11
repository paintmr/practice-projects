<template>
   <div id="app">
      <categories />
      <news-list />
    </div>
</template>

<script>
import Categories from '@/components/categories.vue'
import NewsList from '@/components/news-list.vue'

export default {
  name: 'App',
  components: {
    Categories,
    NewsList
  }
}
</script>

<style>
</style>
