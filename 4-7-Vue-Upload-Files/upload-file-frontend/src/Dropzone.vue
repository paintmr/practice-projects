<template>
  <div>
    <div 
      v-if="message" 
      :class="`message ${error ? 'is-danger': 'is-success'}`"
    >
      <div class="message-body">{{message}}</div>
    </div>
    <form @submit.prevent="sendFile" enctype="multipart/form-data">
      <div class="dropzone">
        <input type="file" class="input-file" ref="dropZoneInput" @change="sendFile">
        <p v-if="!uploading" class="call-to-action">
          Drag your files here
        </p>
        <p v-if="uploading" class="progress-bar">
          <progress class="progress is-info" :value="progress" max="100">{{progress}} %</progress>
        </p>
      </div>
      <div class="content">
        <ul>
          <li v-for="file in dropZoneFiles" :key="file.originalname">
            {{file.originalname}}
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "DropZone",
  data() {
    return {
      file: "",
      message: "",
      error: false,
      uploading: false,
      dropZoneFiles: [],
      progress: 0
    }
  },
  methods: {
    async sendFile() {
      const file = this.$refs.dropZoneInput.files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        this.uploading = true;
        const res = await axios.post('/dropzone', formData, {
          onUploadProgress: e => this.progress = Math.round(e.loaded / e.total * 100)
        });
        this.dropZoneFiles.push(res.data.file);
        this.uploading = false;
      } catch (err) {
        this.message = err.response.data.error;
        this.file ="";
        this.error = true;
        this.uploading = false;

      }
    }
  }
}
</script>

<style scoped>
.dropzone{
  min-height: 200px;
  padding: 10px 10px;
  position: relative;
  cursor: pointer;
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size:30px;
}
.dropzone:hover {
  background: lightblue;
}
.input-file{
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}
.call-to-action{
  line-height: 150px;
}
</style>
