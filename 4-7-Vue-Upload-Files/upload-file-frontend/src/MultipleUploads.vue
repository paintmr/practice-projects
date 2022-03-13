<template>
  <div>
      <div>
      <div 
        v-if="message" 
        :class="`message ${error ? 'is-danger': 'is-success'}`"
      >
        <div class="message-body">{{message}}</div>
      </div>
      <form @submit.prevent="sendFile" enctype="multipart/form-data">
        <div class="field">
            <div class="file is-boxed is-warning">
              <label class="file-label">
                <input class="file-input" type="file" @change="selectFile" ref="filesInput">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Choose a file…
                  </span>
                </span>
              </label>
            </div>
        </div>
        <div class="field">
          <div v-for="(file, index) in files" :key="index" 
            :class="`level ${file.invalidMessage && 'has-text-danger'}`"
          >
            <div class="level-left">
              <div class="level-item">
                {{file.name}}
                <span v-if="file.invalidMessage">&nbsp;- {{file.invalidMessage}}</span>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <a class="delete" @click.prevent="delFile(index)"></a>
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <button class="button is-info">send</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';
export default {
  name: "MultipleUploads",
  data() {
    return {
      files: [],
      uploadFiles: [],
      message: "",
      error: false
    }
  },
  methods: {
    selectFile() {
      const files = this.$refs.filesInput.files;
      this.uploadFiles = [...this.uploadFiles, ...files];
      this.files = [
        ...this.files,
        ..._.map(files, file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          invalidMessage: this.validate(file)
        }))
      ]
      this.error = false;
      this.message = "";
      console.log("---selectFile-begin--")
      this.uploadFiles.forEach(file=>{
          console.log(file);
      })
      console.log("---selectFile-end---")
    },
    validate(file){
      const MAX_SIZE = 200000;
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (file.size > MAX_SIZE) {
        return `Max size: ${MAX_SIZE/1000}KB`;
      }

      if (!allowedTypes.includes(file.type)) {
        return "Not an image";
      }

      return "";
    },
    delFile(index){
      this.files.splice(index, 1);
      this.uploadFiles.splice(index, 1)
    },
    async sendFile() {
      if (this.uploadFiles.length==0) {
        this.message = "You have upload NOTHING"
        this.error = true;
        return false;
      }
      const formData = new FormData();
      _.forEach(this.uploadFiles, file => {
        if (this.validate(file) === "") {
          formData.append('files', file);
        }
      });
      // 不用lodash的forEach，而直接用下面的forEach也可以。
      // this.uploadFiles.forEach(file=>{
      //   if (this.validate(file) === "") {
      //     formData.append('files', file);
      //   }
      // })
      // console.log("---send begin----")
      // 打印formData里面的数据。下面两种方法都可以
      // for (var value of formData.values()) {
      //   console.log(value);
      // }
      // console.log(formData.getAll("files"))
      // console.log("---send end----")
      try {
        const res = await axios.post('/multiple', formData);
        console.log(res)
        if (res.data.alert) {
          this.message = "You have upload NOTHING"
          this.error = true;
        }else{
          this.message = "Files have been uploaded";
          this.error = false;
        }
        this.files = [];
        this.uploadFiles = [];
      } catch (err) {
        console.log(err);
        this.message = err.response.data.error;
        this.error = true;
      }
    }
  }
}
</script>

<style scoped>

</style>
