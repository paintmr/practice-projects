<template>
  <div id="app">
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <SimpleUpload/>
          </div>
          <div class="column">
            <multiple-uploads/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleUpload from './SimpleUpload.vue';
import MultipleUploads from './MultipleUploads.vue';

export default {
  name: 'App',
  components: {SimpleUpload, MultipleUploads}
}
</script>

<style>
</style>
