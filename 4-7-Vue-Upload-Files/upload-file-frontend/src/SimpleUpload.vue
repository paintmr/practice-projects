<template>
  <div>
    <div 
      v-if="message" 
      :class="`message ${error ? 'is-danger': 'is-success'}`"
    >
      <div class="message-body">{{message}}</div>
    </div>
    <form @submit.prevent="sendFile" enctype="multipart/form-data">
      <div class="field">
          <div class="file is-boxed is-primary">
            <label class="file-label">
              <input class="file-input" type="file" @change="selectFile" ref="fileInput">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
              <span v-if="file" class="file-name">{{file.name}}</span>
            </label>
          </div>
      </div>
      <div class="field">
        <button class="button is-info">send</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "SimpleUpload",
  data() {
    return {
      file: "",
      message: "",
      error: false
    }
  },
  methods: {
    selectFile() {
      const file = this.$refs.fileInput.files[0];
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      const MAX_SIZE = 200000;
      const tooLarge = file.size > MAX_SIZE;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.file = file;
        this.error = false;
        this.message = "";
      } else {
        this.error = true;
        this.message = tooLarge ? `File too large. Max size is ${MAX_SIZE/1000}KB` : "Only images are allowed";
        this.file = "";
      }
    },
    async sendFile() {
      const formData = new FormData();
      formData.append('file', this.file);
      if (!this.file) {
        this.message = "You have upload NOTHING"
        this.error = true;
        return false;
      }
      try {
        const res = await axios.post('/upload', formData);
        if (res.data.alert) {
          this.message = "You have upload NOTHING"
          this.error = true;
        }else{
          this.message = "File has been uploaded";
          this.error = false;
        }
        this.file ="";
      } catch (err) {
        this.message = "Something went wrong";
        this.file ="";
        this.error = true;
      }
    }
  }
}
</script>

<style>
</style>
